const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const Project = require('../models/project');
const Task = require('../models/task');

router.use(authMiddleware);


router.get('/', async(req, res) => {

  try {

    const projects = await Project.find().populate(['user', 'tasks']);

    return res.send({ ok: true, projects });

  } catch (err) {
    return res.status(400).send({ ok: false, error: 'Error loading projects' });
  }

});

router.get('/:projectId', async(req, res) => {
  const projectId = req.params.projectId;

  try {

    const project = await Project.findById(projectId).populate(['user', 'tasks']);

    return res.send({ ok: true, project });

  } catch (err) {
    return res.status(400).send({ ok: false, error: `Error loading project id ${projectId}` });
  }

}); 

router.post('/', async(req, res) => {

  try {
    const { title, description, tasks } = req.body;

    const project = await Project.create({ title, description, user: req.userId });
  
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });

      await projectTask.save();
      project.tasks.push(projectTask);
    }));

    await project.save();

    return res.send({ ok: true, project });
  } catch (err) {
    return res.status(400).send({ ok: false, error: 'Error creating new project' });
  }

});

router.put('/:projectId', async(req, res) => {
  const projectId = req.params.projectId;

  try {
    const { title, description, tasks } = req.body;

    const project = await Project.findByIdAndUpdate(projectId, {
      title,
      description
    }, { new: true });

    project.tasks = [];
    await Task.remove({ project: project._id });
  
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });

      await projectTask.save();
      project.tasks.push(projectTask);
    }));

    await project.save();

    return res.send({ ok: true, project });
  } catch (err) {
    return res.status(400).send({ ok: false, error: 'Error updating new project' });
  }

});

router.delete('/:projectId', async(req, res) => {

  const projectId = req.params.projectId;

  try {

    await Project.findByIdAndRemove(projectId);

    return res.send({ ok: true, message: `Project id ${projectId} removed`});

  } catch (err) {
    return res.status(400).send({ ok: false, error: `Error deleting project id ${projectId}` });
  }

});

module.exports = app => app.use('/api/projects', router);