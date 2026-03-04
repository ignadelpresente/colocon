const canvas = document.getElementById("noise-canvas");
const ctx = canvas.getContext("2d");

let noiseCanvas = document.createElement("canvas");
let noiseCtx = noiseCanvas.getContext("2d");

let grainScale = 1.8;

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    noiseCanvas.width = canvas.width / grainScale;
    noiseCanvas.height = canvas.height / grainScale;
}

resize();
window.addEventListener("resize", resize);

function renderNoise(){

    const w = noiseCanvas.width;
    const h = noiseCanvas.height;

    const imageData = noiseCtx.createImageData(w, h);
    const buffer = imageData.data;

    for(let i = 0; i < buffer.length; i += 4){

        let value = 120 + (Math.random() - 0.5) * 80;

        buffer[i] = value + 35;
        buffer[i + 1] = value - 15;
        buffer[i + 2] = value + 45;
        buffer[i + 3] = 30;
    }

    noiseCtx.putImageData(imageData, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height);

    requestAnimationFrame(renderNoise);
}

renderNoise();