'use client';

import { SupabaseCall } from '@/utils/supabaseCall';
import newClient from '../config/supabaseclient';
import Link from 'next/link';
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

    if (wishListArr[0]['wish_list'] && wishListArr[0]['wish_list'].includes(id))
      return;
    const updatedWishList = wishListArr[0]['wish_list']
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
        <button
          onClick={() => {
            {
              updateList();
            }
          }}
        >
          Add to Wishlist{' '}
        </button>
      ) : (
        <Link href={'/login'}>
          <button>Add to Wishlist </button>
        </Link>
      )}
    </>
  );
}
