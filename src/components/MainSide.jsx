import React, { useEffect, useState } from "react";
import AddNew from "./AddNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TaskItems from "./TaskItems";
import { useData } from "../contexts/DataContext";

function MainSide() {
  const { currentList, handleOpen, isOpen } = useData();
  const [percentage, setPercentage] = useState(0);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    if (currentList) {
      if (currentList.tasks.length !== 0) {
        const numDoneTasks = currentList.tasks.filter((task) => task.checked);
        if (numDoneTasks) {
          setPercentage(
            Math.round((numDoneTasks.length / currentList.tasks.length) * 100)
          );
        }
      } else {
        setPercentage(0);
      }
      setTitle(currentList.title);
      setDate(currentList.date);
    }
  }, [currentList]);

  return (
    <main className="w-full overflow-y-auto bg-primaryColor px-5 lg:w-[60%] xl:w-[65%] 2xl:w-[70%] ">
      <div className="flex items-center justify-between py-5 text-2xl lg:text-3xl">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-base">{date}</p>
        </div>
        <FontAwesomeIcon
          onClick={handleOpen}
          icon={faBars}
          className={`cursor-pointer text-[2rem] lg:hidden ${
            isOpen && "hidden"
          }`}
        />
      </div>

      {/* Porgress bar */}
      <div className="mb-8 flex items-center space-x-1">
        <div className="h-[1.5rem] w-[100%] rounded-full border-2 border-solid border-black">
          <div
            style={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-green-400"
          ></div>
        </div>

        <p className="pl-4">{percentage}%</p>
      </div>
      {/* Add to-dos */}
      <AddNew
        id="forTask"
        label="Add new task"
        name="task"
        placeholder="New list here ..."
        taskSide={true}
      />
      {/* to-dos progress */}
      <TaskItems />
    </main>
  );
}

export default MainSide;
