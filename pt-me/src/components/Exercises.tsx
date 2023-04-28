'use client';
import React, { useEffect, useState } from 'react';
import { CLIENT, BASE_URL } from '@/components/api';

export default function Exercises() {
  const [exercises, setExercises] = useState<any>({});

  useEffect(() => {
    async function getExercises() {
      const { data } = await CLIENT.get(`${BASE_URL}/api/exercises`);
      setExercises(data);
    }
    getExercises();
  }, []);

  console.log(exercises);

  return <div>Exercises</div>;
}
