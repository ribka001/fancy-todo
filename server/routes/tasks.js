var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const { isLogin } = require('../middleware/isLogin')

router.post('/', isLogin, taskController.createTask);
router.get('/', isLogin, taskController.readTask);
router.put('/:id', isLogin, taskController.editTask);
router.patch('/editStatus/:id', isLogin, taskController.editStatusTask);
router.delete('/:id', isLogin, taskController.deleteTask);

module.exports = router;