'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

import type { Database } from '../lib/supabase'

type WorkPlace = Database['public']['Tables']["work_spaces"]

export default function Page() {
  const [workplaces, setWorkplace] = useState<WorkPlace[] | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('name').select()
      setWorkplace(data)
    }

    getData()
  }, [])

  return workplaces ? <pre>{JSON.stringify(workplaces, null, 2)}</pre> : <p>Loading workplaces...</p>
}
