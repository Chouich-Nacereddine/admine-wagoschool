/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Switch } from "@/components/ui/switch";

const TutorsList = () => {
  const [tutors, setTutors] = useState<any[]>([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data, error } = await supabase
          .from("tutors")
          .select("id, full_name, is_available, is_approved"); // Include 'id' for updates

        if (error) throw error;

        setTutors(data);
      } catch (err:any) {
        console.error("Error fetching tutors:", err.message);
      } finally {
      }
    };

    fetchTutors();
  }, []);

  const toggleAvailability = async (tutorId:any, currentAvailability:any) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from("tutors")
        .update({ is_available: !currentAvailability })
        .eq("id", tutorId);

      if (error) throw error;

      // Optimistically update local state
      setTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === tutorId
            ? { ...tutor, is_available: !currentAvailability }
            : tutor
        )
      );
    } catch (err:any) {
      console.error("Error updating availability:", err.message);
    }
  };
  const toggleApprove = async (tutorId:any, currentApprovalStatus:any) => {
    try {
      // Update `is_approved` status in Supabase
      const { error } = await supabase
        .from("tutors")
        .update({ is_approved: !currentApprovalStatus })
        .eq("id", tutorId);

      if (error) throw error;

      // Update state optimistically
      setTutors((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.id === tutorId
            ? { ...tutor, is_approved: !currentApprovalStatus }
            : tutor
        )
      );
    } catch (err:any) {
      console.error("Error updating approval status:", err.message);
    }
  };

  return (
    <div className="w-[100vw] sm:w-full flex flex-col items-center gap-10 justify-center px-5 sm:px-0 overflow-hidden">
      <h1 className="text-4xl font-bold">Tutor&apos;s details</h1>
      <ul className="sm:w-max flex flex-col gap-3">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="sm:w-[50vw]">
            <li className="flex justify-between bg-white gap-2 p-4 rounded-2xl">
              <p className="text-sm sm:text-xl">
                Name: <span className="text-blue-500">{tutor.full_name}</span>
              </p>
              <p className="text-sm sm:text-xl flex gap-1 sm:gap-2 items-center">
                Available:
                <Switch
                  checked={tutor.is_available}
                  onCheckedChange={() =>
                    toggleAvailability(tutor.id, tutor.is_available)
                  }
                />
              </p>
              <p className="text-sm sm:text-xl flex gap-1 sm:gap-2 items-center">
                Approved:
                <Switch
                  checked={tutor.is_approved}
                  onCheckedChange={() =>
                    toggleApprove(tutor.id, tutor.is_approved)
                  }
                />
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TutorsList;
