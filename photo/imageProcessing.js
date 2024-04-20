const imagePaths = [
    'assets/49748610_986486438204237_6777699179942274812_n-5c4b811fc9e77c0001f32142.jpg',
    'assets/4982501754_81ef9f69da_b-5c49ff3346e0fb0001245dff.jpg',
    'assets/5652581247_cb1bfdd5b0_b-960x540.jpg',
    'assets/6c16981fee2be370982580633cc3c0d5.jpg',
    'assets/images (1).jpeg',
    'assets/images (2).jpeg',
    'assets/images (1).jpeg',
    'assets/49748610_986486438204237_6777699179942274812_n-5c4b811fc9e77c0001f32142.jpg',
    'assets/view-pet-portrait-cat-mammal-close-843475-pxhere.com-1.jpg',
    'assets/5652581247_cb1bfdd5b0_b-960x540.jpg',
    'assets/images (3).jpeg'
];
let currentImageIndex = 0;

function checkImageColor() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let redPixels = 0, greenPixels = 0, bluePixels = 0;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > g + b) {
                redPixels++;
            } else if (g > r + b) {
                greenPixels++;
            } else if (b > r + g) {
                bluePixels++;
            }
        }

        const totalPixels = data.length / 4;
        const redPercentage = (redPixels / totalPixels) * 100;
        const greenPercentage = (greenPixels / totalPixels) * 100;
        const bluePercentage = (bluePixels / totalPixels) * 100;

        let result;
        if (redPercentage > 50) {
            result = 'The image is reddish.';
        } else if (greenPercentage > 50) {
            result = 'The image is greenish.';
        } else if (bluePercentage > 50) {
            result = 'The image is blueish.';
        } else {
            result = 'The image is not predominantly red, green, or blue.';
        }

        document.getElementById('result').textContent = result;
    };
}

function makeImageColor(color) {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (color === 'red' && r < g + b) {
                data[i] = g + b; // Increase R to G+B
            } else if (color === 'green' && g < r + b) {
                data[i + 1] = r + b; // Increase G to R+B
            } else if (color === 'blue' && b < r + g) {
                data[i + 2] = r + g; // Increase B to R+G
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

function duplicateImage() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width * 2; // Double the width
        canvas.height = img.height; // Maintain the original height
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0); // Draw original image
        ctx.drawImage(img, img.width, 0); // Draw original image again next to the first one
    };
}
function increaseBrightness() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const brightnessFactor = 1.1; // Increase brightness by 10%
        for (let i = 0; i < data.length; i += 4) {
            data[i] *= brightnessFactor; // Adjust red channel
            data[i + 1] *= brightnessFactor; // Adjust green channel
            data[i + 2] *= brightnessFactor; // Adjust blue channel
        }

        ctx.putImageData(imageData, 0, 0);
    };
}
function reduceResolution() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        const scaleFactor = 0.5; // Scale factor for reducing resolution (e.g., 0.5 means reducing by half)
        const newWidth = img.width * scaleFactor;
        const newHeight = img.height * scaleFactor;

        canvas = document.getElementById('imageCanvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight); // Draw the image with reduced dimensions
    };
}
function createAvatar() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw circular avatar
        const size = Math.min(img.width, img.height); // Choose the smaller dimension as the size for square cropping
        const radius = size / 2; // Radius of the circular avatar
        const centerX = canvas.width / 2; // X coordinate of the center of the circle
        const centerY = canvas.height / 2; // Y coordinate of the center of the circle

        // Draw the image as a circular avatar
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, centerX - radius, centerY - radius, size, size);
        ctx.restore();
    };
}
function rgbToGray() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        canvas = document.getElementById('imageCanvas');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculate average of RGB channels
            data[i] = avg; // Set red channel to average
            data[i + 1] = avg; // Set green channel to average
            data[i + 2] = avg; // Set blue channel to average
        }

        ctx.putImageData(imageData, 0, 0);
    };
}
function generateQRCodeFromImage() {
    const img = new Image();
    img.src = imagePaths[currentImageIndex];
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the base64 encoded image data from the canvas
        const imageData = canvas.toDataURL('image/jpeg');

        // Generate QR code using the image data
        generateQRCode(imageData);
    };
}
function createThumbnails() {
    const photoContainer = document.querySelector('.photo-container');
    const photos = photoContainer.querySelectorAll('.photo');

    photos.forEach(photo => {
        const img = photo.querySelector('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        const thumbnailWidth = 100; // Set the width of the thumbnail
        const thumbnailHeight = 100; // Set the height of the thumbnail
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);

        // Replace the original image with the thumbnail
        img.src = canvas.toDataURL();
        img.style.width = thumbnailWidth + 'px';
        img.style.height = thumbnailHeight + 'px';
    });
}





function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
    checkImageColor();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    checkImageColor();
}

window.onload = function() {
    checkImageColor(); // Initially check color when the page loads
};

