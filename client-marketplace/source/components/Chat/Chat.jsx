import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { ChatMessage } from '../components/ChatMessage'
import { useCreateMessage, useGetMessagesByRoom } from '../services/api/chatAPI'
import { useModalStore } from '../stores/modal'

export const Chat = ({ currentRoom, setCurrentRoom, customer }) => {
  const [query, setQuery] = useState('')
  const [receivedMessages, setReceivedMessages] = useState([])
  const [name, setName] = useState('')
  const { data: messages } = useGetMessagesByRoom(currentRoom?.id, Boolean(currentRoom?.id))
  const { mutate: createMessage } = useCreateMessage()
  const [message, setMessage] = useState('')
  const [modifiedMessages, setModifiedMessages] = useState([])
  const show = useModalStore(state => state.showModal)
  const [socket, setSocket] = useState(null)
  const [, forceUpdate] = useState()

  const containerRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      roomId: parseInt(currentRoom?.id),
      userId: customer?.id,
      textMessage: message
    }
    createMessage(payload)
    setReceivedMessages([...receivedMessages, { message, currentRoom: parseInt(currentRoom?.id), userId: customer?.id }])
    socket.emit('send_message', { message, currentRoom: parseInt(currentRoom?.id), userId: customer?.id })
    setMessage('')
  }

  const joinRoom = (room) => {
    if (socket) {
      socket.emit('join_room', room)
    }
  }


  useEffect(() => {
    // Initialize the socket connection when the component is mounted
    // const newSocket = io.connect(`${API_SOCKET}`, { path: '/socket' })

    const newSocket = io.connect(`${API_SOCKET}`, { path: '/socket' })
    // const newSocket = io.connect(':3001')

    setSocket(newSocket)

    // Close the socket connection when the component is unmounted
    return () => {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [])

  useEffect(() => {
    messageRefs.current[messageRefs?.current?.length - 1]?.scrollIntoView()
  }, [receivedMessages, messages])


  useEffect(() => {
    const eventListener = (data) => {
    }
    socket?.on('receive_message', eventListener)

    return () => socket?.off('receive_message', eventListener)
  }, [socket])

  const messageRefs = useRef([])

  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, messages?.data?.length)
  }, [messages])
  useEffect(() => {
    joinRoom(parseInt(currentRoom?.id))
    setReceivedMessages([])
  }, [currentRoom, socket])

  const scrollToMessage = (index) => {
    messageRefs.current[index]?.scrollIntoView()
    setCurrentMessageIndex(index)
  }

  return (
    <div class='mx-auto max-w-7xl'>
      <button onClick={() => setCurrentRoom(null)}>
        <div className='flex'>
          <span type='submit' className='inline-flex mt-2 items-center py-4 text-blue-700'>
            <ArrowLeftIcon className='w-5 h-5 mr-2' /> Volver
          </span>
        </div>
      </button>

      <div class='h-[80vh]'>
        <div class='flex border border-grey rounded shadow-lg h-full'>
          {/* CHAT */}
          <>
            <div ref={containerRef} class='w-full border flex flex-col relative'>

              {
                <div class='py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center relative'>
                  <div class='flex items-center'>
                    <div class='flex'>
                      <img class='w-10 h-10 rounded-full' src='https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png' />
                    </div>
                    <div class='ml-4'>
                      <p class='text-grey-darkest'>
                        {currentRoom?.title}
                      </p>
                    </div>
                  </div>
                </div>
                }

              <div class='flex-1 relative' style={{ backgroundColor: '#DDD' }}>
                <div class='py-2 px-3 absolute inset-0 overflow-y-auto'>
                  {
                          messages?.data?.map((item, index) => (
                            <ChatMessage
                              customer={customer} key={customer?.id} message={item} text={modifiedMessages.find(message => item.id === message.id) ? modifiedMessages.find(message => item.id === message.id)?.message : item?.textMessage} messageRef={(el) => (messageRefs.current[index] = el)}
                            />
                          ))
                          }
                  {
                          receivedMessages?.map((item, index) => (
                            <ChatMessage customer={customer} key={customer?.id} message={item} text={modifiedMessages.find(message => item.id === message.id) ? modifiedMessages.find(message => item.id === message.id)?.message : item?.textMessage} messageRef={(el) => (messageRefs.current[index + messages?.data?.length] = el)} />
                          ))
                          }
                </div>
              </div>

              <form onSubmit={e => onSubmit(e)}>
                <div class='bg-grey-lighter px-4 py-4 flex items-center'>
                  <div class='flex-1 mx-4'>
                    <input
                      type='text' placeholder='Mensaje'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      href={`${receivedMessages[receivedMessages?.length - 1]}`}
                      class='w-full border rounded px-2 py-2'
                      name='message' required
                    />
                  </div>
                  <button>
                    <svg
                      class='w-5 h-5 text-gray-500 origin-center transform rotate-90' xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20' fill='currentColor'
                    >
                      <path
                        d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'
                      />
                    </svg>
                  </button>
                  {/* <div className='ml-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                  </div> */}
                </div>
              </form>

            </div>
          </>

        </div>
      </div>
    </div>
  )
}
