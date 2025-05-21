"use client";

import { Button, Link } from "@nextui-org/react";
// import { Input } from "antd";
import React, { useState } from "react";
import { SlidingMenu } from "../navbar/SlidingMenu";
import LanguageButton from "../navbar/LanguageButton";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingBag, FaUser } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // You can call a search function or filter items here
  };

  return (
    <nav className="w-full bg-white border-gray-200">
      <div className="w-11/12 mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl text-[#E91E63] font-bold whitespace-nowrap cursor-pointer">
              <i>FoodQueen</i>
            </span>
          </Link>
        </div>

        {/* Center: Main Menu (desktop only) */}

        <SlidingMenu></SlidingMenu>

        {/* Right: Search bar */}
        <div className="flex items-center gap-2">
          <div className="relative w-[200px]">
            <span className="absolute inset-y-0 left- w-6xl flex items-center pl-3 text-gray-500">
              <IoIosSearch />
            </span>
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className="pl-8 pr-3 h-10 w-full bg-gray-200 text-gray-700 rounded-4xl focus:outline-none"
            />
          </div>
          <LanguageButton></LanguageButton>
          <Button className="flex text-white bg-black rounded-4xl">
            <FaShoppingBag />
            $0.00
          </Button>
          <Button className="flex text-white bg-[#E91E63] rounded-4xl">
            <FaUser />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
