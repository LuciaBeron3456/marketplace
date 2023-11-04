import React, { useState, useEffect, Fragment } from 'react';
import { Banner } from '../components/FindProject/Banner';
import { Search } from '../components/FindProject/Search';
import { useGetProjects } from '../services/api/projectsAPI';
import Autocomplete from "react-google-autocomplete";
import { ProjectCard } from './ProjectCard';
import { useGetScienceBranch, useSearchScienceBranch } from '../services/api/scienceBranchAPI';

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const FindProject = () => {
  const [filters, setFilters] = useState({})
  const { data: projects } = useGetProjects(filters);
  const { data: scienceBranches } = useGetScienceBranch()
  const [scienceBranchQuery, setScienceBranchQuery] = useState('')
  const [fetch, setFetch] = useState(false)
  const { data: scienceBranchesResults } = useSearchScienceBranch(scienceBranchQuery, fetch)
  const [selectedProject, setSelectedProject] = useState(null)
  const [location, setLocation] = useState(null)
  const [selected, setSelected] = useState(null)
  const [branch, setBranch] = useState(null)
  const [includeRemote, setIncludeRemote] = useState('include')

  const applyFilters = e => {
    e.preventDefault()
    setFilters({
      location_id: location,
      includeRemote,

    })

  }

  useEffect(() => {
    if (projects) {
      setSelectedProject(projects[0]?.id)
    }

    if (scienceBranches) {
      setSelected(scienceBranches[0])
    }
  },[projects, scienceBranches])

  useEffect(() => {
    if (scienceBranchQuery) {
      setFetch(true)
    }
  }, [scienceBranchQuery])
  
  useEffect(() => {
    if (fetch) {
      setFetch(false)
    }
  }, [fetch])

  return (
    <div className='mx-5 my-2 bg-white'>
      <Banner />
      <div className='grid grid-cols-12 my-3.5 gap-x-2'>
        <Search />

        {/* Additional select elements */}
        <Autocomplete
          apiKey={'AIzaSyDKxciKmiBXJkBsq0SyXu_MyflmdP61tgk'}
          placeholder='Enter a location'
          className='block w-full rounded-md border border-gray-300 py-2.5 pl-3 pr-8 col-span-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          onPlaceSelected={(place) => {
            setLocation(place.location_id)
          }}
        />

      <Combobox value='' onChange={setSelected}>
        <div className="relative mt-1 col-span-2">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person?.name}
              placeholder='Science field'
              onKeyUp={e => e.key === 'Enter' && scienceBranchesResults?.length > 0 && setBranch(scienceBranchesResults[0]?.name)}
              onChange={(event) => setScienceBranchQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setScienceBranchQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {scienceBranchesResults?.length === 0 && scienceBranchQuery !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                scienceBranchesResults?.map((scienceBranch) => (
                  <Combobox.Option
                    key={scienceBranch.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={scienceBranch}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {scienceBranch.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
          {
            branch &&
            <div className='absolute top-10 border rounded-xl p-3'>
              {branch}
            </div>
          }
        </div>
      </Combobox>
        <select
          id='remote'
          name='remote'
          placeholder='Include remote opportunities?'
          className='block w-full rounded-md border-gray-300 py-2.5 pl-3 pr-8 col-span-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          defaultValue='include'
          onChange={(e) => setIncludeRemote(e.target.value)}
        >
          <option value='include'>Include remote</option>
          <option value='exclude'>Exclude remote</option>
          <option value='show_only_remote'>Show only remote</option>
        </select>

        <button onClick={e => applyFilters(e)} className='bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2.5 rounded-md'>
          Apply filters
         </button>

      </div>
      <h3 className='text-xl font-semibold ml-2 mb-2'>Search results</h3>
      <div className='grid grid-cols-12 gap-x-3'>
        <div className='col-span-4 flex flex-col space-y-2'>
          {projects?.map((project) => {
            return (
                <div key={project.id} onClick={() => setSelectedProject(project.id)} className={`bg-white p-4 rounded-xl shadow-sm border-2 cursor-pointer ${project.id === selectedProject ? 'border-blue-500' : ''} relative`}>
                  <div className='flex items-center mb-4'>
                    <img
                      src='https://picsum.photos/200/300'
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
        <ProjectCard id={selectedProject} />
      </div>
    </div>
  );
};
