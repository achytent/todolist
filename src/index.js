import './style.css'
import Task from './task'
import Project from './project'

const defaultProject = new Project("Default Project");
defaultProject.tasks.push('Eat');
defaultProject.tasks.push('Sleep');
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
    tasks.push(event.target["task-text"].value);
    event.target["task-text"].value = "";

    localStorage.setItem(currentProject, JSON.stringify(tasks))
    updateTasksList(currentProject);
})

function updateProjectsList() {
    const projectsList = document.querySelector('.projects-list');
    projectsList.innerHTML = "";

    for(let i = 0; i < localStorage.length; i++){
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-title');
        projectDiv.textContent = localStorage.key(i);
        projectDiv.addEventListener('click', () => changeProject(localStorage.key(i)));

        const projectRemoveBtn = document.createElement('button');
        projectRemoveBtn.textContent = "X";
        projectRemoveBtn.classList.add('remove-project');
        projectRemoveBtn.dataset.project = localStorage.key(i);
        projectRemoveBtn.addEventListener('click', (event) => removeProject(event));

        
        projectDiv.appendChild(projectRemoveBtn);
        projectsList.appendChild(projectDiv); 
    }
}

function removeProject(event){
    localStorage.removeItem(event.target.dataset.project);
    updateProjectsList();
}

function changeProject(project) {
    currentProject = project;
    updateTasksList(project);
}

function updateTasksList(project) {
    const tasks = JSON.parse(localStorage.getItem(project));
    
    const tasksList = document.querySelector(".tasks-list");
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = task;
        tasksList.appendChild(taskDiv)
    })
}