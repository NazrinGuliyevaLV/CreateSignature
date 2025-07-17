const express = require('express');
const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 

app.use(bodyParser.json())
app.use(express.json());


app.set('view engine', 'ejs');
registerFont(path.join(__dirname, 'fonts', 'Pacifico-Regular.ttf'), {
  family: 'Pacifico'
});



app.get('/', (req, res) => {
    res.render('index'); 
    
});


app.post('/handwriting', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Text is required');
  }

 
  const tempCanvas = createCanvas(0, 0);
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.font = '20px "Pacifico"';

  const textMetrics = tempCtx.measureText(text);
  const textWidth = Math.ceil(textMetrics.width); 
  console.log("text width:",textWidth);
  const padding = 10;  
  const canvasWidth = textWidth+padding*2 ;
  const canvasHeight = 70;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');
 
  ctx.fillStyle = '#ffffff00';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = '#000000ff';
  ctx.font = '20px "Pacifico"';
  ctx.fillText(text, padding, 40); 

  res.setHeader('Content-Type', 'image/png');
  canvas.pngStream().pipe(res);
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
