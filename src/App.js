import p5 from 'p5';
import { createRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const sketchRef = createRef();
  const [myP5, setMyP5] = useState();

  useEffect(() => {
    if (myP5 === undefined) {
      const sketch = (p) => {
        const density = "¶@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.` ";
        let video;
        let asciiDiv;
        p.setup = () => {
          p.noCanvas();
          video = p.createCapture(p.VIDEO);
          video.size(110, 60);
          video.hide();
          asciiDiv = p.createDiv();
        }

        p.draw = () => {
          p.background(0);
          video.loadPixels();
          let asciiImage = '';
          for (let j = 0; j < video.height; j++) {
            let div = '';
            for (let i = video.width - 1; i >= 0; i--) {
              const pixelIndex = (i + j * video.width) * 4;
              const r = video.pixels[pixelIndex];
              const g = video.pixels[pixelIndex + 1];
              const b = video.pixels[pixelIndex + 2];
              let contrast = 95;
              let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
              let nR = p.constrain(factor * (r - 128) + 128, 0, 255);
              let nG = p.constrain(factor * (g - 128) + 128, 0, 255);
              let nB = p.constrain(factor * (b - 128) + 128, 0, 255);
              const avg = (nR + nG + nB) / 3;
              const charIndex = p.floor(p.map(avg, 0, 255, density.length - 1, 0));
              const char = density.charAt(charIndex);
              div += char === ' ' ? '&nbsp' : char;
            }
            asciiImage += `<div class="ascii-row">${div}</div>`;
          }
          asciiDiv.html(asciiImage);
        }
      }

      setMyP5(new p5(sketch, sketchRef.current));
    }
  }, [sketchRef, myP5]);


  return (
    <div className='App App-header'>
      <div className='image-container' ref={sketchRef} />
    </div>
  );
}

export default App;
