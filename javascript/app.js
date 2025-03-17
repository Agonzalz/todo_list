import { createProject } from './project.js';
import { createTodo } from './todo.js';
import { Storage } from './storage.js';
import { DOM } from './dom.js';
const appState = {
    projects: Storage.loadProjects(),
};

if (appState.projects.length === 0) {
    const defaultProject = createProject('Inbox');
    appState.projects.push(defaultProject);
    Storage.saveProjects(appState.projects);
}

DOM.renderProjects(appState.projects);

// Add project and todo form logic (simplified example)
document.getElementById('add-project').addEventListener('click', () => {
    const name = prompt('Enter project name:');
    if (name) {
        const project = createProject(name);
        appState.projects.push(project);
        Storage.saveProjects(appState.projects);
        DOM.renderProjects(appState.projects);
    }
});

document.getElementById('add-todo').addEventListener('click', () => {
    const title = prompt('Enter todo title:');
    const desc = prompt('Enter description:');
    const due = prompt('Enter due date:');
    const priority = prompt('Enter priority (low/medium/high):');
    const todo = createTodo(title, desc, due, priority);
    appState.projects[0].addTodo(todo); // Add to Inbox for simplicity
    Storage.saveProjects(appState.projects);
    DOM.renderTodos(appState.projects[0]);
});
