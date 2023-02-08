<template>
  <div>
    <div class="flex justify-around px-20">
      <div>
        <h1 class="text-4xl font-bold">FilterTodos</h1>
        <select name="" v-on:change="filterTodos($event)">
          <option value="200">200</option>
          <option value="100">100</option>
          <option value="50">50</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <h1 class="text-4xl font-bold">filterTodosByStatus</h1>
        <select name="" v-on:change="filterTodosByStatus($event)">
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Incompleted</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterTodos",
  methods: {
    ...mapActions(["filterTodos", "filterTodosByStatus"]),
  },
};
</script>

<style scoped></style>
