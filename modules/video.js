function getCoordinatesOfVideoClick(video, clickEvent) {
  const x = parseInt(clickEvent.offsetX/video.elt.clientWidth * video.width);
  const y = parseInt(clickEvent.offsetY/video.elt.clientHeight * video.height);
  clickEvent.preventDefault();
  return { x, y };
}

function loadVideo(p5Instance, loadOptions) {
  const { url, element } = loadOptions;
  const video = p5Instance.createVideo(url);
  video.parent(element);

  // video.elt.getVideoPlaybackQuality().totalVideoFrames // only how many frames have loaded so far
  video.elt.controls = true;
  video.elt.load();
  p5Instance.noStroke();
  const frameRate = 30;
  const steps = parseInt(frameRate * video.elt.duration) // in seconds
  const density = 1; // pixelDensity();

  let coordinates = {};
  video.elt.onclick = function click(event) {
    coordinates = getCoordinatesOfVideoClick(video, event);
  };

  return { video, frameRate, steps, density, ...coordinates };
}

async function processUploadedVideo(p5Instance, event) {
  const file = event.target.files[0];
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Problem parsing input file'));
    };

    fileReader.onload = () => {
      const blob = new Blob([fileReader.result], { type: file.type });
      const url = URL.createObjectURL(blob);
      const loadOptions = { url, element: 'video' };
      const response = loadVideo(p5Instance, loadOptions);
      resolve(response);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

export {
    loadVideo,
    getCoordinatesOfVideoClick,
    processUploadedVideo,
};
