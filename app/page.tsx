/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AuthenticatedComponent from "@/app/components/AuthenticatedComponent";
import { useSelectedItem } from "@/context/SelectedComponentContext"; // Import the context
import { useSidebar } from "@/components/ui/sidebar";
import Tutors from "@/components/Tutors";
import Notifications from "@/components/Notifications";
import Rooms from "@/components/Rooms";
import Classes from "@/components/Classes";

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
      case "Classes":
        return <Classes />;

      default:
        return <Tutors />; // Default to Profile if no selection
    }
  };

  return (
    <main
      className={`flex h-max min-h-screen justify-center overflow-hidden ${
        open ? "sm:w-[calc(100vw-22rem)]" : "sm:w-[100vw] w-svw"
      } // Adjust width based on sidebar open state`}
    >
      <AuthenticatedComponent renderComponent={renderComponent} />
    </main>
  );
}
