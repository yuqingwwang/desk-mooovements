'use client';

import {
  Heading,
  Button,
  RadioGroup,
  Flex,
  Text,
  Strong,
} from "@radix-ui/themes";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type CheckboxProps = {
  field: {
    value: string[];
    onChange: (values: string[]) => void;
  };
  value: string;
  label: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ field, value, label }) => {
  const isChecked = field.value.includes(value);

  const handleChange = () => {
    const selectedValues = isChecked
      ? field.value.filter((v) => v !== value)
      : [...field.value, value];
    field.onChange(selectedValues);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />{" "}
      {label}
    </label>
  );
};

const AddPreference = () => {
  const { control, handleSubmit } = useForm<{
    preference: string;
    amenities: string[];
  }>();
  const onSubmit: SubmitHandler<{ preference: string; amenities: string[] }> =
    (data) => console.log(data);

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

        <Text as="div">
          <Strong>Amenities</Strong> (select all)
        </Text>

        <Controller
          name="amenities"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Flex gap="2" direction="column">
              <Checkbox field={field} value="room" label="Meeting Rooms" />
              <Checkbox field={field} value="access" label="24/7 access" />
              <Checkbox field={field} value="yoga" label="Yoga" />
              <Checkbox
                field={field}
                value="pet-friendly"
                label="Pet Friendly"
              />
              <Checkbox field={field} value="shower" label="Shower" />
            </Flex>
          )}
        />

        <Button>Save</Button>
      </form>
    </div>
  );
};

export default AddPreference;
