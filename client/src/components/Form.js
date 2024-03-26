import { useState } from "react";

function Form({setTasks, tasks}) {

    const [newTask, setNewTask] = useState({
      task:"",
      category:""
    });

    function changeHandler(e) {
      // setNewTask(e.target.value);
      setNewTask((prev) => ({
        ...prev,
        [e.target.name]:e.target.value,
      })
      );
    }

    async function submitHandler(e) {
        e.preventDefault();

        console.log("submitted task is : ", newTask);
        console.log("finished !");

        try{
          const yourTask = {
            task:newTask.task,
            category:newTask.category,
          };

          const response = await fetch("http://localhost:4000/api/v1/createTask", {
            method: "POST", 
            headers: {
              'Content-Type':"application/json",
            },
            body: JSON.stringify(yourTask),
          });

          console.log("response of createTask is : ", response);

          if(response.ok){

            const result = await response.json();
            console.log("it's result is : ", result);

            setNewTask(prev => ({
              ...prev,
              task:'',
              category:''
            }));

            // setTasks(prev => [...prev , newTask]);
            tasks.push(newTask);

          }
        }
        catch(err) {
          console.log("error on client while fetching creating a task : ", err.message);
        }
    }

    return (
      <div>
        {/* Form Component */}
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="task" className="mb-1 text-md font-medium text-gray-900 dark:text-white"> Enter Your Task </label>
          <br></br>

          <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500  placeholder:max-xl:"

            type="text"
            placeholder="enter your task"
            name="task" 
            id="task"
            onChange={(e) => changeHandler(e)}
            value={newTask.task}
          />
          
          <br></br>

          <label htmlFor="category" className="mb-1 my-2 text-md font-medium text-gray-900 dark:text-white"> Select Category </label>
          <select name="category" id="category"
          onChange={(e) => changeHandler(e)}
          value={newTask.category}
          >
            <option value='Coding'> Coding </option>
            <option value='DSA'> DSA </option>
            <option value='Aptitude'> Aptitude </option>
            <option value='Additional'> Additional </option>
          </select>

          <br></br>
          <button className="bg-blue-300 text-blue-900 hover:bg-blue-900 hover:text-blue-300 hover:font-medium duration-150
          rounded-md px-3 mx-3 my-3
          ">
            Submit Task 
          </button>
        </form>
      </div>
    );
}

export default Form;