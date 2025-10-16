import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, DocumentIcon, RedoIcon, UndoIcon } from "../../components/Icons/Icons";
import useStore, { useTemporalStore } from "../../zustandStore/store";
import SaveButton from "../../components/SaveButton/SaveButton";
import TipsViewer from "../../components/TipsViewer/TipsViewer";

const Topbar = () => {
  // const triggerSave = useStore((state) => state.triggerSave);
  const { projectName, setProjectName } = useStore();

  const { undo, redo, pastStates, futureStates } = useTemporalStore(
    (state) => ({
      undo: state.undo,
      redo: state.redo,
      pastStates: state.pastStates,
      futureStates: state.futureStates,
    })
  );

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Select all text for easy replacement
    }
  }, [isEditing]);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-3">
          <DocumentIcon />
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={projectName}
              onChange={handleProjectNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeyDown}
              className="bg-white border border-gray-300 rounded-md px-2 py-0.5 text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <span
              className="text-gray-800 font-medium text-base cursor-pointer hover:bg-gray-100 px-2 py-0.5 rounded-md"
              onClick={() => setIsEditing(true)}
              title="Click to edit project name"
            >
              {projectName || "Untitled Project"}
            </span>
          )}
        </div>

        {/* Middle Section */}
        <TipsViewer/>

        {/* Right Section */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <button
            type="button"
            className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            title="Undo"
            disabled={!canUndo}
            onClick={() => undo()}
          >
            <UndoIcon />
          </button>
          <button
            type="button"
            className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            title="Redo"
            disabled={!canRedo}
            onClick={() => redo()}
          >
            <RedoIcon />
          </button>

         <SaveButton/>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
