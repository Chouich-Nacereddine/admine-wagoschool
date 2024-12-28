import NotifPush from '@/app/components/NotifPush'
import React from 'react'

const Notifications = () => {
  return (
    <div className='w-[100vw] sm:w-max flex flex-col items-center gap-10'>
     <h1 className="text-4xl font-bold">Notifications Push</h1>
     <NotifPush/>
    </div>
  )
}

export default Notifications
