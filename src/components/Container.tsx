import React from "react";

type props = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: props) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
