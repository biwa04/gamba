import { Task, TaskStatus } from "~/entities/task"
import { useEffect, useRef } from 'react';
import { TaskCard } from "~/components/task-card";
import { Form } from "@remix-run/react";

export function TaskList(props: {tasks: Task[], status: TaskStatus}) {
    const cards = props.tasks.filter((task) => {
        return task.status == props.status
    })
    .map((task) => {
        return <li><TaskCard task={task}></TaskCard></li>
    })

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        formRef.current?.reset();
    });

    return (
    <div>
        <p>{props.status}</p>
        <ul>{cards}</ul>
        <Form replace method="post" ref={formRef} >
        <input type="hidden" name="status" value={props.status} />
        <input type="text" name="name" />
        <button type="submit">+</button>
        </Form>
    </div>
    );
}
