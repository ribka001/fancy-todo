require('dotenv').config()
const Task = require('../models/Task')
const User = require('../models/User')
const Project = require('../models/Project')

class ProjectController {
  static findAll(req, res) {
    Project.find( { 'members': mongoose.Types.ObjectId(req.decoded.id) } )
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err.message)
    });
  }

  static findById(req, res) {
    Project.findById(req.params.id)
    .populate('members')
    .then((result) => {
      res.status(201).json({
        message:'Success get a project by id',
        status: 'success',
        result
      })
    }).catch((err) => {
      res.status(500).json({
        message: err.message,
        status: 'fail'
      })
    });
  }

  static create(req, res) {
    Project.create({
      name:req.body.name,
      members: req.decoded.id,
    })
    .then((result) => {
      res.status(201).json(result)
    }).catch((err) => {
      res.status(500).json({
        err,
        status: 'fail'
      })
    });
  }

  static update(req, res) {
    Project.updateOne({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    }, {
      name: req.body.name
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err.message)
    })
  }

  static delete(req, res) {
    Project.findByIdAndDelete({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err.message)
    });
  }

  static addUser(req, res){
    Project.updateOne({
      _id: req.params.id
    }, { $push: {
      members: req.body.member
    }
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json(err.message)
    });
  }

  static createTask(req, res) {
    let dateInput = (new Date(req.body.date)).getDate() + 1
    let month = (new Date(req.body.date)).getMonth() + 1
    let year = (new Date(req.body.date)).getFullYear()

    let input = year + "-" + month + "-" + dateInput

    Project.find({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    })
    .then((result) => {
      let task = new Task({
        owner: req.decoded.id,
        title:  req.body.title,
        description: req.body.description,
        date: input,
        groupId: req.body.groupId
      })
      task.save()
        .then(result => {
          res.status(201).json(result)
        })
        .catch(err => {
          res.status(500).json(err.message)
        })
    }).catch((err) => {
      res.status(500).json(err.message)
    });

  }

  static readTask(req, res) {
    Task.find({
      groupId: mongoose.Types.ObjectId(req.decoded.id)
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static editTask(req, res) {
    let dateInput = (new Date(req.body.date)).getDate()
    let month = (new Date(req.body.date)).getMonth() + 1
    let year = (new Date(req.body.date)).getFullYear()

    let input = year + "-" + month + "-" + dateInput
    Project.find({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    })
    .then(result => {
      Task.update({ 
        _id: req.params.id,
        owner: req.decoded.id
      }, { 
        title:  req.body.title,
        description: req.body.description,
        date: input,
        groupId: req.body.groupId
      })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json(err.message)
        })
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  }

  static editStatusTask(req, res) {
    Project.find({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    })
      .then(result => {
        Task.update({ 
          _id: req.params.id,
          owner: req.decoded.id
        }, { 
          status: req.body.status
        })
          .then(result => {
              res.status(200).json(result)
          })
          .catch(err => {
              res.status(500).json(err.message)
          })
        })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static deleteTask(req, res) {
    Project.find({
      _id: req.params.id,
      members: mongoose.Types.ObjectId(req.decoded.id)
    })
      .then(result => {
        Task.deleteOne({ 
          _id: req.params.id,
          owner: req.decoded.id
        })
          .then(result => {
            res.status(200).json(result)
          })
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }  
}

module.exports = ProjectController