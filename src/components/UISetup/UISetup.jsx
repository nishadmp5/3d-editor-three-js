import React from "react";
import Topbar from "../../layout/Topbar/Topbar";
import Scene from "../../layout/Scene/Scene";
import Sidebar from "../../layout/Sidebar/Sidebar";
import ContextMenu from "../ContextMenu/ContextMenu";

const UISetup = () => {
  return (
    <div className="w-full h-full bg-gray-300">
      <Topbar />
      <div className="w-full h-full flex">
        <div className="w-[80%] h-full">
          <Scene />
        </div>
        <div className="w-[20%] h-full">
          <Sidebar />
        </div>
      </div>
      <ContextMenu/>
    </div>
  );
};

export default UISetup;
