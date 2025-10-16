
const TransformInputRow = ({
  label,
  values = [0, 0, 0],
  onValueChange,
  showX,
  showY,
  showZ,
}) => {
  const handleValueChange = (axisIndex, value) => {
    
    const newValue = parseFloat(value);
    
    if (!isNaN(newValue)) {
      onValueChange(axisIndex, newValue);
    }
  };


  return (
    <div className="flex flex-col gap-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-x-3 w-full">
        {showX && (
          <div className="flex items-center gap-x-1.5 flex-1">
            <span className="text-sm text-gray-500 w-4 text-center">X</span>
            <input
              type="number"
              step="0.1"
              value={values[0]}
              onChange={(e) => handleValueChange(0, e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md text-sm text-center focus:ring-1 focus:ring-primary focus:border-primary transition"
            />
          </div>
        )}
        {showY && (
          <div className="flex items-center gap-x-1.5 flex-1">
            <span className="text-sm text-gray-500 w-4 text-center">Y</span>
            <input
              type="number"
              step="0.1"
              value={values[1]}
              onChange={(e) => handleValueChange(1, e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md text-sm text-center focus:ring-1 focus:ring-primary focus:border-primary transition"
            />
          </div>
        )}
        {showZ && (
          <div className="flex items-center gap-x-1.5 flex-1">
            <span className="text-sm text-gray-500 w-4 text-center">Z</span>
            <input
              type="number"
              step="0.1"
              value={values[2]}
              onChange={(e) => handleValueChange(2, e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded-md text-sm text-center focus:ring-1 focus:ring-primary focus:border-primary transition"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransformInputRow;
