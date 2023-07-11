import React, {useState } from "react";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../contexts/DataContext";

function AddNew({ id, label, name, placeholder, taskSide }) {
  const { handleListChange, today } = useData();
  const [isAdding, setIsAdding] = useState(false);

  const inputTextCName = taskSide
    ? "w-full cursor-text rounded border bg-inputBg p-2 md:w-1/2"
    : "border cursor-text rounded bg-inputBg p-2";
  const gParentDivCName = taskSide
    ? "flex w-full flex-col space-y-3 md:flex-row md:space-x-2 md:space-y-0"
    : "flex flex-col space-y-3";
  const pDivCName = taskSide
    ? "flex w-full flex-col justify-start space-y-3 md:w-1/2 md:flex-row md:space-x-2 md:space-y-0"
    : "flex flex-col space-y-3 md:flex-row md:space-x-2 md:space-y-0";
  const inputType = taskSide ? "time" : "date";
  const inputTypeCName = taskSide
    ? "border flex w-full flex-col justify-start space-y-3 md:w-1/2 md:flex-row rounded md:space-x-2 md:space-y-0 cursor-pointer"
    : "border cursor-pointer rounded bg-inputBg p-2  md:w-1/2";
  return (
    <form
      id={id}
      className="mb-10 flex flex-col space-y-3"
      onSubmit={(e) => handleListChange(e)}
    >
      <label
        htmlFor={name}
        className="flex cursor-pointer select-none items-center space-x-2 text-lg"
        onClick={() => setIsAdding((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
        <p>{label}</p>
      </label>
      <div
        className={`h-0 opacity-0 transition-all ease-in-out ${gParentDivCName} ${
          isAdding && "h-[100%] opacity-100 delay-150"
        }`}
      >
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          className={inputTextCName}
          required
          />
        <div className={pDivCName}>
          <input
            type={inputType}
            name={inputType}
            className={inputTypeCName}
            required={!taskSide && true}
            min={taskSide ? undefined : today}
          />
          <button
            className={`w-full cursor-pointer rounded bg-buttonBg p-2 text-white hover:bg-buttonHoverBg md:w-${
              taskSide ? "[150px]" : "1/2"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddNew;
