/* eslint-disable @typescript-eslint/no-unused-vars */
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

const AddPreference = () => {

  const { control, handleSubmit } = useForm<{
    preference: string;
    amenities: string[];
  }>();
  const onSubmit: SubmitHandler<{ preference: string; amenities: string[] }> =
    (data) => console.log(data);


  return (
    <div className='max-w-xl'>
      <Heading as='h1' className='py-3'>
        Preference
      </Heading>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Heading as='h2' className='py-3'>
          I prefer to
        </Heading>

        <Controller
          name="preference"
          control={control}
          render={({ field }) => (
            <RadioGroup.Root value={field.value} onValueChange={field.onChange}>
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

        <Heading as='h2' className='py-3'>
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
              <label>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value.includes("room")}
                  onChange={(e) => {
                    const selectedValues = [...field.value];
                    if (e.target.checked) {
                      selectedValues.push("room");
                    } else {
                      const index = selectedValues.indexOf("room");
                      if (index > -1) {
                        selectedValues.splice(index, 1);
                      }
                    }
                    field.onChange(selectedValues);
                  }}
                />{" "}
                Meeting Rooms
              </label>

              <label>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value.includes("access")}
                  onChange={(e) => {
                    const selectedValues = [...field.value];
                    if (e.target.checked) {
                      selectedValues.push("access");
                    } else {
                      const index = selectedValues.indexOf("access");
                      if (index > -1) {
                        selectedValues.splice(index, 1);
                      }
                    }
                    field.onChange(selectedValues);
                  }}
                />{" "}
                24/7 access
              </label>

              <label>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value.includes("yoga")}
                  onChange={(e) => {
                    const selectedValues = [...field.value];
                    if (e.target.checked) {
                      selectedValues.push("yoga");
                    } else {
                      const index = selectedValues.indexOf("yoga");
                      if (index > -1) {
                        selectedValues.splice(index, 1);
                      }
                    }
                    field.onChange(selectedValues);
                  }}
                />{" "}
                Yoga
              </label>

              <label>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value.includes("pet-friendly")}
                  onChange={(e) => {
                    const selectedValues = [...field.value];
                    if (e.target.checked) {
                      selectedValues.push("pet-friendly");
                    } else {
                      const index = selectedValues.indexOf("pet-friendly");
                      if (index > -1) {
                        selectedValues.splice(index, 1);
                      }
                    }
                    field.onChange(selectedValues);
                  }}
                />{" "}
                Pet Friendly
              </label>

              <label>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value.includes("shower")}
                  onChange={(e) => {
                    const selectedValues = [...field.value];
                    if (e.target.checked) {
                      selectedValues.push("shower");
                    } else {
                      const index = selectedValues.indexOf("shower");
                      if (index > -1) {
                        selectedValues.splice(index, 1);
                      }
                    }
                    field.onChange(selectedValues);
                  }}
                />{" "}
                Shower
              </label>
            </Flex>
          )}
        />

        <Button>Save </Button>
      </form>
    </div>
  );
};

export default AddPreference;
