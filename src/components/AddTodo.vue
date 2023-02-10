<template>
  <div>
    <div>
      <h1 class="text-4xl font-bold">AddTodo</h1>
      <div class="add">
        <form
          @submit="onSubmit"
          class="flex lg:flex-row gap-2 my-2 sm:flex-col flex-wrap static"
        >
          <input
            type="text"
            v-model="title"
            placeholder="Enter Todo Title"
            class="flex-1 static rounded-lg"
            required
          />

          <div>
            <label for="example-datepicker">Set Due date</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="dueDate"
              class="mb-2"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              locale="en"
            ></b-form-datepicker>
          </div>
          <div class="submitButton">
            <input
              type="submit"
              value="Submit"
              class="submit px-4 rounded-lg h-8 my-auto"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import DatePicker from "vue2-datepicker";

export default {
  name: "AddTodo",
  components: {
    // DatePicker,
  },
  data() {
    return { title: "", dueDate: null, showCalendar: false };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      let dateInput = new Date(this.dueDate);
      let dateOutput = dateInput.toLocaleDateString();

      e.preventDefault();
      this.addTodo({
        title: this.title,
        dueDate: dateOutput,
      });

      this.title = "";
      this.dueDate = null;
    },
  },
};
</script>
<style scoped>
input {
  border: 1px solid rgb(27, 157, 49);
  box-shadow: 0 0 2px #719ece;
}

.move-submit {
  transform: translateY(100px);
}

.submitButton {
  margin-inline: auto;
}
</style>
