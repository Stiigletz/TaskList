const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Load existing tasks when the page loads
window.onload = loadTasksFromLocalStorage;

function makeTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        todoList.appendChild(li);
        taskInput.value = '';
        li.addEventListener('click', taskCompleted);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete';
        deleteBtn.addEventListener('click', taskDelete);
        li.appendChild(deleteBtn);

        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = todoList.getElementsByTagName('li');

    for (let i = 0; i < taskItems.length; i++) {
        tasks.push(taskItems[i].textContent.replace('delete', '').trim());
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', taskDelete);
            li.appendChild(deleteBtn);

            li.addEventListener('click', taskCompleted);
            todoList.appendChild(li);
        });
    }
}

function taskCompleted(event) {
    const task = event.target;
    if (task.tagName === 'LI') {
        task.classList.toggle('Completed');
    }
}

function taskDelete(event) {
    const task = event.target.parentElement;
    todoList.removeChild(task);
    saveTasksToLocalStorage(); // Save changes after deletion
}
