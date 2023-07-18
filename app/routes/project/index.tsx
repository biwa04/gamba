import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import type { Task, TaskStatus } from "~/entities/task";
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
  const formData = await request.formData()
  const name = formData.get("name")?.toString()
  const status = formData.get("status")?.toString()

  if(!name) { return null }

  AddTasks({name: name, status: (status as TaskStatus)})

  return null
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div style={{display: "flex"}}>
      <TaskList tasks={tasks} status="ToDo"></TaskList>
      <TaskList tasks={tasks} status="Doing"></TaskList>
      <TaskList tasks={tasks} status="StandBy"></TaskList>
      <TaskList tasks={tasks} status="Done"></TaskList>
      <TaskList tasks={tasks} status="Couldn't"></TaskList>
    </div>
  )
}
