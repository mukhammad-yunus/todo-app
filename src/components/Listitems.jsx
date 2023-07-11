import React, {  } from "react";
import { useData } from "../contexts/DataContext";
import Listitem from "./others/ListItem";

function Listitems() {
  const { data} = useData();

  const items =
    data.length > 0 &&
    data.map((item) => (
      <Listitem key={item.id} item={item}/>
    ));
  return (
    <ul className="space-y-2 overflow-y-auto rounded bg-white p-3">{items}</ul>
  );
}

export default Listitems;
