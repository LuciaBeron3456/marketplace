import React from 'react'
import { useGetProjectsByUserId } from '../../services/api/projectsAPI';
import { useUserStore } from '../../stores/user';

export const ProjectsList = () => {
  const user = useUserStore(store => store.user)
  const { data: projects } = useGetProjectsByUserId(user.id)
  return (
    <div className='w-full flex flex-col space-y-2'>
        <h2 className="text-2xl font-semibold mb-4">My projects</h2>

          {projects?.map((project) => {
            return (
                <div key={project.id} className={`bg-white p-4 rounded-xl shadow-sm border-2 cursor-pointer border-blue-500 relative`}>
                  <div className='flex items-center mb-4 w-full'>
                    <img
                      src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png'
                      alt=''
                      className='w-12 h-12 rounded-full mr-4'
                    />
                    <div>
                      <h3 className='text-xl font-semibold'>{project.name}</h3>
                      <p className='text-gray-500'>John Doe</p>
                    </div>
                  </div>
                  <div className='flex space-x-2'>
                    <span className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'>Programming</span>
                    <span className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'>HTML</span>
                  </div>
                  <div className='flex justify-between mt-3'>
                    <p className='text-sm text-gray-600'>Remote</p>
                    <p className='text-gray-600 text-sm'>5 mins ago</p>
                  </div>
                </div>
            );
          })}
    </div>
  )
}
