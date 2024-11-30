import CreateRoom from '@/app/components/CreateRoom'
import React from 'react'

const Rooms = () => {
  return (
    <div className='w-max flex flex-col items-center gap-10'>
     <h1 className="text-4xl font-bold">Notifications Push</h1>
     <CreateRoom/>
    </div>
  )
}

export default Rooms
