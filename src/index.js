import './style.css'
import Task from './task'
import Project from './project'

const addProjectForm = document.querySelector(".add-project")
addProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProjectTitle = event.target['project-title'].value;
    let project = new Project(newProjectTitle);
    
    localStorage.setItem(project.title, project.title)
    updateDisplay();
})

function updateDisplay() {
    const projectsList = document.querySelector('.projects-list');
    projectsList.innerHTML = "";

    for(let i = 0; i < localStorage.length; i++){
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-title');
        projectDiv.textContent = localStorage.key(i);
        projectsList.appendChild(projectDiv); 
    }
}