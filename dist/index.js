export function getImgBase64Size(base64, unit = "KB") {
    // strip metadata if present
    let str = base64.split(",")[1] || base64;
    // remove padding characters (=)
    const padding = (str.match(/=+$/) || [""])[0].length;
    const sizeInBytes = (str.length * 3) / 4 - padding;
    const normalizedUnit = unit.toLowerCase();
    switch (normalizedUnit) {
        case "bytes":
            return Math.round(sizeInBytes);
        case "kb":
            return Math.round(sizeInBytes / 1024);
        case "mb":
        default:
            return +(sizeInBytes / (1024 * 1024)).toFixed(2);
    }
}
export async function imgcruncher(base64, quality = 0.6, maxWidth = 1920, maxHeight = 1080) {
    const MAX_BASE64_SIZE_MB = 20;
    // Check base64 size in MB
    const base64SizeMB = (base64.length * 3) / (4 * 1024 * 1024);
    if (base64SizeMB > MAX_BASE64_SIZE_MB) {
        console.warn("Image too large to compress.");
        return base64;
    }
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx)
                return resolve(base64); // fallback
            const aspectRatio = width / height;
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    width = maxWidth;
                    height = Math.round(maxWidth / aspectRatio);
                }
                else {
                    height = maxHeight;
                    width = Math.round(maxHeight * aspectRatio);
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            try {
                const type = base64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
                const compressed = canvas.toDataURL(type, quality);
                resolve(compressed);
            }
            catch (error) {
                console.error("Compression failed:", error);
                resolve(base64); // fallback
            }
        };
        img.onerror = (err) => {
            console.error("Image load error:", err);
            resolve(base64);
        }; // fallback
        img.src = base64;
    });
}
//# sourceMappingURL=index.js.map