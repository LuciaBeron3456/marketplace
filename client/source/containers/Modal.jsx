import { useModalStore } from '../stores/modal'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const Modal = () => {
  const content = useModalStore(state => state.content)
  const display = useModalStore(state => state.display)
  const heading = useModalStore(state => state.heading)
  const hide = useModalStore(state => state.hideModal)
  const closeOnClickOutside = useModalStore(state => state.closeOnClickOutside)
  const size = useModalStore(state => state.size)

  const handleClose = () => {
    if (closeOnClickOutside) {
      hide()
    } else {
      return null
    }
  }

  const handleSize = () => {
    switch (size) {
      case 'medium':
        return 'max-w-2xl sm:my-8'
      case 'big':
        return 'max-w-7xl sm:my-2'
      default:
        return 'w-auto'
    }
  }

  return (
    <div className='max-w-full z-50'>
      <Transition.Root show={display} as={Fragment}>
        <Dialog as='div' className='fixed z-20 inset-0 overflow-y-auto' onClose={handleClose}>
          <div className='flex items-center justify-center min-h-screen pt-1 px-4 pb-20 text-center sm:block sm:p-0'>
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
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-[-10%] sm:translate-y-0 sm:scale-95'
              enterTo={`opacity-100 sm:translate-y-0 sm:scale-100`}
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-[-10%] sm:scale-100'
              leaveTo='opacity-0 translate-y-[-10%] sm:translate-y-0 sm:scale-95'
            >
              <div className={`${handleSize()} relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:p-6`}>
                <div>
                  <div className='mt-2'>
                    <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
                      {heading}
                    </Dialog.Title>
                    <div className='mt-2'>
                      {content}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
