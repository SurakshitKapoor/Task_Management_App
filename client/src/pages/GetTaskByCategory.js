import { useEffect, useState } from "react";


function GetTaskByCategory() {

    const[category, setCategory] = useState('');
    const [allTasks, setAllTasks]= useState([]);

    function updateAllTasks(arr) {
        setAllTasks(prev => ([
            ...prev,
            arr
        ]));
        console.log("allTasks are : ", allTasks);
    } 
 
    async function submitHandler(e) {
        e.preventDefault();

        console.log('category : ', category);

        try{
            const response = await fetch("http://localhost:4000/api/v1/getTasksByCategory", {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    category:category,
                })
            });
            console.log("response of category is : ", response);

            const result = await response.json();
            console.log("category result is : ", result);

            let tasks = allTasks;
            tasks = result.allTasks;
            setAllTasks(tasks);
            //  setAllTasks(prev => ([
            //     ...prev,
            //     result.allTasks,
            // ]));
            console.log("allTasks : ", allTasks);

            // updateAllTasks(result.allTasks);

            // result.allTasks.forEach(task => {
            //     allTasks.push(task);
            // });
            // console.log("alltasks : ", allTasks);

        }
        catch(error) {
            console.log("error occured at clinet while getting tasksk of a category : ", error.message);
        }
    }

    // useEffect(()=> {

    // }, [allTasks]);

    return (
        <div className="py-4">
            {/* getTaskByCategory pages */}

           
            <form onSubmit={(e) => submitHandler(e)}>

                <label htmlFor="category" className="mb-1 text-md font-medium text-gray-900 dark:text-white">
                    Choose Category
                </label>
                <br></br>

                <select name="category" id="category"
                 onChange={(e) => setCategory(e.target.value)}
                value={category}
                    >
                
                <option value='Coding'> Coding </option>
                <option value='DSA'> DSA </option>
                <option value='Aptitude'> Aptitude </option>
                <option value='Additional'> Additional </option>

                </select>
                <br></br>
                
                <button className="px-5 mx-3 my-5 bg-violet-300 rounded-md text-violet-950 hover:bg-violet-950 hover:text-violet-300 
                hover:font-medium duration-150 text-violet-300">
                   Submit
                </button>
            </form>

            <div>
                {
                    allTasks
                    ?
                    (<div className="flex flex-row items-center justify-center">
                        {
                            allTasks.map(task => (
                                <div className="bg-yellow-200 px-4 py-1.5 my-2 mx-2 font-medium rounded-sm">
                                   <p> {task.task} </p>
                                </div>
                            ))
                        }
                    </div>)
                    :
                    (<div>
                        <p className="text-yellow-100"> NOT HAVING This category Tasks !</p>
                    </div>)
                }
            </div>

        </div>
    )
}

export default GetTaskByCategory;