"use client";

import { useSelectedItem } from "@/context/SelectedComponentContext"; // Import the context
import { useSidebar } from "@/components/ui/sidebar";
import Tutors from "@/components/Tutors";
import Notifications from "@/components/Notifications";
import Rooms from "@/components/Rooms";



export default function Home() {
  const { selectedItem } = useSelectedItem(); // Get the selected item from context
  const { open, state, isMobile } = useSidebar();
  const renderComponent = () => {
    switch (selectedItem) {
      case "Tutors":
        return <Tutors />;
      case "Notifications":
        return <Notifications />;
      case "Rooms":
        return <Rooms />;

      default:
        return <Tutors />; // Default to Profile if no selection
    }
  };

  return (
    <main
      className={`
    h-max overflow-hidden flex justify-center min-h-screen
    ${
      open ? "w-[calc(100vw-22rem)]" : "w-[100vw]"
    } // Adjust width based on sidebar open state
  `}
    >
      {renderComponent()}
    </main>
  );
}
