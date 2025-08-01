document.addEventListener('DOMContentLoaded', () => {
    // ✅ DOM ELEMENT SELECTION
    const addButton = document.getElementById('add-task-btn'); // Required for click
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ✅ LOAD EXISTING TASKS FROM localStorage
    loadTasks();

    // ✅ ADD TASK ON BUTTON CLICK
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    // ✅ ADD TASK ON ENTER KEY PRESS
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    // ✅ LOAD TASKS FROM LOCAL STORAGE ON STARTUP
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => createTaskElement(taskText));
    }

    // ✅ ADD TASK FUNCTION
    function addTask(taskText) {
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ""; // Clear the input field
    }

    // ✅ CREATE AND INSERT TASK INTO DOM
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // ✅ REMOVE TASK ON CLICK
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // ✅ SAVE TASK TO LOCAL STORAGE
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ✅ REMOVE TASK FROM LOCAL STORAGE
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
