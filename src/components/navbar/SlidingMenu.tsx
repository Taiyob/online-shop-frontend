import React, { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Home", "About", "Projects", "Experience", "Blogs"];

export const SlidingMenu = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoverTab, setHoverTab] = useState("Home");

  return (
    <ul className="relative mx-auto flex w-fit gap-x-4 px-2 py-1 rounded-lg ">
      {tabs.map((tab) => (
        <li
          key={tab}
          className="relative px-4 py-2 cursor-pointer rounded-md text-sm font-medium hover:text-white hover:bg-amber-600"
          onMouseOver={() => setHoverTab(tab)}
          onClick={() => setActiveTab(tab)}
        >
          {hoverTab === tab && (
            <motion.div
              layoutId="activeBackground"
              className="absolute inset-0  bg-amber-600 rounded-md z-[-1]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          {activeTab === tab && (
            <motion.div
              layoutId="activeBackground"
              className="absolute inset-0   rounded-md z-[-1]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className={activeTab === tab ? "text-white" : "text-gray-800"}>
            {tab}
          </span>
        </li>
      ))}
    </ul>
  );
};
