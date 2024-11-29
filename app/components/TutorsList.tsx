"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Switch } from "@/components/ui/switch";

const TutorsList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data, error } = await supabase
          .from("tutors")
          .select("id, full_name, is_available"); // Include 'id' for updates

        if (error) throw error;

        setTutors(data);
      } catch (err) {
        console.error("Error fetching tutors:", err.message);
      } finally {
      }
    };

    fetchTutors();
  }, []);

  const toggleAvailability = async (tutorId, currentAvailability) => {
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
          tutor.id === tutorId ? { ...tutor, is_available: !currentAvailability } : tutor
        )
      );
    } catch (err) {
      console.error("Error updating availability:", err.message);
    }
  };


  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center">
      <h1 className="text-4xl font-bold">Tutor&apos;s details</h1>
      <ul className="w-max flex flex-col gap-3">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="w-[50vw]">
            <li className="flex justify-between bg-white gap-2 p-4 rounded-2xl">
              <p className="text-xl">
                Name: <span className="text-blue-500">{tutor.full_name}</span>
              </p>
              <p className="text-xl flex gap-2 items-center">
                Available:
                <Switch
                  checked={tutor.is_available}
                  onCheckedChange={() => toggleAvailability(tutor.id, tutor.is_available)}
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
