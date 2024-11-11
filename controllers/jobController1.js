import { nanoid } from 'nanoid';



let jobs = [
  { id: nanoid(10), company: 'apple', position: 'front-end developer' },
  { id: nanoid(10), company: 'google', position: 'back-end developer' },
];

// print jobs
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// post call job create
export const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ 
        msg: 'please provide both the details' 
    });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
};


// get job by id
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    // throw new Error('no job with that id');
    return res.status(404).json({
         msg: `no job with id ${id}`
         });
  }
  res.status(200).json({ job });
};


// update job by id
export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ 
        msg: 'please provide both the details'
     });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ 
        msg: `no job with id ${id}`
     });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ 
    msg: 'job modified', job 
});
};



// delete job by id
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({
         msg: `no job with id ${id}` 
        });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({
     msg: 'job deleted'
     });
};