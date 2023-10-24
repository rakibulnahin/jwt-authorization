import React from 'react'

const Purpose = () => {
  return (
    <div className='p-20 w-full flexCol gap-10'>
        <span className='text-3xl font-bold'>Authentication VS Authorization</span>
        <span className='flexCol'>
            <span className='text-xl underline'>Authentication:</span>
            <span className='ml-5'>- Authentication is used for login or verification purpose</span>
            <span className='ml-5'>- Can be done using OAuth or Next-Auth</span>
        </span>

        <span className='flexCol'>
            <span className='text-xl underline'>Authorization:</span>
            <span className='ml-5'>- Authorization is done after authentication</span>
            <span className='ml-5'>- This permits your role to the application/website</span>
        </span>

    </div>
  )
}

export default Purpose