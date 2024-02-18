const Task = require('../models/task')
const asyncWrapper = require('../middleware/aysnc')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json({tasks})  
})

const createTask = asyncWrapper ( async (req, res) => {
    const newTask = await Task.create(req.body)
    res.status(201).json(newTask)
})

const getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json(task)  
})

const updateTask = asyncWrapper ( async (req, res, next) => {
    const {id:taskId} = req.params;

    const task = await Task.findOneAndUpdate({_id : taskId}, req.body, {
        new : true,
        runValidators : true
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({ task })

})

const deleteTask = asyncWrapper ( async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) {
        return next(createCustomError("404", 404))
    }
    res.status(200).json(task)

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}