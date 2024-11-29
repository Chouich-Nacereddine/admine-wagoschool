"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelectedItem } from "../context/SelectedComponentContext";
import { useState } from "react";

export function AppSidebar({ items }) {
  const [isClicked, setIsClicked] = useState(0);
  const { setSelectedItem } = useSelectedItem();
  return (
    <Sidebar className="text-[#0C0A03] border-r-8 border-black">
      <SidebarContent className="self-center ">
        <SidebarMenu className="mt-16 flex flex-col gap-10 ">
          {items.map((item, index) => (
            <SidebarMenuItem
              className=""
              key={index}
              onClick={() => {
                setIsClicked(index);
                setSelectedItem(item.title);
              }}
            >
              <div
                className={`${
                  isClicked === index ? "border-b-2  border-black" : ""
                }  w-max flex gap-3 items-center justify-start text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-MerriweatherSans cursor-pointer`}
              >
                <item.icon size={25} className="" />
                <span className="">{item.title}</span>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
