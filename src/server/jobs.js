const _jobs = [];

function createJob(jobsName) {
  _jobs.push(jobsName);
}

function consumeJob() {
  const len = _jobs.length;
  if (len) {
    const job = _jobs[len - 1];
    _jobs.length = len - 1;
    return job;
  }
  return false;
}

function checkJobs() {
  return [..._jobs];
}

module.exports = {
  createJob,
  consumeJob,
  checkJobs
};
