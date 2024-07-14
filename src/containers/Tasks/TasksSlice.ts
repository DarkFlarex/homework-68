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
            });
    },
});

export const taskReducer = tasksSlice.reducer;
