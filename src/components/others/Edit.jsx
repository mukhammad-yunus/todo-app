import React, {useState } from "react";
import { useData } from "../../contexts/DataContext";

function Edit({ id, textValue, dateValue, placeholder, taskSide, setIsEdit }) {
  const { updateList } = useData();
  const [changeText, setChangeText] = useState(textValue);
  const [changeDate, setChangeDate] = useState(dateValue);

  const dateInputType = taskSide ? "time" : "date";
  const textInputName = taskSide ? "task" : "title";

  const inputTextCName = taskSide
    ? "block w-full cursor-text rounded border bg-inputBg p-2 md:w-1/2"
    : "border cursor-text rounded bg-inputBg p-2";
  const gParentDivCName = taskSide
    ? "flex w-full flex-col space-y-3 md:flex-row md:space-x-2 md:space-y-0"
    : "flex flex-col space-y-3";
  const pDivCName = taskSide
    ? "flex w-full flex-col justify-start space-y-3 md:w-1/2 md:flex-row md:space-x-2 md:space-y-0"
    : "flex flex-col space-y-3 md:flex-row md:space-x-2 md:space-y-0";
  const dateInputTypeCName = taskSide
    ? "border items-center flex p-1 py-2 w-full  justify-start space-y-3 md:w-1/2 rounded md:space-x-2 md:space-y-0 md:py-0 cursor-pointer"
    : "border cursor-pointer rounded bg-inputBg p-2  md:w-1/2";

  function handleChange(e) {
    e.preventDefault();

    const editValue = {
      [dateInputType]: changeDate,
      [textInputName]: changeText,
    };
    if (taskSide) {
      const option = {
        id,
        editTask: true,
        editValue,
      };
      updateList(option);
      setIsEdit(prev => !prev)
    }else{
      const option = {
        id,
        editList: true,
        editValue,
      };
      updateList(option);
      setIsEdit(prev => !prev)
    }
  }
  return (
    <form
      id={id}
      className="flex w-full flex-col space-y-3"
      onSubmit={(e) => {
        handleChange(e);
      }}
    >
      <div className={`transition-all ease-in-out ${gParentDivCName}`}>
        <input
          type="text"
          name={textInputName}
          placeholder={placeholder}
          className={inputTextCName}
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
          required
          maxLength={"10"}
        />
        <div className={pDivCName}>
          <input
            type={dateInputType}
            name={dateInputType}
            value={changeDate}
            onChange={(e) => setChangeDate(e.target.value)}
            className={dateInputTypeCName}
            required={!taskSide && true}
          />
          <button
            className={`w-full cursor-pointer rounded bg-buttonBg p-2 text-white hover:bg-buttonHoverBg md:w-${
              taskSide ? "1/2" : "full"
            }`}
          >
            Change
          </button>
        </div>
      </div>
    </form>
  );
}

export default Edit;
