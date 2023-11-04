import React from 'react'
import { Banner } from '../components/Overview/Banner'
import { BannerFindCollaborators } from '../components/Overview/BannerFindCollaborators'
import { BannerMatch } from '../components/Overview/BannerMatch'

const stats = [
    { name: 'Total Subscribers', stat: '71,897' },
    { name: 'Avg. Open Rate', stat: '58.16%' },
    { name: 'Avg. Click Rate', stat: '24.57%' },
  ]
  
export const Overview = () => {
  return (
    <div>
      <div className='mx-8 my-3'>
        <Banner />
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
            </div>
            ))}
        </dl>
        <div className='grid w-full gap-x-3 grid-cols-12'>
            <BannerMatch />
            <BannerFindCollaborators />
        </div>
      </div>
    </div>  )
}
