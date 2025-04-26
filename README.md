# `ddd`: Dalle-Design-Declarer

## Usage

```bash
$ ddd
---
Usage: ddd [options]

Generate JSON art style profile from an image

Options:
  -i, --image <path>  path to input image
  -k, --key <apiKey>  OpenAI API key; or use OPENAI_API_KEY env
  -h, --help          display help for command
```

## Getting started

```bash
$ pnpm install
$ pnpm run build
$ npm link

$ touch .env # and add OPENAI_API_KEY=XXXX
```


## Example Usage

Run command:

```bash
$ ddd -i ./assets/sample.jpg
```

Result: 

```json
{
  "art_style_profile": {
    "style_name": "Flat Minimalist Line Illustration with Pastel Accents",
    "visual_elements": {
      "shape_language": "Clean, smooth outlines with simplified forms and minimal details",
      "colors": {
        "primary_palette": [
          "Black",
          "White"
        ],
        "accent_colors": [
          "Pastel Yellow",
          "Pastel Orange",
          "Pastel Brown"
        ],
        "shading": "None; flat fills only"
      },
      "lighting": {
        "type": "Flat, no realistic lighting",
        "source_direction": "N/A",
        "shadow_style": "None"
      },
      "materials": {
        "surface_texture": "Flat, uniform color fields",
        "reflectivity": "None"
      },
      "composition": {
        "object_presentation": "Foreground figure with pets, centered with clear negative space",
        "perspective": "Simple side view with slight foreshortening",
        "background": "Solid white"
      },
      "typography": {
        "font_style": "None; no text present",
        "text_placement": "None",
        "color": "N/A"
      },
      "rendering_style": {
        "technique": "2D vector with consistent line weight",
        "detail_level": "Low; focus on silhouette and key accents"
      }
    },
    "purpose": "To convey a warm, friendly atmosphere featuring companionship through minimalistic design."
  }
}
```

Generated result(by ChatGPT): 

<div>

<div style="display: flex; justify-content: space-between; gap: 10px">
  <div id="left">
    <span>
      <strong>Result</strong>
      (./assets/result.png)
    </span>
    <img src="./assets/result.png">
  </div>
  <div id="right">
    <span>
      <strong>Original</strong>
      (./assets/sample.jpg)
    </span>
    <img src="./assets/sample.jpg">
  </div>
</div>


## LICENSE

MIT License