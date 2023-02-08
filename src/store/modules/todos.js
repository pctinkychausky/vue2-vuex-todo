import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// function createState() {
//   const state = {
//     todos: [],
//   };

//   state.copyTodos = [...state.todos];

//   return state;
// }

// const state = createState();

function createState() {
  const state = {
    todos: [],
  };

  state.copyTodos = [...state.todos];

  localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));

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

  localTodos: () => {
    return JSON.parse(localStorage.getItem("localTodos")) || [];
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

  // async updateTodo({ commit }, updatedTodo) {
  //   try {
  //     const response = await axios.put(
  //       `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
  //       updatedTodo
  //     );
  //     commit("updateTodo", response.data);
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // },

  async updateTodo({ commit }, updatedTodo) {
    commit("updateTodo", updatedTodo);
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

  // async filterTodos({ commit }, event) {
  //   //Get the Limit
  //   const limit = parseInt(
  //     event.target.options[event.target.options.selectedIndex].innerText
  //   );
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  //   );
  //   commit("setTodos", response.data);
  // },

  async filterTodos({ commit, state }, event) {
    const status = event.target.value;
    let filteredTodos;

    console.log(
      "🚀 ~ file: todos.js:160 ~ filterTodos ~ state.copyTodos",
      state.copyTodos
    );
    if (status == "200") {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 200);
    } else if (status == "100") {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 100);
    } else if (status == "50") {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 50);
    } else if (status == "20") {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 20);
    } else if (status == "10") {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 10);
    } else {
      filteredTodos = state.copyTodos.filter((todo) => todo.length <= 5);
      console.log(
        "🚀 ~ file: todos.js:172 ~ filterTodos ~ filteredTodos",
        filteredTodos
      );
    }
    commit("filteredTodos", filteredTodos);
  },

  //   async filterTodosByStatus({ commit }, event) {
  //     const status = event.target.value;

  //     try {
  //       let response;
  //       if (status === "all") {
  //         response = await axios.get(
  //           "https://jsonplaceholder.typicode.com/todos"
  //         );
  //       } else
  //         response = await axios.get(
  //           `https://jsonplaceholder.typicode.com/todos?completed=${status}`
  //         );
  //       commit("setTodos", response.data);
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   },

  async filterTodosByStatus({ commit }, event) {
    const status = event.target.value;
    const localTodosFromStorage = JSON.parse(
      localStorage.getItem("localTodos")
    );

    let filteredTodos;
    if (status == "true") {
      filteredTodos = localTodosFromStorage.filter(
        (item) => item.completed === true
      );
    } else if (status == "false") {
      filteredTodos = localTodosFromStorage.filter(
        (item) => item.completed !== true
      );
    } else {
      filteredTodos = localTodosFromStorage;
    }
    commit("filteredTodos", filteredTodos);
  },

  // async filterTodosByStatus({ commit, state }, event) {
  //   const status = event.target.value;
  //   console.log(
  //     "🚀 ~ file: todos.js:160 ~ filterTodosByStatus ~ status",
  //     status
  //   );

  //   let filteredTodos;
  //   if (status == "all") {
  //     filteredTodos = state.copyTodos.filter((item) => item);
  //     commit("setTodos", filteredTodos);
  //   } else if (status == "true") {
  //     filteredTodos = state.copyTodos.filter((item) => item.completed == true);
  //     commit("filteredTodosTrue", filteredTodos);
  //   } else {
  //     filteredTodos = state.copyTodos.filter((item) => item.completed !== true);
  //     commit("filteredTodosFalse", filteredTodos);
  //   }
  // },
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
    state.copyTodos = [...state.todos];
    localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));
  },

  filteredTodos: (state, todos) => {
    state.copyTodos = todos;
    localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));
  },

  removeTodo: (state, uuid) => {
    state.copyTodos = state.copyTodos.filter((todo) => todo.uuid !== uuid);
    localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));
  },

  updateTodo: (state, updatedTodo) => {
    const index = state.copyTodos.findIndex(
      (todo) => todo.uuid === updatedTodo.uuid
    );
    if (index !== -1) {
      state.copyTodos.splice(index, 1, updatedTodo);
      localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));
    }
  },

  addTodo: (state, newTodo) => {
    state.todos.unshift(newTodo);
    state.copyTodos.unshift(newTodo);
    localStorage.setItem("localTodos", JSON.stringify(state.copyTodos));
  },
};

// const mutations = {
//   setTodos: (state, todos) => {
//     state.todos = todos;
//     state.copyTodos = [...state.todos];
//   },

//   filteredTodos: (state, todos) => {
//     state.copyTodos = todos;
//   },

//   removeTodo: (state, uuid) => {
//     state.copyTodos = state.copyTodos.filter((todo) => todo.uuid !== uuid);
//   },

//   updateTodo: (state, updatedTodo) => {
//     const index = state.copyTodos.findIndex(
//       (todo) => todo.uuid === updatedTodo.uuid
//     );
//     if (index !== -1) {
//       state.copyTodos.splice(index, 1, updatedTodo);
//       console.log(
//         "🚀 ~ file: todos.js:178 ~  state.copyTodos",
//         state.copyTodos
//       );
//     }
//   },

//   addTodo: (state, newTodo) => {
//     state.todos.unshift(newTodo);
//     state.copyTodos.unshift(newTodo);
//   },
// };

export default {
  state,
  getters,
  actions,
  mutations,
};
