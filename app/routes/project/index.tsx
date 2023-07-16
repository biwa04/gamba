import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import type { Task } from "~/entities/task";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AddTasks, GetTasks } from "~/repositories/task";
import { TaskList } from "~/components/task-list";

export const loader = async ({request}: LoaderArgs) => {
  const tasks: Task[] = GetTasks()

  return json({
    tasks: tasks
  }) 
}

export const action = async ( { request } : ActionArgs) => {
  const name = (await request.formData()).get("name")?.toString()

  if(!name) { return null }

  AddTasks({name: name})

  return null
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div style={{display: "flex"}}>
      <TaskList tasks={tasks}></TaskList>
    </div>
  )
}
