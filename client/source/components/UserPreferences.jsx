import React, { useState, Fragment } from 'react'
import { useSearchSkills } from '../services/api/skillsAPI'
import Autocomplete from "react-google-autocomplete";

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSearchScienceBranch } from '../services/api/scienceBranchAPI';
import { useUpdateUser } from '../services/api/usersAPI';
import { useModalStore } from '../stores/modal';
import { useUserStore } from '../stores/user';
import { useNotificationStore } from '../stores/notification';

export const UserPreferences = () => {
  const [tags, setTags] = useState([])
  const [skillQuery, setSkillQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [fetch, setFetch] = useState(false)
  const [fetchScienceBranches, setFetchScienceBranches] = useState(false)
  const [scienceBranchQuery, setScienceBranchQuery] = useState('')
  const [scienceBranchTags, setScienceBranchTags] = useState([])
  const { data: skillSearchResults } = useSearchSkills(skillQuery, fetchScienceBranches)
  const { data: scienceBranchesResults } = useSearchScienceBranch(scienceBranchQuery, fetch)
  const [remote, setRemote] = useState(false)
  const { mutate: updateUser } = useUpdateUser()
  const hide = useModalStore(state => state.hideModal)

  const [location, setLocation] = useState('')

  const user = useUserStore(store => store.user)

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleTagRemoveScienceBranch = (tagToRemove) => {
    const updatedTags = scienceBranchTags.filter((tag) => tag !== tagToRemove);
    setScienceBranchTags(updatedTags);
  };

  const savePreferences = () => {
    updateUser({ id: user.id, is_remote: remote, location: location.formatted_address, location_id: location.place_id, skills: tags, science_branch: scienceBranchTags },
        {
            onSuccess: () => {
                useNotificationStore.setState({ notifications: [{ message: 'Preferencias guardadas con éxito', type: 'success', hideProgressBar: true }] })
                hide()
            }
        }
        )
}
  return (
    <div>
        <h1 className='text-2xl font-semibold mb-4'>Set your preferences</h1>
        <div>
            <label className="text-base font-medium text-gray-900">What's your current location?</label>
            <Autocomplete
          apiKey={'AIzaSyDKxciKmiBXJkBsq0SyXu_MyflmdP61tgk'}
          placeholder='Enter a location'
          className='block w-full rounded-md border border-gray-300 py-2.5 pl-3 pr-8 col-span-2 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          onPlaceSelected={(place) => {
            setLocation(place)
          }}
        />

        </div>
        <div className='my-3'>
      <label className="text-base font-medium text-gray-900">Are you open to work on remote projects?</label>
      <fieldset className="mt-2">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center" onClick={() => setRemote(true)}>
              <input
                id='optionYes'
                name="remote"
                type="radio"
                defaultChecked
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor='optionYes' className="ml-3 block text-sm font-medium text-gray-700">
                Yes
              </label>
            </div>

            <div className="flex items-center" onClick={() => setRemote(false)}>
              <input
                id='optionNo'
                name="remote"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor='optionNo' className="ml-3 block text-sm font-medium text-gray-700">
                No
              </label>
            </div>
        
        </div>

        <div className='my-4'>
            <label className="text-base font-medium text-gray-900">What fields of science are you interested in?</label>
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

        <div>
        <label className="text-base font-medium text-gray-900">Please list skills you consider yourself proficient on</label>

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
        </div>
      </fieldset>
      <div className='w-full flex justify-end'>
        {
            (scienceBranchTags?.length > 0 && location) &&
            <button
                onClick={() => savePreferences()}
                className='bg-blue-600 mt-2 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-md'
            >
                Save preferences
            </button>
        }
      </div>
    </div>
    </div>
  )
}
