import React, { useEffect } from "react";
import avatar from "../img/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faGear } from "@fortawesome/free-solid-svg-icons";
import AddNew from "./AddNew";
import { useData } from "../contexts/DataContext";
import Listitems from "./Listitems";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate()
  const {isOpen, handleOpen, setIsOpen} = useData()
  const {logout, UserName} = useAuth()
  const mobileCName = isOpen ? "absolute left-0 top-0 w-full opacity-100 duration-300" : "opacity-0 w-0 duration-100"

  useEffect(() => {
    function handleOpenSideBar(){
      if(window.innerWidth > 1024){
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleOpenSideBar)
  
    return () => {
      window.removeEventListener("resize", handleOpenSideBar)
    }
  }, [false])
   
  return (
    <section className={`${mobileCName} h-screen transition-all ease lg:w-[40%] xl:w-[35%] 2xl:w-[30%] lg:opacity-100 overflow-hidden lg:block`}>
      <div className="no-scrollbar flex h-full flex-col justify-between overflow-y-scroll bg-secondaryBg p-2">
        <div className="flex w-full items-center justify-between">
          <img
            src={avatar}
            alt="avatar"
            className="h-[80px] w-[80px] rounded-full object-cover"
          />
          <h3 className="ml-2 text-right text-lg font-bold hidden md:block mr-auto m-0">
            {UserName && UserName.firstName} {UserName && UserName.lastName}
          </h3>
          <FontAwesomeIcon
        onClick={handleOpen}
        icon={faXmark}
        className={`cursor-pointer text-[2rem] lg:hidden ${!isOpen && "hidden"}`}
      />
        </div>
        {/* Lists */}
        <div className="my-6 h-full justify-self-start">
          {/* Add new List */}
          <AddNew
            id="forList"
            label="Add new list"
            name="title"
            placeholder="New list here ..."
            taskSide={false}
          />
          {/* List items */}
          <div className="max-h-2/3 my-3 h-auto space-y-2 overflow-hidden">
            <h3 className="text-xl font-bold">Lists</h3>
            <Listitems/>
          </div>
        </div>
        {/* Setting and Log out */}
        <div className="">
          <div className=" hidden flex cursor-pointer items-center space-x-1 py-3">
            <FontAwesomeIcon icon={faGear} className=" text-2xl" />
            <p className="py-3 font-semibold hover:text-stone-500">Settings</p>
          </div>
          <button className="w-full rounded bg-buttonBg p-2 text-white hover:bg-buttonHoverBg" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
