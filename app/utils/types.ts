import { Database } from '../../database.types';

export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export type City = Database['public']['Tables']['cities']['Row'] & {
  work_spaces: { count: number }[];
};
export type CityPage = Database['public']['Tables']['cities']['Row'] & {
  work_spaces: Workspace[];
};
export type Workspace = Database['public']['Tables']['work_spaces']['Row'];
export type Reviews = Database['public']['Tables']['reviews']['Row'];
export type PopularCarousel = {
  cities?: City[];
  places?: Workspace[];
};

export type FormInputProps = {
  name: string;
  type: string;
  placeholder: string;
};

export type PageByIDParams = {
  params: {
    id: string;
  };
};

export type PlaceCardParams = {
  pageRoute: string | null;
  imageLink: string | null;
  placeName: string | null;
  flavourText: string | number | null;
};

export interface Amenities {
  id: number;
  pet_friendly: boolean | null;
  opens_till_late: boolean | null;
  has_wifi: boolean | null;
  has_socket: boolean | null;
  has_shower: boolean | null;
  has_meeting_room: boolean | null;
  has_phone_booth: boolean | null;
  has_locker: boolean | null;
}

export interface AddProfileProps {
  email: string;
  id: string;
}
