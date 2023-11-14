'use client';

import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const MapView = ({ coordinates }: { coordinates: any }) => {
  if (!coordinates) return <div>loading...</div>;

  let [long, lat] = coordinates;

  // annoying bug for space 4
  if (isNaN(long) || isNaN(lat)) {
    console.log(coordinates);
    const coordinateArray = coordinates.slice(1, -1).split(',');
    [long, lat] = coordinateArray.map((str: string) =>
      parseFloat(str.replace(/['"]/g, '').trim())
    );
  }
  return (
    <Map
      initialViewState={{
        latitude: lat,
        longitude: long,
        zoom: 14,
      }}
      style={{ width: 300, height: 300 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={long} latitude={lat} color='red' />
    </Map>
  );
};
