import { Task } from "~/entities/task"
import { useEffect, useRef } from 'react';
import { TaskCard } from "~/components/task-card";
import { Form } from "@remix-run/react";


export function TaskList(props: {tasks: Task[]}) {
    const cards = props.tasks.map((task) => {
        return <li><TaskCard task={task}></TaskCard></li>
      })
    
      const formRef = useRef<HTMLFormElement>(null);
      const titleRef = useRef<HTMLInputElement>(null);
    
      useEffect(() => {
        formRef.current?.reset();
        titleRef.current?.focus();
      });
    
      return (
        <div>
          <ul>{cards}</ul>
          <Form replace method="post" ref={formRef} >
            <input type="text" name="name" ref={titleRef} />
            <button type="submit">+</button>
          </Form>
        </div>
      );
}
