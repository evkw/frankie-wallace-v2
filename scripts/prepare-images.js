import { date } from "astro:schema";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Simple arg parser for --key=value or positional fallback
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg, i) => {
    if (arg.startsWith("--")) {
      const [k, v = ""] = arg.slice(2).split("=");
      args[k] = v;
    } else {
      // allow first two positional args: inputDir, outputDir
      if (!args._) args._ = [];
      args._.push(arg);
    }
  });
  return args;
}

const argv = parseArgs();

// inputs and options
const baseInputDir =
  argv.inputDir || argv.input || argv._?.[0] || "./images_in";
const folder = argv.folder || argv.f || ""; // optional subfolder inside input dir
const inputDir = folder ? path.join(baseInputDir, folder) : baseInputDir;

const id = argv.id || argv.name || (folder ? folder : path.basename(inputDir)); // id used in JSON + filenames
const mainImage = argv.main; // original filename to mark as main (optional)
const quality = Number(argv.quality || argv.q || 80);

// metadata for JSON (optional overrides)
const title =
  argv.title ||
  (id
    ? id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Gallery");
const description =
  argv.description ||
  "Description not provided. Update the generated JSON with a proper description.";
const category = argv.category || "surfacePattern";
const license = argv.license || "non-exclusive";
const techniques = argv.techniques
  ? argv.techniques.split(",").map((s) => s.trim())
  : ["Hand-drawn", "Floral", "Watercolour"];
const tags = argv.tags ? argv.tags.split(",").map((s) => s.trim()) : [];

// public path prefix used in JSON src values
const publicPath = argv.publicPath || "/images"; // e.g. /images

// output directories
const imagesOutputDir = path.join("public", "images", id);
const jsonOutputDir = path.join("src", "data", "gallery");

// ensure output directories exist
if (!fs.existsSync(imagesOutputDir)) {
  fs.mkdirSync(imagesOutputDir, { recursive: true });
}
if (!fs.existsSync(jsonOutputDir)) {
  fs.mkdirSync(jsonOutputDir, { recursive: true });
}

fs.readdir(inputDir, async (err, files) => {
  if (err) {
    console.error("Read error:", err);
    return;
  }

  // filter images and preserve original order
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".avif", ".webp", ".tif"].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log("No image files found in", inputDir);
    return;
  }

  // Determine main file index
  let mainIndex = -1;
  if (mainImage) {
    mainIndex = imageFiles.findIndex((f) => f === mainImage);
  }
  if (mainIndex === -1) {
    mainIndex = 0; // default to first file
  }

  // process files sequentially to keep stable numbering (can be parallelized if desired)
  const processed = [];
  let counter = 1;
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const ext = path.extname(file).toLowerCase();
    const inputPath = path.join(inputDir, file);

    // build output base name using the id pattern: {id}-main.webp and {id}-{n}.webp
    let outBase;
    if (i === mainIndex) {
      outBase = `${id}-main`;
    } else {
      outBase = `${id}-${String(counter).padStart(1, "0")}`;
      counter++;
    }
    const outName = `${outBase}.webp`;
    const outputPath = path.join(imagesOutputDir, outName);


    try {
      // use page option for multi-page TIFFs
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

      processed.push({
        original: file,
        output: outName,
        isMain: i === mainIndex,
      });
      console.log(`Converted: ${file} → ${path.join("public", "images", id, outName)}`);
    } catch (e) {
      console.error(`Error converting ${file}:`, e);
      console.error(e.stack || "");
    }
  }

  // After processing, build JSON structure
  const main = processed.find((p) => p.isMain) || processed[0];
  const additional = processed.filter((p) => !p.isMain);

  const json = {
    id: id,
    title: title,
    description: description,
    image: {
      src: path.posix.join(publicPath, id, main.output).replace(/\\/g, "/"),
      alt: `${id} Pattern`,
    },
    additionalImages: additional.map((p, idx) => ({
      src: path.posix.join(publicPath, id, p.output).replace(/\\/g, "/"),
      alt: `${id} Pattern ${idx + 1}`,
    })),
    category,
    license,
    techniques,
    tags,
    protected: false,
    dateCreated: new Date(),
  };

  // write JSON file to src/data/gallery/{id}.json
  const jsonPath = path.join(jsonOutputDir, `${id}.json`);
  fs.writeFile(jsonPath, JSON.stringify(json, null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing JSON file:", writeErr);
    } else {
      console.log("Wrote JSON:", jsonPath);
    }
  });
});
