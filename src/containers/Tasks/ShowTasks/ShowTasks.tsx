import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useEffect} from "react";
import {fetchTask} from "../TasksSlice";



const ShowTasks = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTask());
    }, [dispatch]);

    return (
        <>
            {tasks.map(task => (
                <div className="show-task" key={task.id}>
                    <h5>{task.title}</h5>
                    <span>
                       <input
                           type="checkbox"
                           checked={task.status}
                       />
                        {task.status ? 'сделана' : 'нет'}
                    </span>
                </div>
            ))}
        </>
    );
};

export default ShowTasks;