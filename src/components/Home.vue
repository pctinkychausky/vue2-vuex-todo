<template>
  <div class="w-3/4 mx-auto text-center">
    <div class="flex flex-col gap-20">
      <AddTodo />
      <div class="">
        <div>
          <router-link
            to="/completed"
            class="bg-gray-600 text-gray-50 px-2 py-4"
            >Go to Completed List</router-link
          >
        </div>
        <div class="mt-20"><Todos /></div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo.vue";
import Todos from "../components/Todos.vue";

export default {
  name: "App",
  components: {
    AddTodo,
    Todos,
  },
};
</script>

<style scoped></style>
