'use client';

import {
  TextField,
  Heading,
  Button,
  Flex,
  Text,
  Strong,
  Slider,
  TextArea,
  Callout,
  Checkbox,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import Spinner from '../components/Spiner';
import { useRouter } from 'next/navigation';
import { CreateAddWorkplaceForm } from '../validationForm';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import * as Label from '@radix-ui/react-label';

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

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  const validateAmenities = () => {
    if (selectedAmenities.length === 0) {
      return 'Please select at least one amenity';
    }
    return true;
  };

  const onSubmit: SubmitHandler<CreateAddWorkplaceForm> = async (data) => {
    const amenitiesValidation = validateAmenities();

    if (amenitiesValidation !== true) {
      setError(amenitiesValidation);
      return;
    }

    try {
      setSubmitting(true);

      // Combine all the form data, including selected amenities
      const formData = {
        ...data,
        amenities: selectedAmenities,
      };

      console.log(formData);

      // Send the data to the database
      // await ...
      // Redirect to a new page
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
        <TextField.Root>
          <TextField.Input
            placeholder='Name'
            {...register('name', { required: 'Name is required' })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <TextField.Root>
          <TextField.Input
            placeholder='City'
            {...register('city', { required: 'City is required' })}
          />
        </TextField.Root>
        <ErrorMessage>{errors.city?.message}</ErrorMessage>

        <Heading as='h2' className='py-3'>
          Tell us more about the workplace
        </Heading>
        <Text as='div'>
          <Strong>Amenities</Strong> (select at least one)
        </Text>
        {[
          'quite',
          'shower',
          'pet-friendly',
          '24/7 access',
          'yoga',
          'social space',
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

        <Controller
          name='workplaceRating'
          control={control}
          render={({ field }) => (
            <Flex direction='column' gap='4' style={{ maxWidth: 300 }}>
              <label>Workplace Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[4]}
                min={1}
                max={5}
                color='crimson'
              />
            </Flex>
          )}
        />
        <Controller
          name='foodRating'
          control={control}
          render={({ field }) => (
            <Flex direction='column' gap='4' style={{ maxWidth: 300 }}>
              <label>Food Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[3]}
                min={1}
                max={5}
                color='crimson'
              />
            </Flex>
          )}
        />

        <Controller
          name='comments'
          control={control}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChange={field.onChange}
              placeholder='Your comment here'
            />
          )}
        />
        <Button disabled={isSubmitting}>
          Create {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default AddWorkplace;
