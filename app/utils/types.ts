import { Database } from '../lib/supabase';

export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export type City = Database['public']['Tables']['cities']['Row'] & {
  work_spaces: { count: number }[];
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
