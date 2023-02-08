import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function createState() {
  const state = {
    todos: [],
  };

  state.copyTodos = [...state.todos];

  return state;
}

const state = createState();

//getting the state
const getters = {
  allTodos: (state) => {
    return state.todos;
  },

  copyTodos: (state) => {
    return state.copyTodos;
  },
};

const actions = {
  async fetchTodos({ commit }) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      const todos = response.data.map((todo) => {
        let { uuid } = todo;
        if (!uuid) {
          uuid = todo.id;
        }
        return { ...todo, uuid };
      });

      commit("setTodos", todos);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
  // async deleteTodo({ commit }, uuid) {
  //   try {
  //     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${uuid}`);
  //     commit("removeTodo", uuid);
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // },

  async deleteTodo({ commit }, uuid) {
    console.log("🚀 ~ file: todos.js:59 ~ uuid", uuid);
    commit("removeTodo", uuid);
  },

  // async duplicateTodo({ commit }, uuid) {
  //   try {
  //     const response = await axios.get(
  //       `https://jsonplaceholder.typicode.com/todos/${uuid}`
  //     );

  //     const duplicatedTodo = { ...response.data };
  //     const newResponse = await axios.post(
  //       `https://jsonplaceholder.typicode.com/todos/`,
  //       duplicatedTodo
  //     );
  //     console.log("🚀 ~ file: todos.js:50 ~ newResponse", newResponse);
  //     commit("addTodo", newResponse.data);
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // },

  async duplicateTodo({ commit, state }, uuid) {
    const todo = state.copyTodos.find((todo) => todo.uuid === uuid);
    const duplicatedTodo = { ...todo };
    console.log("🚀 ~ file: todos.js:79 ~ duplicatedTodo", duplicatedTodo);
    duplicatedTodo.uuid = uuidv4();
    console.log("🚀 ~ file: todos.js:81 ~ duplicatedTodo", duplicatedTodo);
    commit("addTodo", duplicatedTodo);
  },

  async updateTodo({ commit }, updatedTodo) {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
        updatedTodo
      );
      commit("updateTodo", response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },

  async addTodo({ commit }, todo) {
    const { dueDate, title } = todo;
    console.log("🚀 ~ file: todos.js:70 ~ title", title);
    console.log("🚀 ~ file: todos.js:70 ~ dueDate", dueDate);

    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/todos/`,
        // { completed: false, idtest: uuidv4() }
        { title: title, dueDate: dueDate, completed: false, uuid: uuidv4() }
      );
      console.log(response.data);
      commit("addTodo", response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },

  async filterTodos({ commit }, event) {
    //Get the Limit
    const limit = parseInt(
      event.target.options[event.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },

  async filterTodosByStatus({ commit }, event) {
    const status = event.target.value;

    try {
      let response;
      if (status === "all") {
        response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
      } else
        response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?completed=${status}`
        );
      commit("setTodos", response.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
    state.copyTodos = [...state.todos];
    console.log("🚀 ~ file: todos.js:8 ~ todos", state.todos);
    console.log("🚀 ~ file: todos.js:8 ~ copyTodos", state.copyTodos);
  },

  removeTodo: (state, uuid) => {
    state.copyTodos = state.copyTodos.filter((todo) => todo.uuid !== uuid);
  },
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
  addTodo: (state, newTodo) => {
    state.todos.unshift(newTodo);
    state.copyTodos.unshift(newTodo);
    console.log("🚀 ~ file: todos.js:8 ~ todos", state.todos);
    console.log("🚀 ~ file: todos.js:8 ~ copyTodos", state.copyTodos);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
