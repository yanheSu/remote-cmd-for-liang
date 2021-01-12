const express = require('express')
const { port } = require('../config');
const { createJob, checkJobs, consumeJob } = require('./jobs');
const app = express()

app.use('/add-job', (req, res) => {
  const jobName = req.url.slice(1);
  if (jobName) {
    createJob(jobName);
  }
  res.send(req.url);
});

app.use('/check-job', (req, res) => {
  res.send(checkJobs());
});

app.use('/consume-job', (req, res) => {
  const job = consumeJob();
  if (job) {
    res.status(200).send(job);
  }
  res.status(204).send();
});

app.listen(port, (req) => {
  console.log(`start listen ${port} ...`);
});
