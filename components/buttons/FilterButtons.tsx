import { allAmenities, amenityOptions } from '@/app/utils/constants';
import { getColorByKey } from '@/app/utils/getColor';
import { Button, Grid, Text } from '@radix-ui/themes';

export default function FilterButtons({
  selectedFilter,
  setSelectedFilter,
}: any) {
  return (
    <div className='px-10'>
      <Text as='p' size='5'>
        Filter by
      </Text>
      <Grid
        columns={{
          initial: '3',
          md: '4',
        }}
        gap='4'
        width='auto'
        className='pt-5'
      >
        <Button
          variant={selectedFilter === 'all' ? 'soft' : 'solid'}
          key='all'
          color='brown'
          onClick={() => setSelectedFilter('all')}
          size='4'
        >
          All
        </Button>
        {allAmenities.map((amenity: any) => (
          <Button
            variant={selectedFilter === amenity ? 'soft' : 'solid'}
            key={amenity}
            color={getColorByKey(amenity)}
            onClick={() => setSelectedFilter(amenity)}
            size='4'
          >
            {amenityOptions.find((option) => option.value === amenity)?.label}
          </Button>
        ))}
      </Grid>
    </div>
  );
}
