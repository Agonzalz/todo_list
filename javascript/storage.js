import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

const Storage = (function() {
    function saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function loadProjects() {
        const data = JSON.parse(localStorage.getItem('projects')) || [];
        // Convert back to project/todo instances
        return data.map(projectData => {
            const project = createProject(projectData.name);
            projectData.todos.forEach(todoData => {
                const todo = createTodo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority
                );
                todo.completed = todoData.completed;
                project.addTodo(todo);
            });
            return project;
        });
    }

    return { saveProjects, loadProjects };
})();


export { Storage };