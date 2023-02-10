#### Introduction: 
This is a Vue2 based Todo List application. The code sets up a Vue instance with a store, router and the components being rendered. 

The code also includes a state mangement section by Vuex and Tailwind CSS.  
It includes 
getters for getting the tasks, completed todos
actions for fetching, adding, updating, and deleting todos. 

The state is saved and retrieved from local storage.

## Features:
Create: Todo Item can be created in the AddTodo component
Due Date: Item can be added with a due date
Delete and Duplicate: Click the bin and copy icon for delete and duplicate the task
Update and Mark as complete: Double click the item then it will change to another color to indicate task completed
Check Complete items: By clicking Complete, it will only show the completed tasks
Due Date Alert: When the due date is passed, the tasks will turn into red color



### Please refer to below for running the app

# vue-todo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
