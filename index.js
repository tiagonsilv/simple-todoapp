const todos = [];

// functions
function renderTodoList() {
    document.getElementById('todos').innerHTML = '';
    for (let x in todos) {
        let listItem = document.createElement('li');
        listItem.innerHTML = todos[x];
        document.getElementById('todos').appendChild(listItem);
        listItem.addEventListener('click', function() {
            completeTodo(todos[x])
        })
    }
    
}

function addTodo(str) {
    if (todos.includes(str.toString())) {
        alert("You've already added that activity.");
    } else {
        todos.push(str.toString());
        renderTodoList();
    }
}

function completeTodo(str) {
    if (todos.includes(str)) {
        let index = todos.indexOf(str);
        todos.splice(index, 1);
        renderTodoList();
    }
}

// interactive
document.getElementById('activity').addEventListener('keydown', function(info) {
    let value = this.value;
    if (info.code === "Enter" && value) {
      addTodo(value);
        this.value = '';
    }
  });

