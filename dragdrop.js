import { createCyclogramCanvas, drawCyclogram } from "./modules/cyclogram.js";
import { processUploadedVideo } from "./modules/video.js";

let video;
let frameRate;
let steps;
let density;
let myX = 100; // where you've clicked
let myY = 400;
let framesPerDay = 288/2; // remove nighttime hours, crudely
let dotSize = 6;
let i = 0;
let rowNumber = 0;
let colNumber = 0;

new p5(function(p5) {
    p5.setup = function() {
        const canvasOptions = {
            width: 1000,
            height: 400,
            element: 'canvas',
        };
        createCyclogramCanvas(p5, canvasOptions);

        document.getElementById('input').addEventListener('change', async function(event) {
            try {
                const response = await processUploadedVideo(p5, event);
                video = response.video;
                frameRate = response.frameRate;
                steps = response.steps;
                density = response.density;
                myX = response.myX;
                myY = response.myY;
            } catch (error) {
                alert('Error loading file!');
            }
        })
    }

    p5.draw = function() {
        if (video) {
            const drawOptions = {
                video,
                frameRate,
                steps,
                density,
                myX,
                myY,
                framesPerDay,
                dotSize,
                i,
                rowNumber,
                colNumber,
            };
            const response = drawCyclogram(p5, drawOptions);
            i = response.i;
            rowNumber = response.rowNumber;
            colNumber = response.colNumber;
        }
    }
});
