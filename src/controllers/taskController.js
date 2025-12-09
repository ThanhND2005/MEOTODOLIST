const Task = require('../models/task');
const getTasks = async (req,res)=>{
    const id = req.session.user.username;
    try {
        const tasks = await Task.find({username : id,delete : false}).lean();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const createTask = async (req,res)=>{
    const id  = req.session.user.username;
    const {title, description} = req.body;
    try {
        const task = await Task.create({
            title  : title,
            description : description,
            delete : 'false',
            username : id,
        })

        res.status(200).redirect('/')
    } catch (error) {
        
        res.status(500).send('huhu lỗi rồi ')
    }
}
const softDeleteTask = async (req,res)=>{
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const getCompletedTasks = async (req,res)=>{
    const id  = req.session.username;
    try {
        const tasks = await Task.find({username : id,delete : 'true'}).lean();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    getTasks : getTasks,
    createTask : createTask,
    softDeleteTask : softDeleteTask,
    getCompletedTasks : getCompletedTasks,
}