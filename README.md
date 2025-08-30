
# React Image Compressor (Base64)

A lightweight React component to compress images using the HTML5 Canvas API and TypeScript. Works entirely in the browser using Base64 format — no server or external API required.

---

## ✨ Features

- Client-side image compression using canvas
- Input image via file upload
- Outputs compressed Base64
- Automatically resizes large images
- Supports max width & height resizing
- TypeScript support

---

## 📦 Installation

```bash
npm install imgcruncher
```

---

## 🧠 Usage

### 1. Simple React Example

```tsx
import React, { useState } from 'react';
import { imgcruncher } from 'imgcruncher';

function App() {
  const [compressedBase64, setCompressedBase64] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        const compressed = await imgcruncher(base64, 
           0.7,      // quality
           800,     //maxWidth
           800,     //maxHeight
        );
        setCompressedBase64(compressed);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {compressedBase64 && (
        <img src={compressedBase64} alt="Compressed" style={{ width: 200 }} />
      )}
    </div>
  );
}

export default App;
```

---

### 2. Backend Usage

```ts
// If you want to use compression logic server-side with Node.js + JSDOM (not typical), you need additional setup
```

---

### 3. Plain HTML + JS (No React)

```html
<input type="file" id="uploader" />
<img id="output" width="200" />

<script type="module">
  import { imgcruncher } from 'imgcruncher';

  document.getElementById('uploader').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      const compressed = await imgcruncher(base64, 
           0.7,      // quality
           800,     //maxWidth
           800,     //maxHeight
        );
      document.getElementById('output').src = compressed;
    };
    reader.readAsDataURL(file);
  });
</script>
```

---

## 🔧 API

### `compressImage(base64, options)`

| Name        | Type   | Default | Description                         |
| ----------- | ------ | ------- | ----------------------------------- |
| `base64`    | string | —       | Source base64 image string          |
| `quality`   | number | `0.6`   | Compression quality (0 to 1)        |
| `maxWidth`  | number | `1920`  | Optional max width of output image  |
| `maxHeight` | number | `1080`  | Optional max height of output image |

Returns: `Promise<string>` (Compressed Base64)

---

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) |
| :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
|                                            Chrome `49+`                                           |                                             Firefox `45+`                                            |                                          Edge `15+`                                         |                                            Safari `10+`                                           |                                           Opera `36+`                                          |

## 📄 License

MIT
