const STORAGE_KEY = 'todo_tasks';
const THEME_KEY = 'todo_theme';

let activeFilter = 'all';

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function initTheme() {
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

function loadTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const all = loadTasks();

  const tasks = all.filter(t => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'active' && !t.done) ||
      (activeFilter === 'completed' && t.done);
    const matchesSearch = t.text.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-msg');

  list.innerHTML = '';
  empty.textContent = all.length === 0
    ? 'No tasks yet — add one above.'
    : 'No tasks match your filter.';
  empty.classList.toggle('hidden', tasks.length > 0);

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const label = document.createElement('span');
    label.className = 'task-label';
    label.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, label, deleteBtn);
    list.appendChild(li);
  });
}

function addTask(text) {
  const tasks = loadTasks();
  tasks.push({ id: Date.now(), text: text.trim(), done: false });
  saveTasks(tasks);
  renderTasks();
}

function toggleTask(id) {
  const tasks = loadTasks().map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  saveTasks(loadTasks().filter(t => t.id !== id));
  renderTasks();
}

document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('task-input');
  if (input.value.trim()) {
    addTask(input.value);
    input.value = '';
  }
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});

document.getElementById('search-input').addEventListener('input', renderTasks);

initTheme();
renderTasks();
