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
} from '@radix-ui/themes';
import React, { useState } from 'react';
import Spinner from '../components/Spiner';

const AddWorkplace = () => {
  return (
    <div className='max-w-xl'>
      <Heading as='h1' className='py-3'>
        Add a place
      </Heading>
      <form className='space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Name' />
        </TextField.Root>

        <TextField.Root>
          <TextField.Input placeholder='City' />
        </TextField.Root>

        <Heading as='h2' className='py-3'>
          Tell us more about the workplace
        </Heading>
        <Text as='div'>
          <Strong>Amenities</Strong> (select all)
        </Text>
        <RadioGroup.Root defaultValue='quite'>
          <Flex gap='2' direction='column'>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='quite' /> Quite
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='24/7' /> 24/7 access
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='social-space' /> Social Space
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='yoga' /> Yoga
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='pet-friendly' /> Pet Friendly
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value='shower' /> Shower
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>

        <Flex direction='column' gap='4' style={{ maxWidth: 300 }}>
          <label>Workplace Rating: {}</label>
          <Slider defaultValue={[4]} min={1} max={5} color='crimson' />
          <TextArea placeholder='Your comment here' />

          <label>Food Rating: {}</label>
          <Slider defaultValue={[3]} min={1} max={5} color='crimson' />
          <TextArea placeholder='Your comment here' />
        </Flex>
        <Button>Create {<Spinner />}</Button>
      </form>
    </div>
  );
};

export default AddWorkplace;
