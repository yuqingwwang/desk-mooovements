'use client';

import {
  TextField,
  Heading,
  Button,
  Text,
  Strong,
  Callout,
  Checkbox,
  DropdownMenu,
} from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spiner';
import { useRouter } from 'next/navigation';
import { CreateAddWorkplaceForm } from '../validationForm';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import * as Label from '@radix-ui/react-label';
import Link from 'next/link';
import newClient from '../config/supabaseclient';
import { SupabaseCall } from '../utils/supabaseCall';

const AddWorkplace = () => {
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
  const [cities, setCities] = useState<{ name: string }[]>([]);

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const citiesResult = await SupabaseCall('cities', 'name', '', '');
      setCities(citiesResult ?? []);
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<CreateAddWorkplaceForm> = async (data) => {
    const supabase = newClient();
    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('work_spaces')
        .insert({
          id: 583,
          name: data.name,
          created_by: '04811e1f-463f-46cd-b791-75355da3fcad',
          address: data.address,
          image: data.image,
          pet_friendly: selectedAmenities.includes('pet-friendly'),
          opens_till_late: selectedAmenities.includes('open till late'),
          has_wifi: selectedAmenities.includes('wifi'),
          has_socket: selectedAmenities.includes('charging outlets'),
          has_shower: selectedAmenities.includes('shower'),
          has_meeting_room: selectedAmenities.includes('meeting rooms'),
          has_phone_booth: selectedAmenities.includes('phone booth'),
          has_locker: selectedAmenities.includes('lockers'),
        })
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
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant='soft' color='indigo'>
              Cities
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant='soft' color='indigo'>
            {cities.map((city) => (
              <DropdownMenu.Item key={city.name}>{city.name}</DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <TextField.Root>
          <TextField.Input
            placeholder='Name'
            {...register('name', { required: 'Name is required' })}
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
      <Link href={'/'}>
        <div className='m-3'>
          <button className='inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white'>
            <span className='mx-auto'>Home</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default AddWorkplace;
