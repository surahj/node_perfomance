const express =  require('express');
const cors =  require('cors');
const cluster = require('cluster');
const os = require('os');


const app = express();
app.use(cors());

const delay = (duration) => {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    // event blocked
  }
};

app.get('/', async (req, res) => {

  res.send(`Node performance testing running on ${process.pid}`);
})

if (cluster.isMaster) {
  console.log('Cluster master has started');
  const NUM_OF_WORKERS = os.cpus().length;
  console.log(`Cluster master has started with ${NUM_OF_WORKERS}`);
  for (let i = 0; i < NUM_OF_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('worker has started');
  // Server Setup
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
}
  
app.get('/timer', async (req, res) => {
  delay(9000);
  res.send(`Event loop was blocked for provided seconds on ${process.pid}`);
});

