/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DATATable from "./Table";

const Filter = () => {
  const [Students, setStudents] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const plans = ["3 Mounths", "6 Mounths", "9 Mounths"];
  const subjects = [
    "web developement",
    "mobile developement",
    "2D & 3D animation",
    "digital marketing",
    "video editing",
    "ai & machine learning",
    "network",
    "data analytics",
    "devops & cloud",
    "english",
    "french",
    "german",
    "spanish",
    "chinese",
    "mathematics",
    "physics",
  ];
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [openTutor, setOpenTutor] = useState(false);
  const [openPlan, setOpenTPlan] = useState(false);
  const [openSubject, setOpenTSubject] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tutorData, error: tutorError } = await supabase
          .from("tutors")
          .select("id, full_name");

        if (tutorError) throw tutorError;

        setTutors([...tutorData]);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilterdStudents = async (
      Subject: any,
      TutorId: any,
      PlanPeriod: any
    ) => {
      try {
        console.log({
          selectedPlan: selectedPlan,
          selectedTutor: selectedTutor,
        });
        let query = supabase.from("students").select("*");

        if (Subject != null) {
          query = query.eq("current_plan_id", Subject);
        }

        if (TutorId !== null) {
          query = query.eq("tutor_id", TutorId);
        }

        if (PlanPeriod !== null) {
          query = query.eq("plan_periode", PlanPeriod);
        }

        // Execute the query
        const { data: StudentsData, error: StudentsError } = await query;

        if (StudentsError) throw StudentsError;
        setStudents([...StudentsData]);
      } catch (error:any) {
        console.error("Error fetching Student Data:", error.message);
      }
    };
    fetchFilterdStudents(selectedSubject, selectedTutor, selectedPlan);
  }, [selectedSubject, selectedTutor, selectedPlan]);

  console.log(selectedSubject);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="sm:w-[50vw] flex flex-wrap sm:flex-row items-center justify-center gap-5">
        {/* subject*/}
        <Popover open={openSubject} onOpenChange={setOpenTSubject}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSubject}
              className="w-[200px] justify-between"
            >
              {selectedSubject ? selectedSubject : "Select a Subject..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search tutors..." />
              <CommandList>
                <CommandEmpty>No plan found.</CommandEmpty>
                <CommandGroup>
                  {subjects.map((subject) => (
                    <CommandItem
                      key={subject}
                      onSelect={() => {
                        setSelectedSubject(subject); // Set the numeric value as a string
                        setOpenTSubject(false);
                      }}
                    >
                      {subject}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedPlan === subject ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Tutors */}
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

        {/* Plan Period*/}
        <Popover open={openPlan} onOpenChange={setOpenTPlan}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPlan}
              className="w-[200px] justify-between"
            >
              {selectedPlan
                ? `${selectedPlan} Months`
                : "Select a Plan Period..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search tutors..." />
              <CommandList>
                <CommandEmpty>No plan found.</CommandEmpty>
                <CommandGroup>
                  {plans.map((plan) => (
                    <CommandItem
                      key={plan}
                      onSelect={() => {
                        const numericValue = plan.split(" ")[0]; // Extract the number from the string
                        setSelectedPlan(numericValue); // Set the numeric value as a string
                        setOpenTPlan(false);
                      }}
                    >
                      {plan}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedPlan === plan.split(" ")[0]
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
      <span>
        <h2 className="text-2xl font-bold text-center mt-5 bg-[#FFE037] rounded-t-lg py-1 border border-black">
          Students Data
        </h2>
        <DATATable data={Students} />
      </span>
    </div>
  );
};

export default Filter;
