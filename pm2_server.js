const express =  require('express');
const cors =  require('cors');

const app = express();
app.use(cors());

const delay = (duration) => {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    // event blocked
  }
};

app.get('/', async (req, res) => {

  res.send(`Node performance testing running on process ${process.pid}`);
})

  
app.get('/timer', async (req, res) => {
  delay(4000);
  res.send(`Event loop was blocked for 4 seconds on process ${process.pid}`);
});

  // Server Setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
