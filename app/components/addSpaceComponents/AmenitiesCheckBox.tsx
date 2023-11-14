import React from 'react';
import { Text, Strong, Checkbox, Heading } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';

interface AmenitiesCheckboxesProps {
  selectedAmenities: string[];
  handleAmenityChange: (amenity: string) => void;
}

const AmenitiesCheckboxes: React.FC<AmenitiesCheckboxesProps> = ({
  selectedAmenities,
  handleAmenityChange,
}) => {
  const amenitiesList = [
    'open till late',
    'wifi',
    'charging outlets',
    'meeting rooms',
    'shower',
    'phone booth',
    'lockers',
    'pet-friendly',
  ];

  return (
    <>
      <Heading as='h2' className='py-3'>
        Tell us more about the workplace
      </Heading>
      <Text as='div'>
        <Strong>Amenities</Strong>
      </Text>
      {amenitiesList.map((amenity) => (
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
    </>
  );
};

export default AmenitiesCheckboxes;
