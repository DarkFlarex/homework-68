import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../app/store';
import { addTask } from '../TasksSlice';
import { ApiTask } from '../../../types';
import ButtonSpinner from "../../../componets/Spiner/ButtonSpiner";

const initialState: ApiTask = {
    title: '',
    status: false,
};

const TaskForm: React.FC = () => {
    const [task, setTask] = useState<ApiTask>(initialState);
    const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
    const dispatch: AppDispatch = useDispatch();

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(addTask(task));
        setTask(initialState);
    };

    return (
        <form className="col-6 d-flex flex-column align-items-center border border-secondary p-3 rounded mt-3 mb-5" onSubmit={onFormSubmit}>
            <label className="mb-3">Title</label>
            <input
                type="text"
                name="title"
                required
                className="form-control mb-3"
                value={task.title}
                onChange={onFieldChange}
                placeholder="New Task"
            />
            <button
                type="submit"
                className="btn btn-primary  mt-2"
                disabled={isLoading}
            >
                {isLoading && <ButtonSpinner/>}
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
