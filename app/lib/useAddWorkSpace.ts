import { useState } from 'react';
import { useRouter } from 'next/navigation';
import newClient from '@/app/config/supabaseclient';
import { citiesWithId } from '@/app/utils/constants';
import { CreateAddWorkplaceForm } from '@/app/components/addSpaceComponents/validationForm';

export function useAmenityHandling() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return { selectedAmenities, handleAmenityChange };
}

export function useCityHandling() {
  const [selectedCity, setSelectedCity] = useState<string>('');

  return { selectedCity, setSelectedCity };
}

export function useSubmitHandling(
  user: any | null,
  selectedAmenities: string[],
  selectedCity: string
) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const getCityId = (cityName: string) => {
    return citiesWithId.find((city) => city.name === selectedCity)?.id;
  };

  const onSubmit = async (formData: CreateAddWorkplaceForm) => {
    if (!user) {
      setError('You need to log in');
      return;
    }

    try {
      setSubmitting(true);
      const supabase = newClient();
      const { data, error } = await supabase
        .from('work_spaces')
        .insert([
          {
            name: formData.name,
            created_by: user,
            address: formData.address,
            image: formData.image,
            city: getCityId(selectedCity),
            pet_friendly: selectedAmenities.includes('pet-friendly'),
            opens_till_late: selectedAmenities.includes('open till late'),
            has_wifi: selectedAmenities.includes('wifi'),
            has_socket: selectedAmenities.includes('charging outlets'),
            has_shower: selectedAmenities.includes('shower'),
            has_meeting_room: selectedAmenities.includes('meeting rooms'),
            has_phone_booth: selectedAmenities.includes('phone booth'),
            has_locker: selectedAmenities.includes('lockers'),
          },
        ])
        .select();
      router.push('/');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  };

  return { error, isSubmitting, onSubmit };
}
