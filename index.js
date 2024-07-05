document.addEventListener('DOMContentLoaded', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let completeds = JSON.parse(localStorage.getItem('completeds')) || [];
    const activityInput = document.getElementById('activity');
    const todosList = document.getElementById('todos');
    const clearAllTasksButton = document.getElementById('clear-tasks-button');
    

    renderTodoList();

    // Event listeners
    activityInput.addEventListener('keydown', function(event) {
        if ((event.key === "Enter" || event.key === "Go" || event.key === "Done") && this.value) {
            addTodo();
        }
    });


    const modalBackground = document.getElementById('modal-background');
    const modalContainer = document.getElementById('modal-container');
    const confirmClearButton = document.getElementById('confirm-clear');
    const cancelClearButton = document.getElementById('cancel-clear');

    clearAllTasksButton.addEventListener('click', function() {
        modalBackground.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent scrolling
    });

    confirmClearButton.addEventListener('click', function() {
        todos = [];
        completeds = [];
        localStorage.clear();
        renderTodoList();
        clearAllTasksButton.disabled = true;
        modalBackground.classList.remove('show');
        document.body.style.overflow = 'auto'; // restore scrolling
    });

    cancelClearButton.addEventListener('click', function() {
        modalBackground.classList.remove('show');
        document.body.style.overflow = 'auto'; // restore scrolling
    });

    // Functions
    function renderTodoList() {
        todosList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = todo;
            listItem.classList.add('todo-item');
            console.log(`todo: ${todo}`)
    
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
                editInput.maxLength = 35;
                editInput.focus(); // Focus on input field
            });

            // save edited task when enter
            editInput.addEventListener('keydown', (event) => {
                if ((event.key === "Enter" || event.key === "Go" || event.key === "Done")) {
                    const newValue = editInput.value.trim();
                    if (newValue !== '') {
                        todos[index] = newValue; // Update todos array
                        localStorage.setItem('todos', JSON.stringify(todos)); // Update localStorage
                        renderTodoList(); // Re-render todo list
                    }
                // cancel task edit when Esc
                } else if (event.code === 'Escape') {
                    editInput.style.display = 'none'; // hide input text
                    renderTodoList();
                }
            });

            // cancel task edit when blur
            editInput.addEventListener('blur', () => {
                editInput.style.display = 'none'; // hide input text
                renderTodoList(); // re render todo list

            });
            // Complete button
            const completeButton = document.createElement('button');
            completeButton.textContent = '>';
            completeButton.classList.add('complete-button');
            completeButton.addEventListener('click', () => {
                completeTodo(index);
                console.log(index);
            });

            listItem.appendChild(completeButton);
            todosList.appendChild(listItem);
            todosList.appendChild(editInput);
        });
        //render completeds list
        completeds.forEach((completed, index) => {
            const completedItem = document.createElement('li');
            completedItem.textContent = completed;
            completedItem.classList.add('completed-item');
            console.log(`completed: ${completed}`);
            todosList.appendChild(completedItem);
        })
        if (todos.length < 1 && completeds.length < 1) {
            clearAllTasksButton.disabled = true;
        } else {
            clearAllTasksButton.disabled = false;
        }

    }
    

    function addTodo() {
        const value = activityInput.value.trim();
        if (value && !todos.includes(value) && todos.length < 10) {
            todos.push(value);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoList();
            activityInput.value = '';
        } else {
            alert(value ? (todos.length >= 10 ? "You can only have up to 10 tasks." : "You've already added that task.") : "Please enter an activity.");
        }
    }

    function completeTodo(index) {
        completeds.push(todos[index]);
        localStorage.setItem('completeds', JSON.stringify(completeds));
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodoList();
    }
});
