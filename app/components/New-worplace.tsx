'use client';
import {
  TextField,
  Heading,
  Button,
  Text,
  Strong,
  Callout,
  Checkbox,
  Select,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import Spinner from './Spiner';
import { useRouter } from 'next/navigation';
import { CreateAddWorkplaceForm } from '../validationForm';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import * as Label from '@radix-ui/react-label';
import Link from 'next/link';
import newClient from '../config/supabaseclient';
import { SupabaseCall } from '../utils/supabaseCall';
import NavBar from './NavBar';
import getCityIds from '../utils/fetchCityId';
import { CityWithId } from '@/app/utils/types';

export default function AddWorkplace({ user }: { user: string | null }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAddWorkplaceForm>();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [cities, setCities] = useState<{ name: string; id: number }[]>([]);
  const [selectedCity, setSelectedCity] = useState(0);

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSelectedCityChange = (city: any) => {
    console.log('selected city is', city);
    setSelectedCity(city.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const citiesResult =
        (await SupabaseCall('cities', 'name,id', '', '')) || [];
      citiesResult.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      setCities(citiesResult ?? []);
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<CreateAddWorkplaceForm> = async (formData) => {
    if (!user) {
      // Display an error message if the user is null
      setError('You need to log in');
      return;
    }
    console.log(formData);
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
            city: selectedCity,
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

  return (
    <div className='max-w-xl'>
      <Heading as='h1' className='py-3'>
        Add a place
      </Heading>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <Select.Root>
          <Select.Trigger />
          <Select.Content>
            {cities.map((city: any) => (
              <div key={city.id} className='p-1'>
                <Select.Item
                  onClick={() => handleSelectedCityChange(city)}
                  value={city.id}
                >
                  {city.name}
                </Select.Item>
              </div>
            ))}
          </Select.Content>
        </Select.Root>

        <TextField.Root>
          <TextField.Input
            placeholder='Name'
            {...register('name', { required: 'name is required' })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder='Address'
            {...register('address', { required: 'Address is required' })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.address?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder='Image'
            {...register('image', { required: 'Image is required' })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.image?.message}</ErrorMessage>

        <Heading as='h2' className='py-3'>
          Tell us more about the workplace
        </Heading>
        <Text as='div'>
          <Strong>Amenities</Strong>
        </Text>
        {[
          'open till late',
          'wifi',
          'charging outlets',
          'meeting rooms',
          'shower',
          'phone booth',
          'lockers',
          'pet-friendly',
        ].map((amenity) => (
          <div key={amenity} className='p-1'>
            <Label.Root>
              <Checkbox
                className='p-3'
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityChange(amenity)}
              />
              {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
            </Label.Root>
          </div>
        ))}
        <ErrorMessage>{errors.amenities?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Create {isSubmitting && <Spinner />}
        </Button>
      </form>
      <NavBar user={user && user.id} />
    </div>
  );
}
