const Task = require('../models/Task')

class TaskController {
    static createTask(req, res) {
        let dateInput = (new Date(req.body.date)).getDate() + 1
        let month = (new Date(req.body.date)).getMonth() + 1
        let year = (new Date(req.body.date)).getFullYear()

        let input = year + "-" + month + "-" + dateInput

        let task = new Task({
            owner: req.decoded.id,
            title:  req.body.title,
            description: req.body.description,
            date: input
        })
        task.save()
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static readTask(req, res) {
        Task.find({
            owner: req.decoded.id
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
        Task.update({ 
            _id: req.params.id,
            owner: req.decoded.id
        }, { 
            title:  req.body.title,
            description: req.body.description,
            date: input
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static editStatusTask(req, res) {
        Task.update({ 
            _id: req.params.id,
            owner: req.decoded.id
        }, { 
            status: req.body.status
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static deleteTask(req, res) {
        Task.deleteOne({ 
            _id: req.params.id,
            owner: req.decoded.id
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

}

module.exports = TaskController