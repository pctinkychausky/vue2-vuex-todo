<template>
  <div class="lg:w-3/4 mx-auto text-center lg:w-4/5 w-11/12">
    <div class="lg:flex lg:flex-col lg:gap-20 flex flex-col gap-7">
      <AddTodo />
      <div class="">
        <div>
          <router-link
            to="/completed"
            class="rounded-lg bg-gray-600 text-gray-50 px-2 lg:py-4 py-3"
            >Go to Completed List</router-link
          >
        </div>
        <div class="lg:mt-20 mt-10"><Todos /></div>
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
