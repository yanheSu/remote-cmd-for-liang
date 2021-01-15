const express = require('express')
const { port } = require('../config');
const { createJob, checkJobs, consumeJob } = require('./jobs');
const app = express()
const bodyParser = require('body-parser');
const config = require('../.config.js');

const jsonParser = bodyParser.json()
app.use(config.path + '/add-job', (req, res) => {
  const jobName = req.url.slice(1).split('?')[0];
  const jobParam = req.query;
  if (jobName) {
    createJob(jobName, jobParam);
  }
  res.send(req.url);
});

app.use(config.path + '/check-job', (req, res) => {
  res.send(checkJobs());
});

let x = '';

app.post(config.path + '/ping', jsonParser, (req, res) => {
  console.log(req.body);
  if (req.body) {
    const now = (new Date()).toDateString();
    try {
      const rst = JSON.stringify(req.body.result);
      x = (now + '\n' + rst);
    } catch(e) {
      x = now + '\n' + 'last ping error';
      console.error(e);
    }
  }
  res.status(200).end();
});

app.use(config.path + '/pong', (req, res) => {
  res.status(200).send(x);
})

app.use(config.path + '/consume-job', (req, res) => {
  const job = consumeJob();
  if (job) {
    res.status(200).send(job);
  }
  res.status(204).end();
});

app.listen(port, (req) => {
  console.log(`start listen ${port} ...`);
});
