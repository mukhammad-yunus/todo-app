import React, {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../contexts/DataContext";
import Edit from "./Edit";

function Listitem({ item }) {
  const { getCurrentList, deleteList } = useData();
  const [isEdit, setIsEdit] = useState(false);
  const { title, date, id } = item;
  return (
    <>
      {isEdit ? (
        <Edit
          id={id}
          textValue={title}
          dateValue={date}
          placeholder="Edit the list"
          taskSide={false}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <li
            key={id}
            className="flex cursor-pointer items-center justify-between rounded p-4 py-2 hover:bg-slate-200"
          >
            <div
              className="flex w-3/4 flex-col lg:flex-row lg:items-center lg:justify-between"
              onClick={() => getCurrentList(id)}
            >
              <span className="block w-full overflow-hidden ">
                <p className="whitespace-nowrap text-left text-xl font-bold">
                  {title}
                </p>
              </span>
              <span className="block max-w-full whitespace-nowrap lg:ml-4">
                {date}
              </span>
            </div>
            <span className="w-1/4 space-x-2 text-center">
              <FontAwesomeIcon icon={faEdit} className="hover:text-stone-400" 
              onClick={()=>setIsEdit(prev=> !prev)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="hover:text-red-400"
                onClick={() => deleteList(id)}
              />
            </span>
          </li>
        </>
      )}
    </>
  );
}

export default Listitem;
