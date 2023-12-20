import { Box, Heading } from '@radix-ui/themes';

export default function CityHeader({ city }: { city: any }) {
  return (
    <Box width='auto' height='auto' bottom='50%'>
      <Heading size='5'>Workspaces in</Heading>
      <Heading data-testid='city-name' as='h1' size='9'>
        {city}
      </Heading>
    </Box>
  );
}
