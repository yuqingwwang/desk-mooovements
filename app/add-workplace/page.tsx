'use client';

import {
  TextField,
  Heading,
  Button,
  RadioGroup,
  Flex,
  Text,
  Strong,
  Slider,
  TextArea,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Spinner from "../components/Spiner";
import { useRouter } from "next/navigation";
import { CreateAddWorkplaceForm } from "../validationForm";
import { useForm, SubmitHandler, Controller } from "react-hook-form";


const AddWorkplace = () => {
  const { register, control, handleSubmit } = useForm<CreateAddWorkplaceForm>();
  const onSubmit: SubmitHandler<CreateAddWorkplaceForm> = (data) =>
    console.log(data);

  const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
      <Heading as='h1' className='py-3'>
        Add a place
      </Heading>


      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Name" {...register("name")} />
        </TextField.Root>

        <TextField.Root>
          <TextField.Input placeholder="City" {...register("city")} />

        </TextField.Root>

        <Heading as='h2' className='py-3'>
          Tell us more about the workplace
        </Heading>

        <Text as="div">
          <Strong>Amenities</Strong> (select all)
        </Text>

        <Controller
          name="amenities"
          control={control}
          render={({ field }) => (
            <RadioGroup.Root value={field.value} onValueChange={field.onChange}>
              <Flex gap="2" direction="column">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="quite" /> Quite
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="access" /> 24/7 access
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="social" /> Social Space
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="yoga" /> Yoga
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="pet" /> Pet Friendly
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value="shower" /> Shower
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          )}
        />
        <Controller
          name="workplaceRating"
          control={control}
          render={({ field }) => (
            <Flex direction="column" gap="4" style={{ maxWidth: 300 }}>
              <label>Workplace Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[2]}
                min={1}
                max={5}
                color="crimson"
              />
            </Flex>
          )}
        />
        <Controller
          name="foodRating"
          control={control}
          render={({ field }) => (
            <Flex direction="column" gap="4" style={{ maxWidth: 300 }}>
              <label>Food Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[3]}
                min={1}
                max={5}
                color="crimson"
              />
            </Flex>
          )}
        />

        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChange={field.onChange}
              placeholder="Your comment here"
            />
          )}
        />
        <Button>Create {<Spinner />}</Button>
      </form>
    </div>
  );
};

export default AddWorkplace;
