const DetectedColor = ({ color }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Color image */}
      <div
        className="w-14 h-14 rounded-full border"
        style={{ backgroundColor: color.hex }}
      />

      {/* Color name */}
      <span className="text-sm font-medium text-gray-800">
        {color.name}
      </span>
    </div>
  );
};

export default DetectedColor;
