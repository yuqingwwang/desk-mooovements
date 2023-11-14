'use client';

import { SupabaseCall } from '@/utils/supabaseCall';
import newClient from '../config/supabaseclient';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';
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

    if (wishListArr && wishListArr[0]['wish_list'].includes(id)) return;
    const updatedWishList = wishListArr
      ? [...wishListArr[0]['wish_list'], id]
      : [id];
    const { error } = await supabase
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
        <Link href={'/login'}>
          <Button className='mb-3 mt-5'>Add to Wishlist </Button>
        </Link>
      )}
    </>
  );
}
