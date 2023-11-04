import { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'

const Modal = ({ openModal, setOpenModal, children }) => {
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpenModal}>
        <div className='flex items-center justify-center min-h-screen py-4 px-4 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='transform transition duration-[400ms]'
            enterFrom='opacity-0 rotate-[-120deg] scale-50'
            enterTo='opacity-100 rotate-0 scale-100'
            leave='transform duration-200 transition ease-in-out'
            leaveFrom='opacity-100 rotate-0 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none outline-none'
                  onClick={() => setOpenModal(false)}
                >
                  <span className='sr-only'>Close</span>
                  <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export { Modal }
