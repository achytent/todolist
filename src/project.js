export default class Project {
    tasks = [];

    constructor(title){
        this.title = title;
    }
}

Project.prototype.addTask = function (task) {
    this.tasks.append(task);
}

