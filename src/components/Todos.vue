<template>
  <div>
    <div>
      <h1 class="lg:text-4xl lg:font-bold text-4xl">Todos</h1>
      <div
        class="legend lg:text-xl lg:mt-12 lg:flex lg:justify-evenly text-xs lg:gap-3 flex mt-6"
      >
        <span>Double click to mark as complete</span>
        <span>
          <span class="incomplete-box px-2"></span>
          <span class="ml-2"> Incomplete</span>
        </span>

        <span>
          <span class="complete-box px-2"> </span>
          <span class="ml-2"> Complete</span>
        </span>
        <span>
          <font-awesome-icon icon="fa-solid fa-copy" />
          <span> Duplicate item</span>
        </span>
        <span>
          <font-awesome-icon icon="fa-solid fa-trash " />
          <span> Delete item</span>
        </span>
      </div>

      <div class="todos mt-6 flex flex-col space-y-4">
        <div
          v-for="task in Tasks"
          class="todo rounded-lg flex flex-col justify-center h-24 bg-blue-500 lg:h-16 lg:flex lg:flex-row lg:justify-evenly lg:items-center"
          v-bind:key="task.key"
          @dblclick="onDblClick(task)"
          v-bind:class="[
            {
              'is-complete': task.completed,
            },
            dueDateColor(task),
          ]"
        >
          <div
            class="lg:flex todo-title text-gray-50 lg:shrink-0 lg:grow-0 lg:w-50"
            v-bind:class="[dueDateColor(task)]"
          >
            {{ task.title }}
          </div>
          <div
            class="due-date text-gray-50 lg:shrink-0 lg:w-30"
            v-bind:class="[dueDateColor(task)]"
          >
            {{ task.dueDate }}
          </div>
          <div class="lg:flex lg:gap-4 lg:w-20 flex justify-center gap-2">
            <font-awesome-icon
              icon="fa-solid fa-copy"
              class="fa-copy"
              @click="duplicateTodo(task)"
            />
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
  name: "TodosItem",

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
    dueDateColor(task) {
      const dueDate = new Date(task.dueDate);
      const currentDate = new Date();

      if (dueDate < currentDate) {
        return "text-red-600";
      }
      return "";
    },
  },

  computed: mapGetters(["Tasks", "CompletedTodos"]),
};
</script>

<style scoped>
.todo {
  overflow-wrap: break-word;
}
</style>
