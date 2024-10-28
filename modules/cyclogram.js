function createCyclogramCanvas(p5Instance, canvasOptions) {
    const { width, height, element } = canvasOptions;
    const canvas = p5Instance.createCanvas(width, height);
    canvas.parent(element);
    return canvas;
}

function drawCyclogram(p5Instance, drawOptions) {
    const { video, frameRate, steps, density, myX, myY, framesPerDay, dotSize } = drawOptions;
    let { i, rowNumber, colNumber } = drawOptions;

    // video.elt.currentTime = i/frameRate;
    video.loadPixels();
    let color = [
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density)], // get red 
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 1)], // get green
        video.pixels[(myY * video.width * 4 * density) + (myX * 4 * density + 2)] // get blue
    ];

    p5Instance.rect(i % framesPerDay * dotSize, rowNumber * dotSize, dotSize, dotSize);
    p5Instance.fill(color);
    colNumber += 1;
    if (i % framesPerDay == 0) {
        rowNumber += 1; // new row
        console.log('rowNumber', rowNumber);
        colNumber = 0;
    }
    if (i == steps) i = 0;
    else i++;

    return { i, rowNumber, colNumber };
}

export {
    createCyclogramCanvas,
    drawCyclogram,
}
