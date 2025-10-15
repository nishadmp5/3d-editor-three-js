import React from "react";

const Logo = () => {
  return (
    <div className="bg-white px-4 sm:px-6 py-3.5 border-b border-gray-200 w-full">
      {/* The anchor tag makes the logo clickable, typically linking to the homepage. */}
      <a href="/" className="inline-flex items-center gap-x-2">
        <span className="text-2xl font-bold text-primary tracking-tight">
          Studio 3D
        </span>
      </a>
    </div>
  );
};

export default Logo;
