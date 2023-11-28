const todoInput = document.querySelector('.input');
const todoButton = document.querySelector('button');
const todoList = document.querySelector('.list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodos);

function addTodos(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    const textContainer = document.createElement('div');
    const newTodo = document.createElement('div');
    const listButtons = document.createElement('div');
    const completeButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    todoDiv.classList.add('todo');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    textContainer.appendChild(newTodo);
    listButtons.classList.add('list-btns');
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add('complete-btn');
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add('delete-btn');
    listButtons.appendChild(completeButton);
    listButtons.appendChild(deleteButton);
    todoDiv.appendChild(textContainer);
    todoDiv.appendChild(listButtons);
    todoList.appendChild(todoDiv);

    saveLocalTodos(todoInput.value, false);
    updateLocalStorage();

    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList.contains('delete-btn')) {
        const todoDelete = item.closest('.todo');
        const confirmation = confirm("Are you sure you want to delete this item?");
        
        if (confirmation) {
            todoDelete.classList.add('fall');
            removeLocalTodos(todoDelete);

            todoDelete.addEventListener('transitionend', function () {
                todoDelete.remove();
                updateLocalStorage();
            });
        }
    }

    if (item.classList.contains('complete-btn')) {
        const todoItem = item.closest('.todo');
        const todoText = todoItem.querySelector('.todo-item');
        todoText.classList.toggle('completed');
        updateLocalCompleted(todoItem);
        updateLocalStorage();
    }
}

function filterTodos() {
    const todos = todoList.children;

    for (const todo of todos) {
        const isCompleted = todo.querySelector('.todo-item').classList.contains('completed');

        switch (filterOption.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                todo.style.display = isCompleted ? 'flex' : 'none';
                break;
            case 'uncompleted':
                todo.style.display = !isCompleted ? 'flex' : 'none';
                break;
            default:
                break;
        }
    }
}

function saveLocalTodos(todo, isCompleted) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push({ text: todo, completed: isCompleted });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        const textContainer = document.createElement('div');
        const newTodo = document.createElement('div');
        const listButtons = document.createElement('div');
        const completeButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        todoDiv.classList.add('todo');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');
        textContainer.appendChild(newTodo);
        listButtons.classList.add('list-btns');
        completeButton.innerHTML = "<i class='fas fa-check'></i>";
        completeButton.classList.add('complete-btn');
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add('delete-btn');
        listButtons.appendChild(completeButton);
        listButtons.appendChild(deleteButton);
        todoDiv.appendChild(textContainer);
        todoDiv.appendChild(listButtons);
        todoList.appendChild(todoDiv);

        if (todo.completed) {
            newTodo.classList.add('completed');
        }
    });
}

function updateLocalCompleted(todoItem) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todoItem.querySelector('.todo-item').innerText;
    const todo = todos.find(item => item.text === todoIndex);
    todo.completed = !todo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todoItem) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todoItem.querySelector('.todo-item').innerText;
    todos = todos.filter(todo => todo.text !== todoIndex);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalStorage() {
    const todos = document.querySelectorAll('.todo-item');
    const todosArray = [];
    todos.forEach(todo => {
        const isCompleted = todo.classList.contains('completed');
        todosArray.push({ text: todo.innerText, completed: isCompleted });
    });
    localStorage.setItem('todos', JSON.stringify(todosArray));
}
