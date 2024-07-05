document.addEventListener('DOMContentLoaded', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const activityInput = document.getElementById('activity');
    const todosList = document.getElementById('todos');
    const clearAllTasksButton = document.getElementById('clear-tasks-button');
    
    renderTodoList();

    // Event listeners
    activityInput.addEventListener('keydown', function(event) {
        if (event.code === "Enter" && this.value) {
            addTodo();
        }
    });

    clearAllTasksButton.addEventListener('click', function(){
        todos = [];
        localStorage.clear();
        renderTodoList();
        clearAllTasksButton.disabled = true;
    });

    // Functions
    function renderTodoList() {
        todosList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = todo;
            listItem.classList.add('todo-item');
    
            // input for editing
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = todo;
            editInput.classList.add('edit-input');
            editInput.style.display = 'none'; // Initially hide input
    
            // double click event listener for editing
            listItem.addEventListener('dblclick', () => {
                listItem.style.display = 'none'; // Hide list item text
                editInput.style.display = 'inline-block'; // Show input for editing
                editInput.focus(); // Focus on input field
            });

            // save edited task when enter
            editInput.addEventListener('keydown', (event) => {
                if (event.code === "Enter") {
                    const newValue = editInput.value.trim();
                    if (newValue !== '') {
                        todos[index] = newValue; // Update todos array
                        localStorage.setItem('todos', JSON.stringify(todos)); // Update localStorage
                        renderTodoList(); // Re-render todo list
                    }
                } else if (event.code === 'Escape') {
                    editInput.style.display = 'none'; // hide input text
                    renderTodoList();
                }
            });

            // cancel task edit when blur or Esc
            editInput.addEventListener('blur', () => {
                editInput.style.display = 'none'; // hide input text
                renderTodoList(); // re render todo list

            });

    
            todosList.appendChild(listItem);
            todosList.appendChild(editInput);
        });
    }
    

    function addTodo() {
        const value = activityInput.value.trim();
        if (value && !todos.includes(value) && todos.length < 10) {
            todos.push(value);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoList();
            activityInput.value = '';
            clearAllTasksButton.disabled = false;
        } else {
            alert(value ? (todos.length >= 10 ? "You can only have up to 10 tasks." : "You've already added that task.") : "Please enter an activity.");
        }
    }

    function completeTodo(index) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
        if (todos.length < 1) {
            clearAllTasksButton.disabled = true;
        }
    }
});
