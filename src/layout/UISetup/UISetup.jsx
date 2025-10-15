import React from "react";
import Topbar from "../Topbar/Topbar";
import Scene from "../Scene/Scene";
import Sidebar from "../Sidebar/Sidebar";
import ContextMenu from "../../components/ContextMenu/ContextMenu";

const UISetup = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex">
        <div className="w-[20%] h-full">
          <Sidebar />
        </div>
        <div className="w-[80%] h-full">
          <Topbar />
          <Scene />
        </div>
      </div>
      <ContextMenu />
    </div>
  );
};

export default UISetup;
