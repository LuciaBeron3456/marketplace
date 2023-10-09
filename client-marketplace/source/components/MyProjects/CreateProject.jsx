import React, { useState, useEffect, Fragment } from 'react';
import { CKEditor } from 'ckeditor4-react';
import Autocomplete from "react-google-autocomplete";
import { useSearchSkills } from '../../services/api/skillsAPI';

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSearchScienceBranch } from '../../services/api/scienceBranchAPI';
import { useUserStore } from '../../stores/user';
import { useCreateProject } from '../../services/api/projectsAPI';

export const ProjectForm = () => {

  const [skillQuery, setSkillQuery] = useState('')
  const [fetch, setFetch] = useState(false)
  const { data: skillSearchResults } = useSearchSkills(skillQuery, fetch)
  const [selected, setSelected] = useState(null)
  const [tags, setTags] = useState([])
  const [location, setLocation] = useState()
  const [requirements, setRequirements] = useState()
  const [dateTo, setDateTo] = useState()
  const [dateFrom, setDateFrom] = useState()
  const [objectives, setObjectives] = useState()
  const [description, setDescription] = useState()
  const [projectName, setProjectName] = useState()
  const [nonProfit, setNonProfit] = useState()
  const user = useUserStore(store => store.user)
  const { mutate: createProject } = useCreateProject()

  const [fetchScienceBranches, setFetchScienceBranches] = useState(false)
  const [scienceBranchQuery, setScienceBranchQuery] = useState('')
  const [scienceBranchTags, setScienceBranchTags] = useState([])
  const { data: scienceBranchesResults } = useSearchScienceBranch(scienceBranchQuery, fetchScienceBranches)
  const [remote, setRemote] = useState(null)


  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  }

  const handleTagRemoveScienceBranch = (tagToRemove) => {
    const updatedTags = scienceBranchTags.filter((tag) => tag !== tagToRemove);
    setScienceBranchTags(updatedTags);
  };

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      user_id: user.id,
      is_remote: remote,
      science_branch: scienceBranchTags,
      skills: tags,
      description,
      location_id: location.location_id,
      location: location.formatted_address,
      requirements,
      objectives,
      date_to: dateTo,
      date_from: dateFrom,
      name: projectName
    }

    createProject(payload, {
      onSuccess: () => {
      }
    })
  }

  useEffect(() => {
    if (skillQuery) {
      setFetch(true)
    }
  }, [skillQuery])
  
  useEffect(() => {
    if (fetch) {
      setFetch(false)
    }
  }, [fetch])

  return (
    <div className="mx-auto bg-white py-3 px-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Project</h2>
      <form>
        {/* Project Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <Autocomplete
            apiKey={'AIzaSyDKxciKmiBXJkBsq0SyXu_MyflmdP61tgk'}
            placeholder='Enter a location'
            className='block w-full rounded-md border border-gray-300 py-2.5 pl-3 pr-8 col-span-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            onPlaceSelected={(place) => {
              setLocation(place)
            }}
           />

        </div>

        {/* Date From */}
        <div className="mb-4">
          <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-600">
            Date From
          </label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            onChange={(e) => setDateFrom(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Date To */}
        <div className="mb-4">
          <label htmlFor="dateTo" className="block text-sm font-medium text-gray-600">
            Date To
          </label>
          <input
            type="date"
            onChange={(e) => setDateTo(e.target.value)}
            id="dateTo"
            name="dateTo"
            required
            className="w-full rounded-md border-gray-300 py-2.5 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <CKEditor
            id="description"
            name="description"
            data=""
            onChange={(event) => setDescription(event.editor.getData())}
          />
        </div>

        {/* Objectives */}
        <div className="mb-4">
          <label htmlFor="objectives" className="block text-sm font-medium text-gray-600">
            Objectives
          </label>
          <CKEditor
            id="objectives"
            name="objectives"
            data=""
            onChange={(event) => setObjectives(event.editor.getData())}
          />
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-600">
            Requirements
          </label>
          <CKEditor
            id="requirements"
            name="requirements"
            data=""
            onChange={(event) => setRequirements(event.editor.getData())}
          />
        </div>

        <label className="text-base font-medium text-gray-900">What specific skills do you look in collaborators that will join this project?</label>

        <Combobox value='' onChange={setSelected}>
        <div className="relative mt-1 col-span-2">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(skill) => skill?.name}
              placeholder='Skills'
              onKeyUp={e => e.key === 'Enter' && setTags([...tags, skillQuery])}
              onChange={(event) => setSkillQuery(event.target.value)}
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
            afterLeave={() => setSkillQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {skillSearchResults?.length === 0 && skillQuery !== '' ? (
                  <Combobox.Option
                  key={'new_skill'}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  onClick={() => setTags([...tags, skillQuery])}
                  value={skillQuery}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {skillQuery}
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
              ) : (
                skillSearchResults?.map((skill) => (
                  <Combobox.Option
                    key={skill.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={skill}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {skill.name}
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
        </div>
      </Combobox>

      <div className="flex flex-wrap items-center mt-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
            <span className="mr-2">{tag}</span>
            <button onClick={() => handleTagRemove(tag)}>&times;</button>
          </div>
        ))}
      </div>

      <div className='my-4'>
            <label className="text-base font-medium text-gray-900">What fields of science are related to this project?</label>
            <Combobox value='' onChange={setSelected}>
        <div className="relative mt-1 col-span-2">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person?.name}
              placeholder='Science field'
              onKeyUp={e => e.key === 'Enter' && scienceBranchesResults?.length > 0 && setScienceBranchTags([...scienceBranchTags, scienceBranchesResults[0]?.name])}
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
                    onClick={() => setScienceBranchTags([...scienceBranchTags, scienceBranch.name])}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={scienceBranch.id}
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
        </div>
      </Combobox>

      <div className="flex flex-wrap items-center mt-2">
        {scienceBranchTags.map((tag, index) => (
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
            <span className="mr-2">{tag}</span>
            <button onClick={() => handleTagRemoveScienceBranch(tag)}>&times;</button>
          </div>
        ))}
      </div>

        </div>



            <div className='xl:col-span-1'>
                <label className='text-base font-medium text-gray-900'>Is this opportunity remote?</label>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    <div className='flex items-center space-x-3' onClick={() => setRemote(true)}>
                      <input
                        id='remoteYes'
                        name='remote'
                        type='radio'
                        value='Si'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor='remoteYes' className='ml-3 block text-sm font-medium text-gray-700'>
                        Yes
                      </label>
                    </div>
                    <div className='flex items-center space-x-3' onClick={() => setRemote(false)}>
                      <input
                        id='remoteNo'
                        type='radio'
                        name='remote'
                        value='No'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor='remoteNo' className='ml-3 block text-sm font-medium text-gray-700'>
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className='xl:col-span-1 mt-8'>
                <label className='text-base font-medium text-gray-900 mt-4'>Is this project nonprofit?</label>
                <fieldset className='mt-4'>
                  <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
                    <div className='flex items-center space-x-3' onClick={() => setNonProfit(true)}>
                      <input
                        id='nonProfitYes'
                        name='nonProfitYes'
                        type='radio'
                        value='Si'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor='nonProfitYes' className='ml-3 block text-sm font-medium text-gray-700'>
                        Yes
                      </label>
                    </div>
                    <div className='flex items-center space-x-3' onClick={() => setNonProfit(false)}>
                      <input
                        id='nonProfitNo'
                        type='radio'
                        name='nonProfit'
                        value='No'
                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor='nonProfitNo' className='ml-3 block text-sm font-medium text-gray-700'>
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {
                nonProfit && 
                <label className="flex items-center mt-5">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700">Make your project eligible for receiving Patreon</span>
                </label>
              }

        {/* Submit button */}
        <div className="mt-6 flex w-full justify-end">
          <button
            type="submit"
            onClick={(e) => submit(e)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};
