import { createCloud } from '../actions/cloud';

export const handleTopBarFile = (name, canvasState, navigate) => {
  switch (name) {
    case 'New':
      handleNew(navigate);
      break;
    case 'Open':
      handleOpen(navigate);
      break;
    case 'Save to cloud':
      handleSaveToCloud(canvasState);
      break;
    case 'Save File':
      handleSaveFile(canvasState);
      break;
    case 'Page Setup':
      handlePageSetup(navigate);
      break;
    case 'Print':
      handlePrint(canvasState);
      break;
    case 'Exit':
      handleExit(navigate);
      break;
  }
};

const handleNew = (navigate) => {
  navigate('/edit/blank', { state: {} });
  window.location.reload();
};

const handleOpen = (navigate) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        console.log(content);
        navigate('/edit/image', { state: { imageData: content } });
        window.location.reload();
      };
    }
  };
  input.click();
};

const handleSaveToCloud = async (canvasState) => {
  const data = canvasState.toDataURL();
  const name = prompt('Enter image name');
  const res = await createCloud({ name, data });
};

const handleSaveFile = (canvasState) => {
  const link = document.createElement('a');
  link.download = 'image.png';
  link.href = canvasState.toDataURL();
  link.click();
};

const handlePageSetup = (navigate) => {
  navigate('/dimensions');
};

const handlePrint = (canvasState) => {
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html><head><title>Print Preview</title>
    <style>@media print{body{margin:0;padding:0}canvas{width:100%;height:100%}}</style>
    </head><body><canvas id="print-canvas"></canvas></body></html>
  `);
  const printCanvas = printWindow.document.getElementById('print-canvas');
  printCanvas.width = canvas.width;
  printCanvas.height = canvas.height;
  printCanvas.getContext('2d').drawImage(canvasState, 0, 0);
  printWindow.print();
  printWindow.close();
};

const handleExit = (navigate) => {
  navigate('/menu');
};
