'use client';
import React, { useState } from 'react';
export default function SeeMore(props: any) {
  const place = props.place[0];
  const [show, setShow] = useState(false);

  function ShowMore() {
    setShow(!show);
  }

  return (
    <div>
      <button
        onClick={() => {
          {
            ShowMore();
          }
        }}
      >
        {show === true ? 'Show Less' : 'Show More'}
      </button>

      {show === true && (
        <div>
          <p>Pets: {place.pet_friendly === true ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
