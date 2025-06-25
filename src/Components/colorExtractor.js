export const extractMainColor = (imageUrl) => {
    return new Promise ((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const pixelData = ctx.getImageData(0,0,1,1).data;
            const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
            resolve(color);
        };

        img.onerror = () => {
            resolve('#000000');
        };
    });
};