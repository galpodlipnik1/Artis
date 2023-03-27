import React, { useRef, useState } from 'react';
import { fabric } from 'fabric';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [activeTool, setActiveTool] = useState('select');
  const [canvas, setCanvas] = useState(null);

  // initialize the canvas on mount
  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      setCanvas(newCanvas);
    }
  }, []);

  // change the active tool when a tool is clicked
  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const newImage = new fabric.Image(img);
        canvas.add(newImage);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // handle zoom in/out
  const handleZoom = (zoomIn) => {
    const zoom = canvas.getZoom();
    if (zoomIn) {
      canvas.setZoom(zoom + 0.1);
    } else {
      canvas.setZoom(zoom - 0.1);
    }
  };

  // render the toolbar and canvas
  return (
    <div className="app">
      <div className="toolbar">
        <button
          className={`tool-button ${activeTool === 'select' ? 'active' : ''}`}
          onClick={() => handleToolClick('select')}
        >
          Select
        </button>
        <button
          className={`tool-button ${activeTool === 'draw' ? 'active' : ''}`}
          onClick={() => handleToolClick('draw')}
        >
          Draw
        </button>
        <button className="tool-button" onClick={() => handleZoom(true)}>
          Zoom In
        </button>
        <button className="tool-button" onClick={() => handleZoom(false)}>
          Zoom Out
        </button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <canvas ref={canvasRef} className="canvas" />
    </div>
  );
}

export default App;
