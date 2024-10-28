function loadVideo(p5, loadOptions) {
  const { url, element } = loadOptions;
  const video = p5.createVideo(url);
  video.parent(element);

  // video.elt.getVideoPlaybackQuality().totalVideoFrames // only how many frames have loaded so far
  video.elt.controls = true;
  video.elt.load();
  p5.noStroke();
  const frameRate = 30;
  const steps = parseInt(frameRate * video.elt.duration) // in seconds
  const density = 1; // pixelDensity();

  return { video, frameRate, steps, density };
}

function getCoordinatesOfVideoClick(video, clickEvent) {
  const x = parseInt(clickEvent.offsetX/video.elt.clientWidth * video.width);
  const y = parseInt(clickEvent.offsetY/video.elt.clientHeight * video.height);
  clickEvent.preventDefault();
  return { x, y };
}

async function processUploadedVideo(p5, event) {
  const file = event.target.files[0];
  const fileReader = new FileReader();

  let response = {};
  let myX = 100;
  let myY = 400;

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Problem parsing input file'));
    };

    fileReader.onload = () => {
      const blob = new Blob([fileReader.result], { type: file.type });
      const url = URL.createObjectURL(blob);
      const loadOptions = { url, element: 'video' };
      response = loadVideo(p5, loadOptions);
      const video = response.video;

      video.elt.onclick = function click(event) {
        const coordinates = getCoordinatesOfVideoClick(video, event);
        myX = coordinates.x;
        myY = coordinates.y;
      };

      resolve({ ...response, myX, myY });
    };
    fileReader.readAsArrayBuffer(file);
  });
}

export {
    loadVideo,
    getCoordinatesOfVideoClick,
    processUploadedVideo,
};
