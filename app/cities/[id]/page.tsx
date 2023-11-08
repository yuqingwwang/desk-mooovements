import { SupabaseCall } from "@/utils/supabaseCall";
import Link from "next/link";

type City = {
  id: number;
  name: string;
  country: string;
};

export default async function cities({ params }: any) {
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
          <Link href={'/'}>
      <div className="m-3">
            <button
              className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto">Home</span>
            </button>
          </div>
      </Link>
        </>
      ) : (
        <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
      )}
    </div>
  );
}
