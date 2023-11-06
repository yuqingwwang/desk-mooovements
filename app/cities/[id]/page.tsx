import { SupabaseCall } from "@/utils/supabaseCall";

type City = {
  id: number;
  name: string;
  country: string;
};

export default async function cities({ params }) {
  let city: City[] | null = null;
  const id = params.id;
  city = await SupabaseCall("cities", "id,name,country", "id", id);
  console.log(city);
  return (
    <div>
      {city && city.length > 0 ? (
        <>
          {/* Uncomment when you handle the image rendering issue.
         <Image
           src={city[0].image}
           alt="image of the workspace"
           width={200}
           height={200}
           priority
         />
         */}
          <p>Name: {city[0].name}</p>
          <p>Country: {city[0].country}</p>
        </>
      ) : (
        <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
      )}
    </div>
  );
}
