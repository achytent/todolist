export default class Task {
    constructor(title, description, dueDate, prioriry) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = prioriry;
    }
}

Task.prototype.updateDescription = function (description) {
    this.description = description;
}
