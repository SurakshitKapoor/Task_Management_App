const express = require('express');
const router = express.Router();

//test route
router.get('/', (req, resp) => {
    resp.send("At Homepage");
});


const { createTask,      deleteTask, 
    getAllTasks,    updateTask, 
    getTasksByCategory  }  =  require('../controllers/taskController');


router.post("/createTask", createTask);
router.delete("/deleteTask/:taskId", deleteTask);
router.get('/getAllTasks', getAllTasks);
router.put("/updateTask/:taskId", updateTask);
router.post('/getTasksByCategory', getTasksByCategory);

module.exports = router;