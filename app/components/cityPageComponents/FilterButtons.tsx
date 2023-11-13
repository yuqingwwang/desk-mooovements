import { Button, Grid } from '@radix-ui/themes';
import { getColorByKey } from '@/app/utils/getColor';
import { amenityOptions, allAmenities } from '@/app/utils/constants';

export default function FilterButtons({ setSelectedFilter }: any) {
  return (
    <Grid columns='3' gap='3' width='auto'>
      <Button key='all' color='brown' onClick={() => setSelectedFilter('all')}>
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
  );
}
