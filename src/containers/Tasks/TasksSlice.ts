import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { ApiTask, Task} from '../../types';

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
            })
    },
});

export const taskReducer = tasksSlice.reducer;
