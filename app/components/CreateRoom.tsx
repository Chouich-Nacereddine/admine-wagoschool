import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const CreateRoom = () => {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null); // Store tutor ID
  const [selectedStudent, setSelectedStudent] = useState(null); // Store student ID
  const [openTutor, setOpenTutor] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [roomName, setRoomName] = useState("");

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tutorData, error: tutorError } = await supabase
          .from("tutors")
          .select("id, full_name");
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .select("id, full_name");

        if (tutorError) throw tutorError;
        if (studentError) throw studentError;

        setTutors([
          { id: "All Tutors", full_name: "All Tutors" },
          { id: null, full_name: "No Tutors" },
          ...tutorData,
        ]);
        setStudents([
          { id: "All Students", full_name: "All Students" },
          { id: null, full_name: "No Students" },
          ...studentData,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const sendNotification = async (notification) => {
    try {
      // Create a new notification object
      const newNotification = {
        id: Date.now(), // Unique ID for the notification
        message: notification,
        timestamp: new Date().toISOString(),
      };

      // Handle tutors
      if (selectedTutor === "All Tutors") {
        const { data: allTutors, error: fetchTutorsError } = await supabase
          .from("tutors")
          .select("id, notifications");

        if (fetchTutorsError) throw fetchTutorsError;

        for (const tutor of allTutors) {
          const updatedNotifications = Array.isArray(tutor.notifications)
            ? [...tutor.notifications, newNotification]
            : [newNotification];

          const { error: updateTutorError } = await supabase
            .from("tutors")
            .update({ notifications: updatedNotifications })
            .eq("id", tutor.id);

          if (updateTutorError) throw updateTutorError;
        }
      } else if (selectedTutor && selectedTutor !== "No Tutors") {
        // Fetch existing notifications for the selected tutor
        const { data: tutorData, error: tutorError } = await supabase
          .from("tutors")
          .select("notifications")
          .eq("id", selectedTutor)
          .single();

        if (tutorError) throw tutorError;

        const updatedTutorNotifications = Array.isArray(tutorData.notifications)
          ? [...tutorData.notifications, newNotification]
          : [newNotification];

        const { error: updateTutorError } = await supabase
          .from("tutors")
          .update({ notifications: updatedTutorNotifications })
          .eq("id", selectedTutor);

        if (updateTutorError) throw updateTutorError;
      }

      // Handle students
      if (selectedStudent === "All Students") {
        const { data: allStudents, error: fetchStudentsError } = await supabase
          .from("students")
          .select("id, notifications");

        if (fetchStudentsError) throw fetchStudentsError;

        for (const student of allStudents) {
          const updatedNotifications = Array.isArray(student.notifications)
            ? [...student.notifications, newNotification]
            : [newNotification];

          const { error: updateStudentError } = await supabase
            .from("students")
            .update({ notifications: updatedNotifications })
            .eq("id", student.id);

          if (updateStudentError) throw updateStudentError;
        }
      } else if (selectedStudent && selectedStudent !== "No Students") {
        // Fetch existing notifications for the selected student
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .select("notifications")
          .eq("id", selectedStudent)
          .single();

        if (studentError) throw studentError;

        const updatedStudentNotifications = Array.isArray(
          studentData.notifications
        )
          ? [...studentData.notifications, newNotification]
          : [newNotification];

        const { error: updateStudentError } = await supabase
          .from("students")
          .update({ notifications: updatedStudentNotifications })
          .eq("id", selectedStudent);

        if (updateStudentError) throw updateStudentError;
      }
    } catch (err) {
      console.error("Error sending notification:", err.message);
    }
  };

  const createRoomAndSendNotification = async () => {
    try {
      // Call the API to create a room
      const response = await fetch("/api/CreateRoom", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const roomData = await response.json();
      const roomName = roomData.name;
      console.log(roomData);
      // Construct the notification message
      const notificationMessage = `Use this new room ID to join your class: ${roomName}`;

      // Send the notification
      await sendNotification(notificationMessage);
      console.log("Room created and notification sent successfully:", roomName);
      alert(`Room "${roomName}" created and notifications sent successfully!`);
    } catch (error) {
      console.error("Error creating room or sending notification:", error);
      alert("Error creating room or sending notification");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-[50vw] flex items-center justify-center gap-5">
        {/* Tutors Dropdown */}
        <Popover open={openTutor} onOpenChange={setOpenTutor}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openTutor}
              className="w-[200px] justify-between"
            >
              {selectedTutor
                ? tutors.find((t) => t.id === selectedTutor)?.full_name
                : "Select Tutor..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search tutors..." />
              <CommandList>
                <CommandEmpty>No tutor found.</CommandEmpty>
                <CommandGroup>
                  {tutors.map((tutor) => (
                    <CommandItem
                      key={tutor.id}
                      onSelect={() => {
                        setSelectedTutor(tutor.id);
                        setOpenTutor(false);
                      }}
                    >
                      {tutor.full_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedTutor === tutor.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Students Dropdown */}
        <Popover open={openStudent} onOpenChange={setOpenStudent}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStudent}
              className="w-[200px] justify-between"
            >
              {selectedStudent
                ? students.find((s) => s.id === selectedStudent)?.full_name
                : "Select Student..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search students..." />
              <CommandList>
                <CommandEmpty>No student found.</CommandEmpty>
                <CommandGroup>
                  {students.map((student) => (
                    <CommandItem
                      key={student.id}
                      onSelect={() => {
                        setSelectedStudent(student.id);
                        setOpenStudent(false);
                      }}
                    >
                      {student.full_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedStudent === student.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        onClick={createRoomAndSendNotification}
        className="bg-[#FFE037] text-black hover:text-white active:scale-90"
      >
        Create Room
      </Button>
    </div>
  );
};

export default CreateRoom;
