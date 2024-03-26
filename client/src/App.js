
import './App.css';
import {Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import TasksListPage from './pages/TasksListPage';
import Navbar from './components/Navbar';
import Update from './components/Update';
import GetTaskByCategory from './pages/GetTaskByCategory';

function App() {


  return (
    <div className="App bg-red-200 w-screen ">
        {/* App Component */}
        <h3 className="  pt-3 pb-10 mt-3 text-3xl text-purple-600 font-bold underline ">
          Task Management App
        </h3>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} ></Route>
          <Route path='/tasksList' element={<TasksListPage />}></Route>
          <Route path='/update/:taskId' element={<Update />} > </Route>
          <Route path='/getTaskByCategory' element={<GetTaskByCategory />}> </Route>
          
        </Routes>
        
    </div>
  );
}

export default App;
