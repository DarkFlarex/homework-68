import './App.css'
import TaskForm from "./containers/Tasks/TaskForm/TaskForm";
import ShowTasks from "./containers/Tasks/ShowTasks/ShowTasks";


function App() {

  return (
    <main className="container d-flex flex-column align-items-center">
      <TaskForm/>
      <ShowTasks />
    </main>
  )
}

export default App
