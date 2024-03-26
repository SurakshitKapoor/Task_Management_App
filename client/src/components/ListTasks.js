import { useEffect } from "react";

import { NavLink } from "react-router-dom";

function ListTasks({tasks, setTasks}) {

    async function getAllTasks() {
        try{
            const response = await fetch('http://localhost:4000/api/v1/getAllTasks', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            console.log('response of getAllTasks : ', response );

            const result = await response.json();
            console.log('response of getAllTasks : ', result);

            // result.allTasks.forEach(task => {
            //     // setTasks(prev => [...prev, task]);
            //     tasks.push(task);
            // });

            setTasks(result.allTasks);
            // console.log('tasks : ', tasks);
        }
        catch(error) {
            console.log("error at client side while getting all tasks : ", error.message);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [setTasks]);

    async function deleteHandler (taskId) {
        console.log('taskId is :', taskId);

        try{
            const response = await fetch(`http://localhost:4000/api/v1/deleteTask/${taskId}`, {
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                }
            });
            console.log('deleteTask response is : ', response);

            const result = await response.json();
            console.log('deteteTask result is : ', result);

            getAllTasks();
        }
        catch(error) {
            return (
                console.log('error while deleting from client : ', error.message)
                );
        }
    }

    return (
      <div className="max-w-auto">
        {/* <h3> ListTasks Component </h3> */}
        <div>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex flex-row items-center justify-center py-1 "
            >
              <div className="flex flex-row items-center justify-center space-x-3">
                <p
                  className=" inline text-fuchsia-700 border-solid border-2 px-3 py-1 border-indigo-600 rounded-md
                bg-slate-200 border-2 min-w-full hover:text-fuchsia-300 hover:bg-slate-600 
                grow
                "
                >
                  
                  {task.task}{" "}
                </p>

                {/* updating */}
                <NavLink to={`/update/${task._id}`}>
                  <button
                    class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300
                          font-bold py-2 px-4 rounded	
                        "
                  >
                    Update
                  </button>
                </NavLink>

                <button
                  onClick={() => deleteHandler(task._id)}
                  class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300
                    gap-0.5 font-bold py-2 px-4 rounded "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <NavLink to={"/getTaskByCategory"}>
          <button class="bg-lime-400 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded">
            
            Get Your Task By Category
          </button>
        </NavLink>
      </div>
    );
}

export default ListTasks;