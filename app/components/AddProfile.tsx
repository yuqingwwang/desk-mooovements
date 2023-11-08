'use client';

import {
  Heading,
  Button,
  RadioGroup,
  Flex,
  Text,
  Link,
} from '@radix-ui/themes';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { amenityOptions, allAmenities } from '../utils/constants';
import { CheckboxProps } from '../utils/types';

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label>
      <input type='checkbox' checked={checked} onChange={onChange} /> {label}
    </label>
  );
};

const AddProfile = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  const { control, handleSubmit } = useForm<{
    preference: string;
    amenities: string[];
  }>();

  // TODO: Save the data to the database
  const onSubmit: SubmitHandler<{ preference: string; amenities: string[] }> = (
    data
  ) => console.log(data, selectedAmenities);

  const handleSelectAllAmenities = () => {
    if (selectAll) {
      setSelectedAmenities(allAmenities);
    } else {
      setSelectedAmenities([]);
    }

    setSelectAll(!selectAll); // Toggle the selectAll state
  };

  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = [...selectedAmenities];

    if (selectedAmenities.includes(amenity)) {
      updatedAmenities.splice(updatedAmenities.indexOf(amenity), 1);
    } else {
      updatedAmenities.push(amenity);
    }

    setSelectedAmenities(updatedAmenities);
  };

  return (
    <div className='max-w-xl'>
      <Link href='/'>Go Home</Link>
      <form method='post' action='/auth/logout'>
        <Button type='submit'>Logout</Button>
      </form>
      <Heading as='h1' className='py-3'>
        Preference
      </Heading>

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <Heading as='h2' className='py-3'>
          I prefer to
        </Heading>

        <Controller
          name='preference'
          control={control}
          render={({ field }) => (
            <RadioGroup.Root value={field.value} onValueChange={field.onChange}>
              <Flex gap='2' direction='column'>
                <Text as='label' size='2'>
                  <Flex gap='2'>
                    <RadioGroup.Item value='solo' /> Solo
                  </Flex>
                </Text>
                <Text as='label' size='2'>
                  <Flex gap='2'>
                    <RadioGroup.Item value='social' /> Social
                  </Flex>
                </Text>
                <Text as='label' size='2'>
                  <Flex gap='2'>
                    <RadioGroup.Item value='dont-mind' /> Do not Mind
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          )}
        />

        <Heading as='h2' className='py-3'>
          I am looking for
        </Heading>

        <Flex direction='column' gap='3'>
          {amenityOptions.map((amenity) => (
            <Checkbox
              key={amenity.value}
              checked={selectedAmenities.includes(amenity.value)}
              onChange={() => handleAmenityChange(amenity.value)}
              label={amenity.label}
            />
          ))}
        </Flex>

        <div>
          <Button
            type='button'
            variant='ghost'
            color='indigo'
            onClick={handleSelectAllAmenities}
          >
            {selectAll ? 'Select All Amenities' : 'Unselect All Amenities'}
          </Button>
        </div>

        <Button type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default AddProfile;
