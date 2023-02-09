<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold">Todos</h1>
      <div class="legend mt-12 flex justify-evenly">
        <span>Double click to mark as complete</span>
        <span>
          <span class="incomplete-box px-2"></span>
          <span> = Incomplete</span>
        </span>

        <span>
          <span class="complete-box px-2"> </span>
          <span> = Complete</span>
        </span>
        <span>
          <font-awesome-icon icon="fa-solid fa-copy" />
          <span> = Duplicate item</span>
        </span>
        <span>
          <font-awesome-icon icon="fa-solid fa-trash " />
          <span> = Delete item</span>
        </span>
      </div>

      <div class="todos mt-6 flex flex-col space-y-4">
        <div
          v-for="task in Tasks"
          class="todo h-10 bg-blue-500 flex justify-between items-center"
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
            class="todo-title text-gray-50 flex-initial w-128 pl-20"
            v-bind:class="[dueDateColor(task)]"
          >
            Task: {{ task.title }}
          </div>
          <div
            class="due-date text-gray-50 flex-initial w-128"
            v-bind:class="[dueDateColor(task)]"
          >
            Due Date: {{ task.dueDate }}
          </div>
          <div class="flex flex-initial w-32 gap-4">
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

<style scoped></style>
