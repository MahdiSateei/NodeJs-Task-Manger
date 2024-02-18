const express = require('express')
const route = express.Router()
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks')

route.route('/').get(getAllTasks).post(createTask)
route.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = route