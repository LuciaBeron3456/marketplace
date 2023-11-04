import React from 'react'
import { useModalStore } from '../../stores/modal'
import { FindBestCollaborators } from './FindBestCollaborators'

export const BannerFindCollaborators = () => {

    const show = useModalStore(state => state.showModal)
  return (
    <div class="bg-red-400 text-white p-8 col-span-6 shadow-md rounded-xl my-2 text-center">
      <h1 class="text-3xl font-bold">Find the best collaborators for your projects</h1>
      <p class="mt-2 text-sm">Join forces with diverse individuals and contribute to meaningful projects that align with your passion and expertise.</p>
      <div className="mt-6 flex w-full justify-center">
          <button
            onClick={() => show({ content: <FindBestCollaborators /> })}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Test this feature
          </button>
        </div>
    </div>
  )
}
