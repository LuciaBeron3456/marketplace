import React, { useState } from 'react';

const ChatOperations = ({ operations, setCurrentRoom, currentRoom }) => {
  const [current, setCurrent] = useState(1);

  return (
    <main className='mx-auto'>
      <div>
        <div className='sm:flex-auto my-3'>
          <h1 className='text-xl font-semibold text-gray-900'>Chatrooms</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of your communication channels.
          </p>
        </div>
      </div>
      <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead className='bg-gray-50 mx-20'>
                <tr>
                  <th name='name' scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ml-2'>
                    <button className='ml-2'>
                      Channel
                    </button>
                  </th>
                  <th name='person' scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 truncate ml-2'>
                    <button className='ml-2'>
                      Person
                    </button>
                  </th>
                </tr>
              </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
                        {operations?.map((room) => (
                          <OperationInfo room={room} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
                        ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export { ChatOperations }
