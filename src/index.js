import './style.css'
import Task from './task'
import Project from './project'
import { updateProjectsList, updateTasksList } from './render';

// title, description, dueDate, prioriry

const defaultProject = new Project("Default Project");
defaultProject.tasks.push(new Task('Eat', 'Eat something healthy', "2022-11-09", "3"));
defaultProject.tasks.push(new Task('Sleep', '8hrs a day', "2022-11-09", "2"));
localStorage.setItem(defaultProject.title, JSON.stringify(defaultProject.tasks));
updateProjectsList();

let currentProject = defaultProject.title;

const addProjectForm = document.querySelector(".add-project")
addProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProjectTitle = event.target['project-title'].value;
    event.target['project-title'].value = "";
    let project = new Project(newProjectTitle);
    
    localStorage.setItem(project.title, JSON.stringify(project.tasks))
    updateProjectsList();
})

const addTaskForm = document.querySelector(".add-task");
addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const tasks = JSON.parse(localStorage.getItem(currentProject));

    const title = event.target['task-text'].value;
    const description = event.target['task-description'].value;
    const date = event.target['task-date'].value;
    const priority = event.target['priority'].value;

    const newTask = new Task(title, description, date, priority)

    console.log(newTask)
    tasks.push(newTask);
    
    event.target.reset();

    localStorage.setItem(currentProject, JSON.stringify(tasks))
    updateTasksList(currentProject);
})



function removeProject(event){
    localStorage.removeItem(event.target.dataset.project);
    updateProjectsList();
}

function removeTask(event){
    const taskToRemove = event.target.dataset.task;
    const tasks = JSON.parse(localStorage.getItem(currentProject));
    tasks.forEach(task => {
        if(task.title == taskToRemove){
            tasks.splice(tasks.indexOf(task), 1);
            return 0;
        }
    })
    localStorage.setItem(currentProject, JSON.stringify(tasks));
    updateTasksList(currentProject);
}

function changeProject(project) {
    currentProject = project;
    updateTasksList(project);
}

export { removeProject, changeProject, removeTask }