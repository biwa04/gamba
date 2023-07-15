import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Task } from "~/entities/task";
import { json } from "@remix-run/node";
import { TaskCard } from "~/components/task-card";
import { AddTasks, GetTasks } from "~/repositories/task";

export const loader = async ({request}: LoaderArgs) => {
  const tasks: Task[] = GetTasks()

  return json({
    tasks: tasks
  }) 
}

export const action = async ( { request } : ActionArgs) => {
  AddTasks({name: "new task"})
  return null
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();

  const cards = tasks.map((task) => {
    return <li><TaskCard task={task}></TaskCard></li>
  })

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ul>{cards}</ul>
      <Form method="post">
        <button type="submit">+</button>
      </Form>
    </div>
  );
}
