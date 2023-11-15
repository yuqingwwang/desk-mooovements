import { allAmenities, amenityOptions } from '@/app/utils/constants';
import { getColorByKey } from '@/app/utils/getColor';
import { Button, Grid } from '@radix-ui/themes';

export default function FilterButtons({ setSelectedFilter }: any) {
  return (
    <>
      <Grid
        columns={{
          initial: '3',
          md: '9',
        }}
        gap='3'
        width='auto'
      >
        <Button
          key='all'
          color='brown'
          onClick={() => setSelectedFilter('all')}
        >
          All
        </Button>
        {allAmenities.map((amenity: any) => (
          <Button
            key={amenity}
            color={getColorByKey(amenity)}
            onClick={() => setSelectedFilter(amenity)}
          >
            {amenityOptions.find((option) => option.value === amenity)?.label}
          </Button>
        ))}
      </Grid>
    </>
  );
}
