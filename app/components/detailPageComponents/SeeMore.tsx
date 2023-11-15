'use client';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';
export default function SeeMore(props: any) {
  const place = props.place[0];
  const [show, setShow] = useState(false);

  function ShowMore() {
    setShow(!show);
  }

  return (
    <div>
      <Button
        onClick={() => {
          {
            ShowMore();
          }
        }}
      >
        {show === true ? 'Show Less' : 'Show More'}
      </Button>

      {show === true && (
        <div className='mt-1'>
          <p>
            <strong>Pets: {place.pet_friendly === true ? 'Yes' : 'No'}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
