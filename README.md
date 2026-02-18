# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🖼️ Image Preparation Script

The `scripts/prepare-images.js` script converts and optimizes images for the gallery. It processes images into WebP format and generates corresponding JSON metadata files.

### Prerequisites

The script requires the `sharp` package for image processing:

```sh
npm install sharp
```

### Basic Usage

```sh
node scripts/prepare-images.js --folder=my-gallery --id=my-gallery
```

### Command-Line Options

| Option | Alias | Description | Default |
| :--- | :--- | :--- | :--- |
| `--inputDir` | `--input` | Base input directory containing images | `./images_in` |
| `--folder` | `--f` | Subfolder inside input directory | `""` |
| `--id` | `--name` | ID used in JSON and filenames | Folder name or input dir |
| `--main` | | Original filename to mark as main image | First image |
| `--quality` | `--q` | WebP quality (0-100) | `80` |
| `--title` | | Gallery title | Auto-generated from ID |
| `--description` | | Gallery description | Default placeholder text |
| `--category` | | Gallery category | `surfacePattern` |
| `--license` | | License type | `non-exclusive` |
| `--techniques` | | Comma-separated techniques | `Hand-drawn,Floral,Watercolour` |
| `--tags` | | Comma-separated tags | `[]` |
| `--publicPath` | | Public path prefix for URLs | `/images` |
| `--width` | | Max width (preserves aspect ratio) | No limit |
| `--height` | | Max height (preserves aspect ratio) | No limit |

### Examples

**Basic conversion with custom ID:**
```sh
node scripts/prepare-images.js --folder=spring-flowers --id=spring-flowers
```

**Specify main image and quality:**
```sh
node scripts/prepare-images.js --folder=roses --id=hydrangea-roses --main=rose-main.jpg --quality=90
```

**Full metadata customization (PowerShell):**
```powershell
node scripts/prepare-images.js `
  --folder=autumn `
  --inputDir="C:\" `
  --id=oxford-autumn `
  --title="Oxford Autumn Collection" `
  --description="Warm autumn leaves and cozy scenes" `
  --category=surfacePattern `
  --techniques="Watercolour,Hand-drawn,Seasonal" `
  --tags="autumn,leaves,orange,warm"
```

Or, use a single line:
```sh
node scripts/prepare-images.js --folder=autumn --inputDir="C:\" --id=oxford-autumn --title="Oxford Autumn Collection" --description="Warm autumn leaves and cozy scenes" --category=surfacePattern --techniques="Watercolour,Hand-drawn,Seasonal" --tags="autumn,leaves,orange,warm"
```

**Resize images while converting:**
```sh
node scripts/prepare-images.js --folder=large-images --id=gallery --width=2000 --quality=85
```

### Output


### Output

- WebP images are saved to `public/images/{id}/` as `{id}-main.webp`, `{id}-1.webp`, `{id}-2.webp`, etc.
- A JSON file `{id}.json` is saved to `src/data/gallery/` with gallery metadata.

**Supported input formats:** `.jpg`, `.jpeg`, `.png`, `.avif`, `.webp`, `.tif`

**JSON fields generated:**

- `id`: Gallery ID
- `title`: Gallery title
- `description`: Gallery description
- `image`: Main image object (`src`, `alt`)
- `additionalImages`: Array of additional image objects (`src`, `alt`)
- `category`: Gallery category
- `license`: License type
- `techniques`: Array of techniques
- `tags`: Array of tags
- `protected`: Always `false` by default
- `dateCreated`: ISO date string when the gallery was generated


### Workflow

1. Place your images in a folder (e.g., `./images_in/my-collection/`).
2. Run the script with appropriate options.
3. The script will automatically output images to `public/images/{id}/` and the JSON file to `src/data/gallery/`.
4. Update the generated JSON description and metadata as needed.

**Notes:**
- If `--main` is not specified, the first image in the folder is used as the main image.
- The `protected` field is always set to `false` by default.
- The `dateCreated` field is set to the current date/time when the script is run.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
