import React from 'react'
import { useForm } from 'react-hook-form';
import { useCreateInvitation } from '../../services/api/invitationsAPI';
import { useModalStore } from '../../stores/modal';
import { useNotificationStore } from '../../stores/notification';

export const SendInvite = ({ projectId, userId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const hide = useModalStore(store => store.hideModal)
  const { mutate: sendInvitation } = useCreateInvitation()

  const onSubmit = (data) => {
    console.log('data', data)
    sendInvitation({
        type: 'JOIN_PROJECT',
        project_id: projectId,
        user_id: userId,
        description: data?.description
    }, {
        onSuccess: () => {
            useNotificationStore.setState({ notifications: [{ message: 'Invitación enviada con éxito', type: 'success', hideProgressBar: true }] })
            hide()
        }
    })
  }

  return (
    <div>
        <h3 className="font-bold text-lg">Send invitation to join project</h3>
        <div className="">
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
           <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Explain why should the project creator consider you. *
            </label>
            <div className="mt-1">
                <textarea
                {...register("description", { required: true })}
                rows={4}
                name="description"
                id="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={''}
                />
            </div>
            </div>
            <div className='w-full flex justify-end mt-2'>
                <button
                    type='button'
                    onClick={hide}
                    className='bg-gray-200 hover:bg-gray-300 transition text-gray-700 px-5 py-2.5 rounded-md'
                >
                    Cancel
                </button>
                <button
                className='bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2.5 rounded-md'
                >
                    Send
                </button>
            </div>
        </form>
        </div>
    </div>
)}
