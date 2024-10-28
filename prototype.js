import { createCyclogramCanvas, drawCyclogram } from "./modules/cyclogram.js";
import { loadVideo } from "./modules/video.js";

let processedVideoResponse = {};
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

        const url = '../assets/river.mp4';
        const loadOptions = { url, element: 'video' };
        processedVideoResponse = loadVideo(p5, loadOptions);
    }

    p5.draw = function() {
        const { video, frameRate, steps, density, x, y } = processedVideoResponse;
        if (video) {
            const drawOptions = {
                video,
                frameRate,
                steps,
                density,
                myX: x || 100,
                myY: y || 400,
                framesPerDay,
                dotSize,
                i,
                rowNumber,
                colNumber,
            };
            const cyclogramResults = drawCyclogram(p5, drawOptions);
            i = cyclogramResults.i;
            rowNumber = cyclogramResults.rowNumber;
            colNumber = cyclogramResults.colNumber;
        }
    }
});
