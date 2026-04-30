import fs from "fs";
import path from "path";
import sharp from "sharp";

// Simple arg parser for --key=value or positional fallback
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith("--")) {
      const [k, v = ""] = arg.slice(2).split("=");
      args[k] = v;
    } else {
      if (!args._) args._ = [];
      args._.push(arg);
    }
  });
  return args;
}

const argv = parseArgs();

const inputDir = argv.inputDir || argv.input || argv._?.[0];
if (!inputDir) {
  console.error("Usage: node scripts/add-samples.js <inputDir> [--quality=80]");
  console.error("  e.g. node scripts/add-samples.js ./my-photos");
  process.exit(1);
}

const quality = Number(argv.quality || argv.q || 80);
const imagesOutputDir = path.join("public", "images", "sample-portfolio");
const jsonPath = path.join("src", "data", "sample-portfolio", "sample-portfolio.json");

// Ensure output directory exists
if (!fs.existsSync(imagesOutputDir)) {
  fs.mkdirSync(imagesOutputDir, { recursive: true });
}

// Load existing JSON
let portfolioData;
try {
  portfolioData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
} catch {
  portfolioData = { id: "sample-portfolio", title: "Sample Portfolio", images: [] };
}

// Find existing filenames to determine next counter value
const existingFiles = fs.existsSync(imagesOutputDir)
  ? fs.readdirSync(imagesOutputDir).filter((f) => f.endsWith(".webp"))
  : [];
const existingNumbers = existingFiles
  .map((f) => {
    const match = f.match(/^sample-(\d+)\.webp$/);
    return match ? parseInt(match[1], 10) : 0;
  })
  .filter(Boolean);
let counter = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

// Read and process input images
const files = fs.readdirSync(inputDir);
const imageFiles = files.filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".avif", ".webp", ".tif", ".tiff"].includes(ext);
});

if (imageFiles.length === 0) {
  console.log("No image files found in", inputDir);
  process.exit(0);
}

// Derive a label from the source folder name for alt text
// e.g. "spring-collection" → "Spring Collection"
const folderName = path.basename(path.resolve(inputDir));
const folderLabel = folderName
  .replace(/[-_]/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());

console.log(`Found ${imageFiles.length} image(s) in ${inputDir}`);

const newImages = [];

for (const file of imageFiles) {
  const ext = path.extname(file).toLowerCase();
  const inputPath = path.join(inputDir, file);
  const outName = `sample-${counter}.webp`;
  const outputPath = path.join(imagesOutputDir, outName);

  try {
    const usePageOption = [".tif", ".tiff"].includes(ext);
    const transformer = usePageOption
      ? sharp(inputPath, { page: 0 })
      : sharp(inputPath);

    await transformer
      .resize(
        argv.width ? parseInt(argv.width, 10) : undefined,
        argv.height ? parseInt(argv.height, 10) : undefined,
        { fit: "inside", withoutEnlargement: true }
      )
      .webp({ quality })
      .toFile(outputPath);

    // Use folder name + counter for alt text so generic filenames like "1.jpg" still get useful alts
    const alt = `${folderLabel} ${counter}`;

    newImages.push({
      src: `/images/sample-portfolio/${outName}`,
      alt,
      description: "",
    });

    console.log(`Converted: ${file} → public/images/sample-portfolio/${outName}`);
    counter++;
  } catch (e) {
    console.error(`Error converting ${file}:`, e.message);
  }
}

// Append new images to JSON
portfolioData.images = [...portfolioData.images, ...newImages];
fs.writeFileSync(jsonPath, JSON.stringify(portfolioData, null, 2) + "\n");

console.log(`\nAdded ${newImages.length} image(s) to ${jsonPath}`);
console.log(`Total images in portfolio: ${portfolioData.images.length}`);
