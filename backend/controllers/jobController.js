const Job = require("../models/Job")
exports.createJob = async (req,res) =>{
    try {
    const job = await Job.create({
      userId: req.user.id,
      description: req.body.description,
    });

    res.json(job);
  } catch (err) {
    res.status(500).json(err.message);
  }
}