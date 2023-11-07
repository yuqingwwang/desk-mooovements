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

  const handleSelectAllAmenities = () => {
    const allAmenities = ["room", "access", "yoga", "pet-friendly", "shower"];
    setSelectedAmenities(allAmenities);
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
              value={field.value||"dont-mind"}
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
                    <RadioGroup.Item value="dont-mind" /> Do not Mind
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
          <Checkbox
            checked={selectedAmenities.includes("room")}
            onChange={() => handleAmenityChange("room")}
            label="Meeting Rooms"
          />
          <Checkbox
            checked={selectedAmenities.includes("access")}
            onChange={() => handleAmenityChange("access")}
            label="24/7 access"
          />
          <Checkbox
            checked={selectedAmenities.includes("yoga")}
            onChange={() => handleAmenityChange("yoga")}
            label="Yoga"
          />
          <Checkbox
            checked={selectedAmenities.includes("pet-friendly")}
            onChange={() => handleAmenityChange("pet-friendly")}
            label="Pet Friendly"
          />
          <Checkbox
            checked={selectedAmenities.includes("shower")}
            onChange={() => handleAmenityChange("shower")}
            label="Shower"
          />
        </Flex>

        <div>
          <Button variant="ghost" color="indigo" onClick={handleSelectAllAmenities}>Select All</Button>
        </div>

        <Button>Save</Button>
      </form>
    </div>
  );
};

export default AddPreference;
