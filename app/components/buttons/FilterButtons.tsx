import { allAmenities, amenityOptions } from '@/app/utils/constants';
import { getColorByKey } from '@/app/utils/getColor';
import { Button, Grid, Text } from '@radix-ui/themes';

export default function FilterButtons({
  selectedFilter,
  setSelectedFilter,
}: any) {
  return (
    <>
      <Text as='p' size='3'>
        Filter by
      </Text>
      <Grid
        columns={{
          initial: '3',
          md: '9',
        }}
        gap='3'
        width='auto'
      >
        <Button
          // className={selectedFilter === 'all' ? 'ring-2 ring-current ' : ''}
          variant={selectedFilter === 'all' ? 'soft' : 'solid'}
          key='all'
          color='brown'
          onClick={() => setSelectedFilter('all')}
        >
          All
        </Button>
        {allAmenities.map((amenity: any) => (
          <Button
            // className={selectedFilter === amenity ? 'text-white bg-black' : ''}
            variant={selectedFilter === amenity ? 'soft' : 'solid'}
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
