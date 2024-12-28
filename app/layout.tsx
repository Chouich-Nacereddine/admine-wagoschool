"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SelectedItemProvider } from "@/context/SelectedComponentContext";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Step 1: Import QueryClient
import {
  BellRing,
  MonitorPlay,
  SlidersHorizontal,
  UserRoundCog,
} from "lucide-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    { title: "Tutors", icon: UserRoundCog },
    { title: "Notifications", icon: BellRing },
    { title: "Rooms", icon: MonitorPlay },
    { title: "Classes", icon: SlidersHorizontal },
  ];

  // Step 2: Initialize the QueryClient
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className="w-screen h-auto">
        <QueryClientProvider client={queryClient}>
          {" "}
          {/* Wrap children with QueryClientProvider */}
          <SelectedItemProvider>
            <SidebarProvider>
              <AppSidebar items={items} />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </SelectedItemProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
