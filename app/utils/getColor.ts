import { ColorKey } from './types';

export const getColorByKey = (key: ColorKey) => {
  const colors: any = {
    pet_friendly: 'tomato',
    opens_till_late: 'red',
    has_wifi: 'ruby',
    has_socket: 'crimson',
    has_shower: 'pink',
    has_meeting_room: 'plum',
    has_phone_booth: 'purple',
    has_locker: 'violet',
  };
  return (colors[key] as any) || 'gray';
};
