import { citiesWithId } from '@/app/utils/constants';
import { Select } from '@radix-ui/themes';
import React from 'react';

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger placeholder='Select a City' />
      <Select.Content>
        {citiesWithId.map((city) => (
          <Select.Item key={city.id} value={city.name}>
            {city.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default CitySelect;
