import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"select"> {
  title?: string;
}

const Select = ({ className, title, name, children, ...rest }: Props) => {
  return (
    <>
      {!!title && (
        <label
          htmlFor={title || "default"}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select {title}
        </label>
      )}
      <select
        id={title || "default"}
        name={name}
        onChange={(e) => {}}
        className={`bg-gray-50 border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:outline-none active:border-gray-300 focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ${className}`}
        {...rest}
      >
        {children}
      </select>
    </>
  );
};

export default Select;
