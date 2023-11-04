import React from 'react'
import { SendInvite } from '../components/FindProject/SendInvite';
import { useGetProjectById } from '../services/api/projectsAPI';
import { useModalStore } from '../stores/modal';
import { useUserStore } from '../stores/user';
import { BecomePartner } from '../components/BecomePartner';

export const ProjectCard = ({ id }) => {
  const { data: project } = useGetProjectById(id)

  const show = useModalStore(store => store.showModal)
  const user = useUserStore(store => store.user)


  return (
    <div className='col-span-8 border border-gray-300 rounded-xl'>
    <div className='bg-white p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <img
            src='https://picsum.photos/200/300            '
            alt=''
            className='w-14 h-14 rounded-full mr-4'
          />
          <div>
            <h3 className='text-3xl font-semibold'>{project?.name}</h3>
            <p className='text-gray-500'>John Doe</p>
          </div>
        </div>
        {
          user.id !== project?.user_id &&
          <div>
            <button
              className='bg-green-500 mr-2 hover:bg-green-600 transition text-white px-5 py-2.5 rounded-md'
              onClick={() => show({ content: <BecomePartner />, heading: '', closeOnClickOutside: true})}
            >
              Become a partner
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2.5 rounded-md'
              onClick={() => show({ content: <SendInvite projectId={project?.id} userId={user.id} />, heading: '', closeOnClickOutside: true})}
            >
              Send request to join
            </button>
          </div>
        }
      </div>
      <hr />
      <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-6'>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Full name</dt>
          <dd className='mt-1 text-sm text-gray-900'>Margot Foster</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Application for</dt>
          <dd className='mt-1 text-sm text-gray-900'>Backend Developer</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Email address</dt>
          <dd className='mt-1 text-sm text-gray-900'>margotfoster@example.com</dd>
        </div>

      </dl>
      <div className='grid space-y-7 my-4'>
        <div className=''>
          <p className='text-gray-600 text-lg font-medium mb-2'>Description</p>
          <p className='text-gray-500'>{project?.description}</p>
        </div>
        <div className=''>
          <p className='text-gray-600 text-lg font-medium mb-2'>Objectives</p>
          <ul className='list-disc list-inside text-gray-500'>
            <li>Objective 1</li>
            <li>Objective 2</li>
            {/* Add more objectives as needed */}
          </ul>
        </div>
        <div>
          <p className='text-gray-600 text-lg font-medium mb-2'>Requirements</p>
          <p className='text-gray-500'>Requirements text goes here...</p>
        </div>
      </div>
    </div>
  </div>
  )
}

