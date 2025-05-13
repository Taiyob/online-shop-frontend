"use client";

import { Input, Link } from "@nextui-org/react";
// import { Input } from "antd";
import React, { useState } from "react";
// import { IoSearch } from "react-icons/io5";
import { SlidingMenu } from "./navbar/SlidingMenu";

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
            <span className="text-3xl text-orange-500 font-bold whitespace-nowrap cursor-pointer">
              <i>Sugary</i>
            </span>
          </Link>
        </div>

        {/* Center: Main Menu (desktop only) */}
        {/* <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center text-black gap-8 text-base font-medium">
            <li>
              <Link href="/" className="hover:text-orange-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-600">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-orange-600">
                Offer
              </Link>
            </li>
          </ul>
        </div> */}
        <SlidingMenu></SlidingMenu>
        {/* <LanguageButton></LanguageButton> */}

        {/* Right: Search bar */}
        <div>
          <Input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            // prefix={<IoSearch />}
            style={{ height: "2.5rem", width: "200px" }}
          />
          

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
