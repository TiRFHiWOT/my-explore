import React from "react";

const Grid = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="w-full h-full absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
        stroke="none"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ffffff", stopOpacity: 0 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#000000", stopOpacity: 0.2 }}
            />
          </linearGradient>
        </defs>
        <g stroke="url(#gridGrad)" strokeWidth="2">
          <line x1="0" y1="0" x2="200" y2="200" />
          <line x1="200" y1="0" x2="0" y2="200" />
          <line x1="0" y1="100" x2="200" y2="100" />
          <line x1="100" y1="0" x2="100" y2="200" />
        </g>
      </svg>
    </div>
  );
};

export default Grid;
