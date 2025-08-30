# React Image Compressor (Base64)

A lightweight React component to compress images using the HTML5 Canvas API and TypeScript. Works entirely in the browser using Base64 format — no server or external API required.

---

## ✨ Features

* Client-side image compression using canvas
* Input image via file upload
* Outputs compressed Base64
* **Returns the size of the compressed image** in Bytes, KB, or MB
* Automatically resizes large images
* Supports max width & height resizing
* TypeScript support

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
import { imgcruncher, getImgBase64Size } from 'imgcruncher';

function App() {
  const [compressedBase64, setCompressedBase64] = useState('');
  const [size, setSize] = useState(0);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        const compressed = await imgcruncher(base64, 0.7, 800, 800);
        setCompressedBase64(compressed);

        // Get compressed image size in KB
        const compressedSize = getImgBase64Size(compressed, "KB");
        setSize(compressedSize);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {compressedBase64 && (
        <>
          <img src={compressedBase64} alt="Compressed" style={{ width: 200 }} />
          <p>Compressed size: {size} KB</p>
        </>
      )}
    </div>
  );
}

export default App;
```

---

### 2. Issues & Contact

If you face any issues, please:

* Open an [issue on GitHub](https://github.com/your-username/your-repo/issues)
* Or contact me at **[your-email@example.com](mailto:your-email@example.com)**

---

### 3. API

| Function                                            | Description                                                  |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `imgcruncher(base64, quality, maxWidth, maxHeight)` | Compresses image and returns compressed Base64               |
| `getImgBase64Size(base64, unit)`                    | Returns the size of a Base64 image in `bytes`, `KB`, or `MB` |

---

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) |
| :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: |
|                                            Chrome `49+`                                           |                                             Firefox `45+`                                            |                                          Edge `15+`                                         |                                            Safari `10+`                                           |                                           Opera `36+`                                          |

---

## 📜 License

MIT
