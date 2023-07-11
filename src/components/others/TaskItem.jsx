import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../contexts/DataContext";
import Edit from "./Edit";

function TaskItem({ array }) {
  const { updateTask, deleteTask } = useData();
  const [isEdit, setIsEdit] = useState(false);
  const { task, time, checked, id } = array;
  return (
    <>
      {isEdit ? (
        <div className="my-1  flex w-full items-center justify-between rounded py-2 pl-2 ">
          <Edit
            id={id}
            textValue={task}
            dateValue={time}
            placeholder="Edit the task"
            taskSide={true}
            setIsEdit={setIsEdit}
          />
        </div>
      ) : (
        <div
          className="group/item my-2 flex w-full items-center justify-between rounded bg-white py-2
        pl-2 shadow-sm ring-1 ring-slate-900/5 hover:bg-sky-500 hover:bg-slate-300 hover:ring-sky-500
        "
        >
          <div className="flex w-3/4 items-center space-x-2">
            <input
              id={id}
              type="checkbox"
              name="checked"
              checked={checked}
              onChange={() => {
                const option = {
                  id,
                  updChecked: true,
                  delTask: false,
                  edit: false,
                };
                updateTask(option);
              }}
              className="h-5 w-5 accent-green-600 cursor-pointer"
            />
            <label
              htmlFor={id}
              className={`group-hover/item:text-white flex w-full cursor-pointer items-center space-x-2  ${ checked && "text-gray-300 "
              }`}
            >
              {task}
            </label>
          </div>
          <div
            className={`flex w-1/4 items-center flex-wrap items-end space-x-2 text-center ${
              !time ? "justify-end" : "justify-between"
            }`}
          >
            <span
              className={`group-hover/item:text-white block items-center rounded border px-2 text-sm text-red-400 ${
                !time && "hidden"
              }`}
            >
              {time}
            </span>
            <span className="flex justify-between space-x-2 p-2">
              <FontAwesomeIcon
                icon={faEdit}
                className="cursor-pointer hover:text-slate-600 group-hover/item:text-white"
                onClick={() => setIsEdit((prev) => !prev)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer hover:text-red-400"
                onClick={() => deleteTask(id)}
              />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;
