import { ColorKey } from './types';

export const getColorByKey = (key: ColorKey) => {
  const colors: any = {
    pet_friendly: 'indigo',
    opens_till_late: 'cyan',
    has_wifi: 'orange',
    has_socket: 'crimson',
    has_shower: 'pink',
    has_meeting_room: 'tomato',
    has_phone_booth: 'mint',
    has_locker: 'teal',
  };
  return (colors[key] as any) || 'gray';
};
