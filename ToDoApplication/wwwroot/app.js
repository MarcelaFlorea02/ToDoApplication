const apiBase = '/api/todo';

//get all todos - featch 
async function fetchTodos() {
    const response = await fetch(apiBase, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok)
        return [];
    return response.json();
}


//create todo
async function createTodo(description) {

    const response = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description, isDone: false })
    });

    if (!response.ok) {
        console.log("error");
        throw new Error("Server error occurred");
    }
//to do refresh 
}


//update todo
async function updateTodo(id, dto) {
    const response = await fetch(`${apiBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
    });

    if (!response.ok) {
        console.log("error");
        throw new Error("Server error occurred");
    }
//to do refresh 
}

//delete todo
async function deleteTodo(id) {
    const response = await fetch(`${apiBase}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        console.log("error");
        throw new Error("Server error occurred");
    }
//to do refresh 
}

// Render the list of todos into the <ul id="todos-list"> element.
// Each item shows a checkbox (toggles isComplete), a name, and Edit/Delete buttons.
function renderTodos(todos) {
  const ul = document.getElementById('todos-list');
  ul.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');

    const left = document.createElement('div');
    left.className = 'todo-left';

    // Checkbox toggles the isComplete state. We call the API with the full DTO.
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.isDone;
    cb.addEventListener('change', async () => {
      try {
        await updateTodo(t.id, { id: t.id, description: t.description, isDone: cb.checked });
        await refresh();
      } catch (err) {
        // In a real app show a non-blocking message in the UI instead of alert.
        alert(err);
      }
    });

    const name = document.createElement('div');
    name.className = 'todo-name' + (t.isDone ? ' completed' : '');
    name.textContent = t.description;

    left.appendChild(cb);
    left.appendChild(name);

    const right = document.createElement('div');

    // Edit opens a simple prompt to change the name. It then calls PUT.
    // For better UX replace this with inline editing or a modal.
    const editBtn = document.createElement('button');
    editBtn.className = 'small-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newName = prompt('Edit todo', t.description);
      if (newName !== null) {
        updateTodo(t.id, { id: t.id, description: newName, isDone: t.isDone }).then(refresh).catch(err => alert(err));
      }
    });

    // Delete asks for confirmation then calls DELETE.
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'small-btn danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (!confirm('Delete this todo?')) return;
      deleteTodo(t.id).then(refresh).catch(err => alert(err));
    });

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);

    ul.appendChild(li);
  });
}

// Refresh the UI by fetching data and re-rendering.
async function refresh() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

// Wire up the form and initial load.
// The form uses built-in HTML validation (required, maxlength) before submission.
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('new-todo-item-form');
  const input = document.getElementById('new-todo-item-name-input');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return; // guard against empty input
    try {
      await createTodo(v);
      input.value = '';
      await refresh();
    } catch (err) {
      // In production, render a user-friendly error instead of alert.
      alert(err);
    }
  });

  // Initial load of todos
  refresh();
});
