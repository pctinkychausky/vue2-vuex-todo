<template>
  <div class="w-3/4 mx-auto text-center">
    <div>
      <h1 class="text-4xl font-bold">Completed</h1>
      <div class="legend mt-12 flex justify-evenly">
        <router-link to="/" class="px-3 bg-gray-600 text-gray-50"
          >Home</router-link
        >
      </div>
      <div class="todos mt-6 flex flex-col space-y-4">
        <div
          class="todo h-10 bg-blue-500 flex justify-between items-center"
          v-for="task in CompletedTodos"
          v-bind:key="task.key"
        >
          <div class="todo-title text-gray-50 flex-initial w-128 pl-20">
            Task: {{ task.title }}
          </div>

          <div class="flex flex-initial w-32 gap-4">
            <font-awesome-icon
              icon="fa-solid fa-trash "
              class="fa-solid"
              @click="deleteTodo(task)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CompletedItem",

  methods: {
    ...mapActions([
      "fetchTodos",
      "filterTodosByStatus",
      "deleteTodo",
      "updateTodo",
      "duplicateTodo",
    ]),
    onDblClick(todo) {
      const updatedTodo = {
        uuid: todo.uuid,
        title: todo.title,
        completed: !todo.completed,
        dueDate: todo.dueDate,
      };
      this.updateTodo(updatedTodo);
    },
  },

  computed: mapGetters(["Tasks", "CompletedTodos"]),
};
</script>

<style scoped></style>
