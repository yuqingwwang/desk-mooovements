"use client"

import { useState, useEffect } from "react"
import supabase from "./config/supabaseclient"

type City = {
  id: number,
  name: string,
  country: string
}

export default function Home() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[] | null>(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("cities").select();
      if (error) {
        setFetchError("Could not fetch the cities");
        setCities(null);
        console.log(error);
      }
      if (data) {
        setCities(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  console.log(cities);

  return (
    <main className="bg-black">
      <h1>Welcome to desk-mooovements!</h1>
      {fetchError && <p>{fetchError}</p>}
      {cities?.map(city => (
        <p key={city.name}>{city.name}</p>
        )
      )}
    </main>
  )
}