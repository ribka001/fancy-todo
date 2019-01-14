var express = require('express');
var router = express.Router();
const { isLogin } = require('../middleware/isLogin')
const projectController = require('../controllers/projectController')

/* GET home page. */
router.get('/', isLogin, projectController.findAll);
router.get('/:id', isLogin, projectController.findById);
router.post('/', isLogin, projectController.create)
router.put('/:id', isLogin, projectController.update)
router.delete('/:id', isLogin, projectController.delete)
router.post('/:id', isLogin, projectController.addUser)

router.post('/:id', isLogin, projectController.createTask)
router.put('/:id', isLogin, projectController.editTask)
router.delete('/:id', isLogin, projectController.deleteTask)

module.exports = router;