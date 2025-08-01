document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => createTaskElement(taskText));
    }

    function addTask(taskText) {
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = "";
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        // ✅ Optional: add a class to li if needed
        // li.classList.add('task-item'); 

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // ✅ This ensures CSS styles apply properly

        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

