import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Banner } from '../components/MyProjects/Banner';
import { ProjectForm } from '../components/MyProjects/CreateProject';
import { ProjectsList } from '../components/MyProjects/ProjectsList';

export const Projects = () => {
  const [currentTab, setCurrentTab] = useState('create');

  const tabs = [
    {
      title: 'My Projects',
      content: <ProjectsList />,
    },
    {
      title: 'Joined Projects',
      content: 'Content for Joined Projects',
    },
    {
      title: 'Received Invitations',
      content: 'Content for Received Invitations',
    },
    {
      title: 'Sent Invitations',
      content: 'Content for Sent Invitations',
    },
  ];

  return (
    <div className='mx-5 my-2'>
      <Banner />
      <div className='w-full grid grid-cols-12 mx-1 mt-8 gap-x-4 mb-4'>
        <Tab.Group vertical>
          <Tab.List className="space-y-2 col-span-3">
              <Tab
                key='create'
                className={`rounded-md flex items-center justify-center px-10 mb-4 py-4 w-full ${
                  currentTab === 'create' ? 'ring ring-orange-200 bg-white text-orange-500' : 'text-white bg-orange-400'
                }`}
                onClick={() => setCurrentTab('create')}
              >
                Create project
              </Tab>
              <hr />
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={`rounded-md bg-blue-500 flex items-center justify-center px-10 py-4 w-full ${
                  currentTab === index ? 'ring ring-blue-200 bg-white text-blue-500' : 'text-white'
                }`}
                onClick={() => setCurrentTab(index)}
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='col-span-8'>
            <Tab.Panel key='create' className="p-4 bg-white border border-blue-500 rounded-lg w-full">
              <ProjectForm />
            </Tab.Panel>
            {tabs.map((tab, index) => (
              <Tab.Panel key={index} className="p-4 bg-white border border-blue-500 rounded-lg w-full">
                {tab.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Projects;
