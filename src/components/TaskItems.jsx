import React, { useEffect, useState } from "react";

import { useData } from "../contexts/DataContext";
import TaskItem from "./others/TaskItem";

function TaskItems() {
  const { currentList } = useData();
  const [tasks, setTasks] = useState();
  const [doneTasks, setDoneTasks] = useState();
  const [showDoneTasks, setShowDoneTasks] = useState(false);

  useEffect(() => {
    if (currentList) {
      function compareTimes(a, b) {
        if (a.time && b.time) {
          const timeA = new Date(`2000-01-01T${a.time}`);
          const timeB = new Date(`2000-01-01T${b.time}`);
          return timeA - timeB;
        } else if (a.time) {
          return -1; // a has time, b doesn't, so a should come first
        } else if (b.time) {
          return 1; // b has time, a doesn't, so b should come first
        } else {
          return 0; // both a and b don't have time, no preference in ordering
        }
      }
      const checkedItems = currentList.tasks.filter((task) => task.checked);
      const uncheckedItems = currentList.tasks.filter((task) => !task.checked);
      setTasks(() => {
        uncheckedItems.sort(compareTimes);
        return uncheckedItems.map((item) => (
          <TaskItem key={item.id} array={item} />
        ));
      });
      setDoneTasks(() => {
        checkedItems.sort(compareTimes);
        return checkedItems.map((item) => (
          <TaskItem key={item.id} array={item} />
        ));
      });
    }
  }, [currentList]);
  useEffect(() => {
    if (doneTasks && doneTasks.length!== 0) {
      setShowDoneTasks(true);
    } else {
      setShowDoneTasks(false);
    }
  }, [doneTasks]);

  return (
    <div className="">
      <p className="font-semibold">{tasks && tasks.length > 1 ? "Tasks" : "Task"} to do</p>
      <div className="min-h-[30vh] rounded border p-2 mb-6">{tasks}</div>
      {showDoneTasks && (
      <div>
        <p className="font-semibold">Done {doneTasks && doneTasks.length > 1 ? "tasks" : "task"}</p>
          <div className="min-h-[30vh] rounded border p-2">{doneTasks}</div>
      </div>
      )}
    </div>
  );
}

export default TaskItems;
