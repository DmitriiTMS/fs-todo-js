import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  isError: null,
};

export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/api/todos");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errorAnswer: "Tasks не получены. Ошибка!!!" });
    }
  }
);

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async ({ title, text }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/todos/create",
        {
          title,
          text,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errorAnswer: "Task не создался. Ошибка!!!" });
    }
  }
);

export const updateTaskToServer = createAsyncThunk(
  "tasks/updateTaskToServer",
  async ({ id, title, text }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/todos/${id}`,
        {
          id,
          title,
          text,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errorAnswer: "Task не обновился. Ошибка!!!" });
    }
  }
);

export const deleteTaskToServer = createAsyncThunk(
  "tasks/deleteTaskToServer",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/todos/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ errorAnswer: "Task не удалился. Ошибка!!!" });
    }
  }
);

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskTodoList: (state, action) => {
      const id = Math.random() * 100;
      let task = { id, ...action.payload };
      state.tasksList.push(task);
    },

    removeTaskFromTodoList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },

    updateTaskTodoList: (state, action) => {
      state.tasksList = state.tasksList.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        } else {
          return task;
        }
      });
    },

    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tasksList = action.payload;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.isError = action.payload.errorAnswer;
        state.isLoading = false;
        state.tasksList = [];
      })
      // addTask
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tasksList.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.isError = action.payload.errorAnswer;
        state.isLoading = false;
      })
      // updateTask
      .addCase(updateTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tasksList = state.tasksList.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          } else {
            return task;
          }
        });
      })
      .addCase(updateTaskToServer.rejected, (state, action) => {
        state.isError = action.payload.errorAnswer;
        state.isLoading = false;
      })
      // deleteTask
      .addCase(deleteTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tasksList = state.tasksList.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTaskToServer.rejected, (state, action) => {
        state.isError = action.payload.errorAnswer;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskTodoList,
  removeTaskFromTodoList,
  updateTaskTodoList,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;
