import React, { useState } from 'react'
import { useGetProjectsByUserId } from '../../services/api/projectsAPI';
import { RadioGroup } from '@headlessui/react'

export const FindBestCollaborators = () => {
  const { data: projects, isLoading } = useGetProjectsByUserId(1)
  const [selected, setSelected] = useState()


  if (projects?.length === 0) {
    return (
        <p>
            Currently you have no projects created. Please come again when you have one
        </p>
    )
  }

  if (isLoading) return null

  return (
    <div>
        <h1>Let's find the best match. Choose a project. This is a beta feature</h1>
        <div className="w-full px-4 py-8">
            <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {projects.map((project) => (
                    <RadioGroup.Option
                        key={project.name}
                        value={project}
                        className={({ active, checked }) =>
                        `${
                            active
                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : ''
                        }
                        ${
                            checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                        }
                            relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                    >
                        {({ active, checked }) => (
                        <>
                            <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-sm">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    {project.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                    }`}
                                >
                                    <span>
                                    {project.date_from} - {project.date_to}
                                    </span>{' '}
                                    <span aria-hidden="true">&middot;</span>{' '}
                                </RadioGroup.Description>
                                </div>
                            </div>
                            </div>
                        </>
                        )}
                    </RadioGroup.Option>
                    ))}
                </div>
                </RadioGroup>
            </div>
        </div>
    </div>
  )
}
