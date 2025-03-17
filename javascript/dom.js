import { Storage } from "./storage.js";

const DOM = (function() {
    const projectList = document.getElementById('project-list');
    const todoList = document.getElementById('todo-list');

    function renderProjects(projects) {
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const btn = document.createElement('button');
            btn.textContent = project.name;
            btn.addEventListener('click', () => {
                renderTodos(project);
            });
            projectList.appendChild(btn);
        });
    }

    function renderTodos(project) {
        todoList.innerHTML = '';
        project.todos.forEach((todo, index) => {
            const div = document.createElement('div');
            div.classList.add('todo');
            div.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <p>Due: ${todo.dueDate}</p>
                <p>Priority: ${todo.priority}</p>
                <p>Status: ${todo.completed ? 'Completed' : 'Pending'}</p>
                <button data-index="${index}" class="toggle">Toggle Complete</button>
                <button data-index="${index}" class="delete">Delete</button>
            `;
            todoList.appendChild(div);
        });

        // Attach event listeners after rendering to avoid duplicate bindings
        const toggleButtons = todoList.querySelectorAll('.toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                project.todos[index].toggleComplete();
                Storage.saveProjects(appState.projects);
                renderTodos(project);
            });
        });

        const deleteButtons = todoList.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                project.removeTodo(index);
                Storage.saveProjects(appState.projects);
                renderTodos(project);
            });
        });
    }

    return { renderProjects, renderTodos };
})();

export {DOM}