
const Task = require('../models/Task');

//createTask
exports.createTask = async (req, resp) => {
    try{
        const {task, category} = req.body;

        if(!task || !category) {
            return resp.status(404).json({
                success:false,
                message:"Please provide the input data"
            })
        };

        const existingTask = await Task.findOne({task:task, category:category});
        if(existingTask) {
            return resp.status(404).json({
                success:false,
                message:"The Task is already present in your list"
            })
        }
        console.log("existing task : ", existingTask);

        const newTask = await Task.create({task, category});
        console.log("newTask is : ", newTask);

        return resp.status(200).json({
            success:true,
            message:"the task is created successfully",
            task:newTask,
        })
    }
    catch(error) {
        console.log("Failed to create task ");
        console.log("error : ", error);

        return resp.status(500).json({
            success:false,
            message:"Failure occured while creating the Task"
        })
    }
}


//deleteTask
exports.deleteTask = async(req, resp) => {
    try{
        const taskId = req.params.taskId;
        // const task = req.body.task;

        const deletedTask = await Task.findOneAndDelete({_id:taskId});
        console.log("deletedTask : ", deletedTask);

        if(!deletedTask) {
            return resp.status(404).json({
                success:false,
                message:"The Task is not present in yout list, please search again"
            })
        }
        return resp.status(200).json({
            success:true,
            message:"the Task is deleted successfully",
            deletedTask : deletedTask
        })
    }
    catch(error) {
        console.log("Failue occured while deleting the task : ", error.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while deleting the task"
        })
    }
}


//getAllTasks
exports.getAllTasks = async(req, resp) => {
    try{
        const allTasks = await Task.find({});
        console.log("allTasks : ", allTasks);

        return resp.status(200).json({
            success:true,
            message:"All tasks are fetched successfully !",
            allTasks: allTasks
        })
    }
    catch(err) {
        console.log("Error occured while getting all tasks : ", err.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while fetching all tasks",
            error: err.message
        })
    }
}


//updateTask
exports.updateTask = async(req, resp) => {
    try{

        const {task, category} = req.body;

        const taskId = req.params.taskId;
        console.log("taskId : ", taskId );

        if(!taskId || !task || !category) {
            return resp.status(404).json({
                success:false,
                message:"Please mention all input data"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate({_id:taskId}, {
            task:task,
            category:category,
            updatedAt: new Date(),
        }, 
        {new:true});
        console.log("updatedTask is : ", updatedTask);

        return resp.status(200).json({
            success:true,
            message:"The task is updated successfully ",
            updatedTask: updatedTask
        })
    }
    catch(err) {
        console.log("Error occured while updating the task : ", err.message);

        return resp.status(500).json({
            success:false,
            message:"Something went wrong while updating the task"
        })
    }
}


//getTasksByCategory
exports.getTasksByCategory = async(req, resp) => {
    try{
        const category = req.body.category;
        console.log('category is : ', category);

        if(!category) {
            return resp.status(404).json({
                success:false,
                message:"Please enter your category"
            })
        }

        const allTasks = await Task.find({category:category});
        console.log('allTasks : ', allTasks);

        if(!allTasks) {
            return resp.status(404).json({
                success:false,
                message:"Not having any task of this category"
            })
        }

        return resp.status(200).json({
            success:true,
            message:"All tasks of given category fetched successfully",
            allTasks: allTasks
        })
    }
    catch(error) {
        console.log('Error occured while getting all tasks of category : ', error.message);

        return resp.status(500).json({
            success:false,
            message:"something went wrong while fetching all tasks of category"
        })
    }
}