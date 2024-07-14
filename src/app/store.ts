import { configureStore } from '@reduxjs/toolkit';
import { taskReducer,TaskState } from '../containers/Tasks/TasksSlice';

export const store = configureStore<{tasks:TaskState}>({
    reducer: {
        tasks: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
