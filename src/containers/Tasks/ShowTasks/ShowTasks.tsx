import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useEffect} from "react";
import {deleteTask, fetchTask, updateTask} from "../TasksSlice";
import {Task} from "../../../types";


const ShowTasks = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTask());
    }, [dispatch]);

    const updateTaskStatus = (task: Task) => {
        const updatedTask = {
            title: task.title,
            status: !task.status
        };
        dispatch(updateTask({ id: task.id, task: updatedTask }));
    };

    const onDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
        <>
            {tasks.map(task => (
                <div className="show-task" key={task.id}>
                    <h5>{task.title}</h5>
                    <span>
                       <input
                           type="checkbox"
                           checked={task.status}
                           onChange={() => updateTaskStatus(task)}
                       />
                        {task.status ? 'сделана' : 'нет'}
                    </span>
                    <button onClick={()=>onDeleteTask(task.id)}>delete</button>
                </div>
            ))}
        </>
    );
};

export default ShowTasks;