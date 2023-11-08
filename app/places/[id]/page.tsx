import SeeMore from '@/app/components/SeeMore';
import { SupabaseCall } from '@/utils/supabaseCall';

type Place = {
  id: number;
  created_at: string;
  created_by: number;
  name: string;
  address: string;
  image: string;
  city: number;
  pet_friendly: boolean;
  opens_till_late: boolean;
  has_wifi: boolean;
  has_socket: boolean;
  has_shower: boolean;
  has_meeting_room: boolean;
  has_phone_booth: boolean;
  has_locker: boolean;
};

export default async function WorkSpaces({ params }: any) {
     let place: Place[] | null = null;
     const id = params.id
  place = await SupabaseCall("work_spaces","id,name,address,image,cities ( name ),pet_friendly,opens_till_late,has_wifi,has_socket,has_shower,has_meeting_room,has_phone_booth,has_locker","id",id )
console.log(place)
return (
   <div>
     {place && place.length > 0 ? (
       <>
         {/* Uncomment when we have images
         <Image
           src={place[0].image}
           alt="image of the workspace"
           width={200}
           height={200}
           priority
         />
         */}
         <p>Name: {place[0].name}</p>
         <p>Address: {place[0].address}</p>
         {/* <p>City: {place[0].cities.name}</p> */}
         <SeeMore place = {place}/>
       </>
     ) : (
       <p>Loading or no data available...</p> // Display a loading indicator or a no-data message
     )}
   </div>
);
   
 

}
