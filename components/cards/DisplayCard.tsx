import { getColorByKey } from '@/app/utils/getColor';
import { PlaceCardParams } from '@/app/utils/types';
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';

export function DisplayCard({
  pageRoute,
  imageLink,
  placeName,
  flavourText,
  amenityList,
}: PlaceCardParams) {
  return (
    <Card
      asChild
      variant='surface'
      className='w-auto py-2 md:w-[600px] lg:w-[850px]'
      data-testid='card-container'
    >
      {pageRoute ? (
        <Link href={`/${pageRoute}`}>
          <CardContents
            imageLink={imageLink}
            placeName={placeName}
            flavourText={flavourText}
            amenityList={amenityList}
          />
        </Link>
      ) : (
        <Container>
          <CardContents
            imageLink={imageLink}
            placeName={placeName}
            flavourText={flavourText}
            amenityList={amenityList}
          />
        </Container>
      )}
    </Card>
  );
}

function CardContents({
  imageLink,
  placeName,
  flavourText,
  amenityList,
}: PlaceCardParams) {
  return (
    <Flex gap='1' align='center'>
      <Avatar
        size={{
          initial: '8',
          md: '9',
        }}
        src={imageLink ?? ''}
        radius='full'
        fallback='T'
        className='mx-4 mt-8'
      />
      <Box>
        <Text as='div' size='5' weight='bold'>
          {placeName}
        </Text>
        {amenityList?.split(',').map((item: any, index: number) => (
          <Badge
            className='mr-2'
            color={getColorByKey(item)}
            key={item + index}
          >
            {item}
          </Badge>
        ))}

        <Text as='div' size='3' color='gray'>
          {flavourText}
        </Text>
      </Box>
    </Flex>
  );
}
