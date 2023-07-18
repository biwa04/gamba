export type TaskStatus = "ToDo" | "Doing" | "StandBy" | "Done" | "Couldn't"

export type Task = {
    name: string
    status: TaskStatus
}
