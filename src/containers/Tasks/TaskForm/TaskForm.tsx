import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { addTask } from '../TasksSlice';
import { ApiTask } from '../../../types';

const initialState: ApiTask = {
    title: '',
    status: false,
};

const TaskForm: React.FC = () => {
    const [task, setTask] = useState<ApiTask>(initialState);
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
        <form onSubmit={onFormSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                required
                value={task.title}
                onChange={onFieldChange}
                placeholder="New Task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
