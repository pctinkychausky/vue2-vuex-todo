// import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function createState() {
  const state = {
    todos: [],
  };

  state.tasks = JSON.parse(localStorage.getItem("TASKS"))
    ? JSON.parse(localStorage.getItem("TASKS"))
    : [...state.todos];

  return state;
}

const state = createState();

//getting the state
const getters = {
  Tasks: () => {
    return state.tasks;
  },

  CompletedTodos: (state) =>
    state.tasks.filter((todo) => {
      return todo.completed;
    }),
};

const actions = {
  async fetchTodos({ commit }) {
    let localTodosFromStorage = JSON.parse(localStorage.getItem("localTodos"));
    let localTodos = localTodosFromStorage;
    commit("setTodos", localTodos);
  },

  async deleteTodo({ commit }, task) {
    commit("removeTodo", task);
  },

  async duplicateTodo({ commit }, task) {
    commit("addTodo", task);
  },

  async updateTodo({ commit }, updatedTodo) {
    commit("updateTodo", updatedTodo);
  },

  async addTodo({ commit }, todo) {
    const { dueDate, title } = todo;
    let newTask = {
      title: title,
      dueDate: dueDate,
      completed: false,
      uuid: uuidv4(),
    };

    commit("addTodo", newTask);
  },

  filterTodosByStatus({ commit }, status) {
    console.log(
      "🚀 ~ file: todos.js:64 ~ filterTodosByStatus ~ status",
      typeof status
    );
    const filteredTodos = state.tasks.filter(
      (todo) => todo.completed === Boolean(status)
    );
    console.log(
      "🚀 ~ file: todos.js:66 ~ filterTodosByStatus ~ filteredTodos",
      filteredTodos
    );
    commit("setFilteredTodos", filteredTodos);
  },
};

const mutations = {
  setFilteredTodos(state, filteredTodos) {
    state.filteredTodos = filteredTodos;
    console.log(
      "🚀 ~ file: todos.js:74 ~ setFilteredTodos ~ state.filteredTodos",
      state.filteredTodos
    );
  },

  // setTodos: (state, localTodos) => {
  //   state.localTodos = localStorage.setItem(
  //     "localTodos",
  //     JSON.stringify("localTodos", localTodos)
  //   );
  // },

  removeTodo: (state, task) => {
    console.log("🚀 ~ file: todos.js:283 ~ task", task);
    let removeItemIndex = state.tasks.indexOf(task);
    console.log("🚀 ~ file: todos.js:287 ~ removeItemIndex", removeItemIndex);

    state.tasks.splice(removeItemIndex, 1);
    let a = state.tasks;
    console.log("🚀 ~ file: todos.js:285 ~ a", a);
    localStorage.setItem("TASKS", JSON.stringify(a));
    state.tasks = JSON.parse(localStorage.getItem("TASKS"));
  },

  updateTodo: (state, updatedTodo) => {
    const index = state.tasks.findIndex(
      (todo) => todo.uuid === updatedTodo.uuid
    );
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTodo);
      let a = state.tasks;
      localStorage.setItem("TASKS", JSON.stringify(a));
      state.tasks = JSON.parse(localStorage.getItem("TASKS"));
    }
  },

  addTodo: (state, newTask) => {
    console.log("🚀 ~ file: todos.js:145 ~ state", state);
    const { title, dueDate, completed, uuid } = newTask;

    let existingTaskIndex = state.tasks.findIndex((todo) => todo.uuid === uuid);
    console.log(
      "🚀 ~ file: todos.js:312 ~ existingTaskIndex",
      existingTaskIndex
    );

    if (existingTaskIndex !== -1) {
      let newUuid = uuidv4();
      let updatedTask = { ...state.tasks[existingTaskIndex], uuid: newUuid };
      state.tasks.unshift(updatedTask);
      let a = [...state.tasks];
      localStorage.setItem("TASKS", JSON.stringify(a));
      state.tasks = JSON.parse(localStorage.getItem("TASKS"));
    } else {
      let a = [{ title, dueDate, completed, uuid }, ...state.tasks];
      localStorage.setItem("TASKS", JSON.stringify(a));
      state.tasks = JSON.parse(localStorage.getItem("TASKS"));
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
