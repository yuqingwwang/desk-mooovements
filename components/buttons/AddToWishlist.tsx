'use client';

import newClient from '@/app/config/supabaseclient';
import { SupabaseCall } from '@/app/utils/supabaseCall';
import { Button } from '@radix-ui/themes';
import RedirectBtn from './RedirectBtn';

export default function AddToWishList({
  id,
  user,
}: {
  id: number;
  user: string | null;
}) {
  async function updateList() {
    const supabase = newClient();
    const wishListArr = await SupabaseCall('profiles', 'wish_list', 'id', user);

    if (wishListArr && wishListArr[0]?.wish_list?.includes(id)) {
      return;
    }

    const updatedWishList =
      wishListArr && wishListArr[0]?.wish_list
        ? [...wishListArr[0].wish_list, id]
        : [id];

    await supabase
      .from('profiles')
      .update({ wish_list: updatedWishList })
      .eq('id', user);
  }
  return (
    <>
      {user ? (
        <Button
          onClick={() => {
            {
              updateList();
            }
          }}
        >
          Add to Wishlist{' '}
        </Button>
      ) : (
        <RedirectBtn />
      )}
    </>
  );
}
