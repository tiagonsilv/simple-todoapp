const todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodoList();

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
    } else if (todos.length >= 10) {
        alert("You can only have up to 10 tasks.")
    }  else {
        todos.push(str.toString());
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
    }
}

function completeTodo(str) {
    if (todos.includes(str)) {
        let index = todos.indexOf(str);
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
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

