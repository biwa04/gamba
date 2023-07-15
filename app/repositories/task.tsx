import { Task } from "~/entities/task"

var tasks: Task[] = []

export function GetTasks(){
    return tasks
}

export function AddTasks(task: Task) {
    tasks = tasks.concat(task)
}
