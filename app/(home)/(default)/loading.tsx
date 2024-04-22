import React from "react";

const loading = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
      {[1, 2, 3, 4, 5]?.map((_, index) => {
        return (
          <div
            className="w-full animate-pulse  border-0 rounded-md bg-gray-300 dark:bg-graident-dark p-5 hover:ring-2 ring-gray-300 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
            key={index}
          >
            <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative"></div>
            <div className="space-y-2">
              <p className="text-sm dark:text-gray-200 h-5 bg-gray-300"></p>
              <p className="text-sm dark:text-gray-200 h-10 bg-gray-300"></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default loading;
