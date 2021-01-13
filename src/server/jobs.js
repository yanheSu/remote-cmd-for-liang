const _jobs = [];

function createJob(jobsName, jobParam) {
  _jobs.push({
    job: jobsName,
    params: jobParam || {}
  });
}

function consumeJob() {
  const len = _jobs.length;
  if (len) {
    const job = _jobs.shift();
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
