const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add project name'],
    unique: [true, 'Project name already exist']
  },
  members: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }]
})


const Project = mongoose.model('Project', projectSchema)

module.exports = Project