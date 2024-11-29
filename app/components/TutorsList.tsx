"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TutorsList = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data, error } = await supabase
          .from('tutors')
          .select('full_name, field_of_study, subject, is_available');

        if (error) throw error;

        setTutors(data);
      } catch (err) {
        console.error('Error fetching tutors:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='w-full'>
      <h1>Tutors details</h1>
      <ul>
        {tutors.map((tutor, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {tutor.full_name}</p>
            <p><strong>Field of Study:</strong> {tutor.field_of_study}</p>
            <p><strong>Subject:</strong> {tutor.subject}</p>
            <p><strong>Available:</strong> {tutor.is_available ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorsList;
