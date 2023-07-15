import { Task } from "~/entities/task"

export function TaskCard(props: {task: Task}) {
    return (
        <div>
            <p>{props.task.name}</p>
        </div>
    )
}
