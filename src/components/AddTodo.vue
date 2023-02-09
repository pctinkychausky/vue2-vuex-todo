<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold">AddTodo</h1>
      <div class="add">
        <form @submit="onSubmit" class="flex gap-2 my-2">
          <input
            type="text"
            v-model="title"
            placeholder="Add Todo"
            class="flex-1"
            required
          />
          <date-picker
            v-model="dueDate"
            placeholder="Select Due Date"
          ></date-picker>
          <input type="submit" value="Submit" class="submit px-4" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";

export default {
  name: "AddTodo",
  components: {
    DatePicker,
  },
  data() {
    return { title: "", dueDate: null };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo({
        title: this.title,
        dueDate: this.dueDate.toLocaleDateString(),
      });

      this.title = "";
      this.dueDate = null;
    },
  },

  // methods: {
  //   ...mapActions(["addTodo"]),
  //   onSubmit(e) {
  //     e.preventDefault();
  //     this.addTodo(this.title);
  //     this.title = "";
  //   },
  // },
};
</script>

<style scoped>
input {
  border: 1px solid rgb(27, 157, 49);
  box-shadow: 0 0 2px #719ece;
}
</style>
