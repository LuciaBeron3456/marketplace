import React from 'react'

export const Loader = ({ profile }) => {
  return (
    <div className={`Uncontrolled ${profile ? 'relative' : 'absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'}`}>
     loaading..
    </div>
  )
}
