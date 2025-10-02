let tasks = [];

function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();

  if (task) {
    tasks.push({ task });
    saveTasks();
    renderTasks();
    input.value = '';
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  if (tasks.length === 0) {
    taskList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    taskList.innerHTML = tasks
      .map(
        (item, index) => `
        <li class="task-item">
          <div class="task-content">
            <span class="task-number">${index + 1}</span>
            <span class="task-text">${item.task}</span>
          </div>
          <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
        </li>
      `
      )
      .join('');
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const slider = document.getElementById('toggleSlider');

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  slider.textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const slider = document.getElementById('toggleSlider');
  document.documentElement.setAttribute('data-theme', savedTheme);
  slider.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

// Initialize
initTheme();
loadTasks();
