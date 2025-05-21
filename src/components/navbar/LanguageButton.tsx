/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const options = [
  {
    label: "English",
    code: "us",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    label: "Bangla",
    code: "bd",
    flag: "https://flagcdn.com/w40/bd.png",
  },
  {
    label: "German",
    code: "de",
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    label: "Arabic",
    code: "sa",
    flag: "https://flagcdn.com/w40/sa.png",
  },
];

export default function LanguageButton() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = options[selectedIndex];

  const handleSelect = (key: React.Key) => {
    const index = options.findIndex((opt) => opt.code === key);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

  return (
    <ButtonGroup variant="flat" className="bg-white border-1 border-gray-300 rounded-4xl px-3">
      

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          
          <Button
            className="bg-white text-black flex " 
            isIconOnly
            aria-label="Select language"
            onClick={() => console.log(`You selected: ${selectedOption.label}`)}
          >
            <img
              src={selectedOption.flag}
              alt={selectedOption.code}
              className="w-[20px] h-[15px] "
            />
            {selectedOption.label}
          </Button>
        </DropdownTrigger>


        <DropdownMenu
          aria-label="Language options"
          onAction={handleSelect}
          className="min-w-100px]   rounded-md bg-white text-black"
        >
          {options.map((option) => (
            <DropdownItem key={option.code}>
              <div className="flex items-center px-2 py-2 hover:bg-pink-100 rounded-md">
                <img
                  src={option.flag}
                  alt={option.code}
                  className="w-[20px] h-[15px] mr-2"
                />
                {option.label}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
