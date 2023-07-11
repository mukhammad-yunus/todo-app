import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import db, { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const DataContext = createContext();
export function useData() {
  return useContext(DataContext);
}
export function DataContextProvider({ children }) {
  // state to open sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function handleOpen() {
    setSidebarOpen((prev) => !prev);
  }

  // reference for adding newList
  const listsRef = collection(db, "tasksColl");

  // states for collecting, reusing and updating data
  const [data, setData] = useState([]);
  const [taskData, setTaskData] = useState({
    task: "",
    time: "",
    checked: false,
    id: "",
  });
  const [listData, setListData] = useState({
    title: "",
    date: "",
    uid: "",
    tasks: [],
  });
  const [currentList, setCurrentList] = useState();
  const [currentId, setCurrentId] = useState();
  const [currentUserId, setCurrentUserId] = useState("");
  const [today, setToday] = useState(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  async function getDocsFromDb() {
    try {
      if (currentUserId) {
        const dataFromDb = await getDocs(listsRef);
        const res = dataFromDb.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const dataArr = res.filter((item) => item.uid == currentUserId);
        if (dataArr.length) {
          const newList = dataArr.filter((list) => {
            return !data.some((prev) => prev.id === list.id);
          });
          if (newList.length == 1) {
            getCurrentList(newList[0].id);
          }
          dataArr.sort((a, b) => {
            const dateA = new Date(`${a.date}T00:00:00`);
            const dateB = new Date(`${b.date}T00:00:00`);
            return dateA - dateB;
          });
          setData(dataArr);
        } else {
          initData();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function initData() {
    if (currentUserId) {
      const newData = {
        title: "New list",
        date: today,
        uid: currentUserId,
        tasks: [],
      };
      addListToDb(newData);
      const res = await getDocs(listsRef);
      const array = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const filtered = array.filter((item) => item.uid == currentUserId)
      setData(filtered);
    }
  }

  function getCurrentList(id) {
    const theList = data.find((item) => item.id === id);
    setSidebarOpen(false);
    setCurrentId(id);
    setCurrentList(theList);
  }

  async function updateList({
    id,
    tasks,
    updTask,
    editTask,
    editValue,
    editList,
  }) {
    const curRef = doc(db, "tasksColl", id);
    if (updTask) {
      const newTasks = { tasks: [...tasks] };
      await updateDoc(curRef, newTasks);
    } else if (editTask) {
      const curRef = doc(db, "tasksColl", currentList.id);
      const newTasks = currentList.tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            ...editValue,
          };
        } else {
          return task;
        }
      });
      await updateDoc(curRef, { tasks: [...newTasks] });
      getDocsFromDb();
    } else if (editList) {
      const currentOne = data.find((list) => list.id == id);
      const curRef = doc(db, "tasksColl", currentOne.id);
      await updateDoc(curRef, { ...currentOne, ...editValue });
      getDocsFromDb();
    } else {
      const newTasks = { tasks: [taskData, ...tasks] };
      await updateDoc(curRef, newTasks);
    }
  }
  const addListToDb = async (newData) => {
    if (newData) {
      await addDoc(listsRef, newData);
    } else if (listData.title) {
      await addDoc(listsRef, listData);
    }
  };

  function updateTask({ id }) {
    const newTaskArr = currentList.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      } else {
        return task;
      }
    });
    const option = { id: currentId, tasks: newTaskArr, updTask: true };
    updateList(option);
    setTimeout(() => {
      getDocsFromDb();
    }, 500);
  }

  function deleteTask(id) {
    const newTaskArr = currentList.tasks.filter((task) => task.id !== id);
    const option = { id: currentId, tasks: newTaskArr, updTask: true };
    updateList(option);
    getDocsFromDb();
  }

  function deleteList(id) {
    const deleteIt = async () => {
      const listDb = doc(db, "tasksColl", id);
      await deleteDoc(listDb);
    };

    deleteIt();
    getDocsFromDb();
  }

  useEffect(() => {
    addListToDb();
    getDocsFromDb();
  }, [listData]);

  useEffect(() => {
    if (currentUserId) {
      getDocsFromDb();
      setListData((prev) => ({
        ...prev,
        uid: currentUserId,
      }));
    }
  }, [currentUserId]);

  useEffect(() => {
    const deleteExpired = async (id) => {
      const listDb = doc(db, "tasksColl", id);
      await deleteDoc(listDb);
    };
    const expiredFilter = data.filter(
      (list) => new Date(list.date) < new Date(today)
    );
    if (expiredFilter.length > 0) {
      expiredFilter.map((list) => deleteExpired(list.id));
      setTimeout(() => {
        getDocsFromDb();
      }, 500);
    }

    if (data.length == 1 || !currentList) {
      if (data[0]) {
        getCurrentList(data[0].id);
      }
    } else {
      getCurrentList(currentList.id);
    }
  }, [data]);

  useEffect(() => {
    if (taskData.task) {
      const option = {
        id: currentId,
        tasks: currentList.tasks,
        updTask: false,
      };

      updateList(option);
      setTimeout(() => {
        getDocsFromDb();
      }, 500);
    }
  }, [taskData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId("");
      }
    });

    return unsubscribe;
  }, []);

  async function handleListChange(e) {
    e.preventDefault();
    if (e.target.id === "forList") {
      for (let i = 0; i < 2; i++) {
        const { value, name } = e.target[i];
        setListData((prev) => ({
          ...prev,
          [name]: value,
        }));
        e.target[i].value = "";
      }
    } else if (e.target.id === "forTask") {
      for (let i = 0; i < 3; i++) {
        const { value, name } = e.target[i];

        setTaskData((prev) =>
          i === 2
            ? { ...prev, id: crypto.randomUUID() }
            : { ...prev, [name]: value }
        );
        e.target[i].value = "";
      }
    }
  }
  return (
    <DataContext.Provider
      value={{
        getCurrentList,
        data,
        listData,
        handleListChange,
        isOpen: sidebarOpen,
        setIsOpen: setSidebarOpen,
        handleOpen,
        currentList,
        updateList,
        deleteList,
        updateTask,
        deleteTask,
        today,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
