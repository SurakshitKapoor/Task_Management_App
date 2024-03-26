import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function Update () {
    const navigate = useNavigate();

    const [upTask, setUpTask] = useState({
        task:'',
        category:''
    });

    let taskId = useParams();

    function changeHandler(e) {

        setUpTask(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }
    
    async function submitHandler(e) {
        e.preventDefault();

        console.log('updated task is : ', upTask);

        try{
            
            console.log('taskId is : ', taskId.taskId);

            const response = await fetch(`http://localhost:4000/api/v1/updatetask/${taskId.taskId}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    task:upTask.task,
                    category:upTask.category
                })
            });
            console.log('updated response is : ', response);

            const result = await response.json();
            console.log('updated result is : ', result);

            setUpTask(prev => ({
                ...prev,
                task:'',
                category:''
            }));

            navigate('/tasksList');

        }
        catch(error){
            console.log('error while updating the task is : ', error.message);
        }
        
    }
    return (
        <div>
            Update Component
            <h3> Update your task here </h3>
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="task"> Enter updated task </label>
                <input 
                type="text"
                placeholder="updated task"
                name="task"
                id="task"
                onChange={(e) => changeHandler(e)}
                value={upTask.task}
                />

        <label htmlFor="category" className="mb-1 text-md font-medium text-gray-900 dark:text-white"> Select Category </label>
          <select name="category" id="category"
          onChange={(e) => changeHandler(e)}
          value={upTask.category}
          >
            <option value='Coding'> Coding </option>
            <option value='DSA'> DSA </option>
            <option value='Aptitude'> Aptitude </option>
            <option value='Additional'> Additional </option>
          </select>
                
                <button>
                    Update Task
                </button>
            </form>
        </div>
    )
}

export default Update;