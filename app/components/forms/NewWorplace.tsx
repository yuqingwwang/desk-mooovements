'use client';

import {
  useAmenityHandling,
  useCityHandling,
  useSubmitHandling,
} from '@/app/lib/useAddWorkSpace';
import { CreateAddWorkplaceForm } from '@/app/utils/types';
import { Button, Callout, Heading } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import NavBar from '../NavBar';
import Spinner from '../Spiner';
import CustomTextField from '../texts/CustomTextField';
import AmenitiesCheckboxes from './AmenitiesCheckBox';
import SelectCity from './SelectCity';

export default function AddWorkplace({ user }: { user: any | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAddWorkplaceForm>();

  const { selectedAmenities, handleAmenityChange } = useAmenityHandling();
  const { selectedCity, setSelectedCity } = useCityHandling();
  const { error, isSubmitting, onSubmit } = useSubmitHandling(
    user,
    selectedAmenities,
    selectedCity
  );

  return (
    <div className='max-w-xl'>
      <Heading as='h1' className='py-3'>
        Add a work place
      </Heading>

      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <SelectCity value={selectedCity} onChange={setSelectedCity} />

        <CustomTextField
          placeholder='Name'
          name='name'
          register={register}
          errorMessage={errors.name?.message}
        />

        <CustomTextField
          placeholder='Address'
          name='address'
          register={register}
          errorMessage={errors.address?.message}
        />

        <CustomTextField
          placeholder='Image'
          name='image'
          register={register}
          errorMessage={errors.image?.message}
        />

        <AmenitiesCheckboxes
          selectedAmenities={selectedAmenities}
          handleAmenityChange={handleAmenityChange}
        />

        <Button disabled={isSubmitting}>
          Create {isSubmitting && <Spinner />}
        </Button>
      </form>

      <NavBar user={user && user.id} />
    </div>
  );
}
