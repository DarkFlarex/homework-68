import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {useEffect} from "react";
import {deleteTask, fetchTask, updateTask} from "../TasksSlice";
import {Task} from "../../../types";
import Spinner from "../../../componets/Spiner/Spiner";

const ShowTasks = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
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
            {isLoading ? (
                <Spinner />
            ) : (
                tasks.length > 0 ? (
                    <div className="container d-flex flex-column align-items-center">
                        {tasks.map(task => (
                            <div className="col-8 mb-3 card border border-secondary p-3 rounded" key={task.id}>
                                    <h3 className="card-title">{task.title}</h3>
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            checked={task.status}
                                            onChange={() => updateTaskStatus(task)}
                                        />
                                        <span className="fs-5">{task.status ? 'сделана' : 'нет'}</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => onDeleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1>Страница задач пуста</h1>
                )
            )}
        </>
    );
};

export default ShowTasks;