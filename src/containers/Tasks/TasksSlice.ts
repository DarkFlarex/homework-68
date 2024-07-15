import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { ApiTask, Task, ApiTasks } from '../../types';

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: false,
};

export const fetchTask = createAsyncThunk<Task[], void, { state: RootState }>(
    'tasks/fetch',
    async () => {
        const response = await axiosApi.get<ApiTasks>('/tasks.json');
        const tasks: Task[] = Object.keys(response.data).map((id) => ({
            ...response.data[id],
            id,
        }));
        return tasks;
    }
);

export const addTask = createAsyncThunk<Task, ApiTask, { state: RootState }>(
    'tasks/add', async (task: ApiTask) => {
        const response = await axiosApi.post('/tasks.json', task);
        return { ...task, id: response.data.name };
    }
);

export const updateTask = createAsyncThunk<{ id: string; task: Task },
    { id: string; task: ApiTask }, { state: RootState }>(
    'tasks/update', async ({ id, task }) => {
        await axiosApi.put(`/tasks/${id}.json`, task);
        return { id, task: { ...task, id } };
    }
);

export const deleteTask = createAsyncThunk<string, string, { state: RootState }>(
    'tasks/delete',
    async (id) => {
        await axiosApi.delete(`/tasks/${id}.json`);
        return id;
    }
);


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.error = false;
                state.isLoading = true;
            }).addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = [...state.tasks, action.payload];
            }).addCase(addTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            }).addCase(fetchTask.pending, (state) => {
                state.error = false;
                state.isLoading = true;
            }).addCase(fetchTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            }).addCase(fetchTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            }).addCase(updateTask.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            }).addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const { id, task: updatedTask } = action.payload;
                    state.isLoading = false;
                    state.tasks = state.tasks.map(task => {
                        if (task.id === id) {
                            return { ...task, ...updatedTask };
                        }
                        return task;
                    });
            }).addCase(updateTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            }).addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            }).addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const ItemId = action.payload;
                   state.tasks = state.tasks.filter((task)=>
                   task.id !== ItemId);
            }).addCase(deleteTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const taskReducer = tasksSlice.reducer;
