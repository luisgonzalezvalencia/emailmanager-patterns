import { EmailLeaf } from "./CarpetaComposite/EmailLeaf";

export class TaskManager {
    private static instance: TaskManager;
    task: EmailLeaf[] = [];

    private constructor(){

    }

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    public AddTask(task: EmailLeaf): void {
        this.task.push(task);
    }

    public DeleteTask(task: EmailLeaf): void {
        let index = this.task.indexOf(task);
        if (index > -1) {
            this.task.splice(index, 1);
        }
    }


    public getTask(): EmailLeaf[] {
        return this.task;
    }
}