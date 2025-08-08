let todoList = [];
let currentFilter = 'all';

// Bikin ID unik untuk setiap todo
function generateId() {
    return Date.now() + Math.random().toString(16).slice(2);
}

function validateForm() {
    const todoInput = document.getElementById('todo-input').value.trim();
    const dateInput = document.getElementById('date-input').value;

    if (todoInput === '' || dateInput === '') {
        alert('Please enter a todo item and a due date.');
    } else {
        addTodo(todoInput, dateInput);
        document.getElementById('todo-input').value = '';
        document.getElementById('date-input').value = '';
    }
}

function addTodo(task, date) {
    const todoItem = {
        id: generateId(),
        task,
        date,
        done: false
    };

    todoList.push(todoItem);
    console.log(`Todo added: ${task} (Due: ${date})`);
    displayTodos(currentFilter);
}

function displayTodos(filter = 'all') {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    const filteredTodos = todoList.filter(item => {
        if (filter === 'complete') return item.done;
        if (filter === 'incomplete') return !item.done;
        return true; // all
    });

    if (filteredTodos.length === 0) {
        todoListElement.innerHTML = `<p class="text-gray-500 text-center">No todos found.</p>`;
        return;
    }

    filteredTodos.forEach(item => {
        todoListElement.innerHTML += `
            <div class="flex justify-between items-center p-3 mb-2 rounded-lg shadow-sm border 
                        ${item.done ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'} 
                        animate-fadeInUp hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <span class="${item.done ? 'line-through text-gray-500' : ''}">
                    ${item.task} (${item.date})
                </span>
                <div class="flex gap-2">
                    <button onclick="toggleComplete('${item.id}')" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                        ${item.done ? 'Undo' : 'Complete'}
                    </button>
                    <button onclick="deleteTodo('${item.id}')" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
}

function toggleComplete(id) {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        todo.done = !todo.done;
        console.log(`Todo "${todo.task}" marked as ${todo.done ? 'complete' : 'incomplete'}`);
    }
    displayTodos(currentFilter);
}

function deleteTodo(id) {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        console.log(`Todo deleted: ${todo.task}`);
    }
    todoList = todoList.filter(t => t.id !== id);
    displayTodos(currentFilter);
}

function clearTodos() {
    console.log('All todos deleted');
    todoList = [];
    displayTodos('all');
}

// Filter buttons
document.getElementById('filter-all').addEventListener('click', () => {
    currentFilter = 'all';
    displayTodos('all');
});

document.getElementById('filter-incomplete').addEventListener('click', () => {
    currentFilter = 'incomplete';
    displayTodos('incomplete');
});

document.getElementById('filter-complete').addEventListener('click', () => {
    currentFilter = 'complete';
    displayTodos('complete');
});
