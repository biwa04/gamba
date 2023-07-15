import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Task } from "~/entities/task";
import { json } from "@remix-run/node";
import { TaskCard } from "~/components/task-card";
import { AddTasks, GetTasks } from "~/repositories/task";
import { useEffect, useRef } from 'react';

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

  const cards = tasks.map((task) => {
    return <li><TaskCard task={task}></TaskCard></li>
  })

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    formRef.current?.reset();
    titleRef.current?.focus();
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ul>{cards}</ul>
      <Form replace method="post" ref={formRef} >
        <input type="text" name="name" ref={titleRef} />
        <button type="submit">+</button>
      </Form>
    </div>
  );
}
