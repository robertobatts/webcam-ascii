import p5 from 'p5';
import { createRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const sketchRef = createRef();
  const [myP5, setMyP5] = useState();

  useEffect(() => {
    if (myP5 === undefined) {
      const sketch = (p) => {
        const density = "¶@ØÆMåBNÊßÔR#8Q&mÃ0À$GXZA5ñk2S%±3Fz¢yÝCJf1t7ªLc¿+?(r/¤²!*;\"^:,'.`  ";
        let image;
        p.preload = () => {
          image = p.loadImage("./pepa.jpg");
        }

        p.setup = () => {
          p.createCanvas(800, 800);
        }

        p.draw = () => {
          p.background(0);
          //p.image(image, 0, 0, p.width, p.height);

          let w = p.width / image.width;
          let h = p.height / image.height;
          image.loadPixels();
          for (let i = 0; i < image.width; i++) {
            for (let j = 0; j < image.height; j++) {
              const pixelIndex = (i + j * image.width) * 4;
              const r = image.pixels[pixelIndex];
              const g = image.pixels[pixelIndex + 1];
              const b = image.pixels[pixelIndex + 2];
              const avg = (r + g + b) / 3;
              const charIndex = p.floor(p.map(avg, 0, 255, density.length, 0));
              p.noStroke();
              p.fill(255);
              p.textSize(w);
              p.textAlign(p.LEFT, p.TOP);
              p.text(density.charAt(charIndex), i * w, j * h);
            

            }
          }
        }
      }

      setMyP5(new p5(sketch, sketchRef.current));
    }
  }, [sketchRef, myP5]);


  return (
    <div className='App' ref={sketchRef}>
    </div>
  );
}

export default App;
