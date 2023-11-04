export const ChatMessage = ({ message, customer, messageRef, text }) => {
  const formatDate = (messageDate) => {
    const spanishLocale = 'es-ES'
    if (!messageDate) {
      const now = new Date()
      const timeFormatter = new Intl.DateTimeFormat(spanishLocale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      return timeFormatter.format(now)
    }
    const now = new Date()
    const messageDateTime = new Date(messageDate)
    const timeDifference = now - messageDateTime
    const oneDay = 24 * 60 * 60 * 1000 // Number of milliseconds in a day

    if (timeDifference < oneDay) {
      // If the message was sent within the last 24 hours, format as hour (e.g., "16:45")
      const timeFormatter = new Intl.DateTimeFormat(spanishLocale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      return timeFormatter.format(messageDateTime)
    } else {
      // If the message was sent more than 24 hours ago, format as "Month Day" (e.g., "24 de julio")
      const dateFormatter = new Intl.DateTimeFormat(spanishLocale, {
        day: 'numeric',
        month: 'long'
      })
      return dateFormatter.format(messageDateTime)
    }
  }

  return (
    <div key={message.id} class={`${customer?.id === message?.userId ? 'justify-end' : 'justify-start'} flex mb-2 `}>
      <div class={` ${customer?.id === message?.userId ? 'bg-[#5d45c9] text-white' : 'bg-[#f2f2f2]'} rounded py-2 px-3`}>
        <p class='text-sm mt-1' ref={messageRef} dangerouslySetInnerHTML={{ __html: text || message?.message }} />
        <p class='text-right text-xs text-grey-dark mt-1'>
          {formatDate(message?.createdAt)}
        </p>
      </div>
    </div>
  )
}
