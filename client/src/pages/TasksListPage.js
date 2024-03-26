import Form  from "../components/Form";
import ListTasks from "../components/ListTasks";
import { useState } from "react";
function TasksListPage() {

    const [tasks, setTasks] = useState([]);

    return (
        <div className="flex flex-col ">
           {/* <h3> TaskListsPage  </h3>

           <h4> Tasks Management App </h4> */}

           <Form setTasks={setTasks} tasks={tasks} />

           <ListTasks tasks={tasks} setTasks={setTasks} />
        
           

        </div>
    )
}

export default TasksListPage;