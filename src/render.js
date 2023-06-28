import { changeProject, removeProject, removeTask } from "./index";

function updateTasksList(project) {
    const tasks = JSON.parse(localStorage.getItem(project));
    
    const tasksList = document.querySelector(".tasks-list");
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        const taskTitle = document.createElement('h4');
        taskTitle.textContent = task.title;
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        const taskDate = document.createElement('p');
        taskDate.textContent = task.dueDate;
        taskDiv.classList.add('task');

        switch(task.priority){
            case "1":
                taskDiv.classList.add('easy');
                break;
            case "2":
                taskDiv.classList.add('normal');
                break;
            case "3":
                taskDiv.classList.add('urgent');
                break;
        }

        const taskRemoveBtn = document.createElement('button');
        taskRemoveBtn.textContent = "X";
        taskRemoveBtn.classList.add('remove-task');
        taskRemoveBtn.dataset.task = task.title;
        taskRemoveBtn.addEventListener('click', (event) => removeTask(event));

        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(taskRemoveBtn);

        tasksList.appendChild(taskDiv)
    })
}

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

export { updateProjectsList, updateTasksList }