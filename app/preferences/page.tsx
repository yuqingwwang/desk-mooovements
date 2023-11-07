'use client';

import {
  Heading,
  Button,
  RadioGroup,
  Flex,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

const amenityOptions = [
  { value: "room", label: "Meeting Rooms" },
  { value: "access", label: "24/7 access" },
  { value: "yoga", label: "Yoga" },
  { value: "pet-friendly", label: "Pet Friendly" },
  { value: "shower", label: "Shower" },
];

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} /> {label}
    </label>
  );
};

const AddPreference = () => {
  const { control, handleSubmit } = useForm<{
    preference: string;
    amenities: string[];
  }>();

  const onSubmit: SubmitHandler<{ preference: string; amenities: string[] }> =
    (data) => console.log(data, selectedAmenities);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  const handleSelectAllAmenities = () => {
    const allAmenities = ["room", "access", "yoga", "pet-friendly", "shower"];

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
    <div className="max-w-xl">
      <Heading as="h1" className="py-3">
        Preference
      </Heading>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h2" className="py-3">
          I prefer to
        </Heading>

        <Controller
          name="preference"
          control={control}
          render={({ field }) => (
            <RadioGroup.Root
              value={field.value}
              onValueChange={field.onChange}
            >
              <Flex gap="2" direction="column">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="solo" /> Solo
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="social" /> Social
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="dont-mind"/> Do not Mind
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          )}
        />

        <Heading as="h2" className="py-3">
          I am looking for
        </Heading>

        <Flex direction="column" gap="3">
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
          <Button type="button" variant="ghost" color="indigo" onClick={handleSelectAllAmenities}>
            {selectAll ? "Select All Amenities" : "Unselect All Amenities"}
          </Button>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default AddPreference;
