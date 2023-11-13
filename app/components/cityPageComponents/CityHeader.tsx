import { Heading, Text, Box } from '@radix-ui/themes';

export default function CityHeader({ city }: { city: any }) {
  return (
    <Box width='auto' height='auto' bottom='50%'>
      <Heading data-testid='city-name' as='h1' size='8'>
        {city[0].name}
      </Heading>
      <Text as='p' size='4'>
        Country: {city[0].country}
      </Text>
    </Box>
  );
}
