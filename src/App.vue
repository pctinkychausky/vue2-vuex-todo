<template>
  <div id="app" class="w-3/4 mx-auto text-center">
    <div class="flex flex-col gap-5">
      <AddTodo />
      <FilterTodos />
      <Todos />
    </div>
  </div>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import FilterTodos from "./components/FilterTodos.vue";
import Todos from "./components/Todos.vue";

export default {
  name: "App",
  components: {
    AddTodo,
    FilterTodos,
    Todos,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
