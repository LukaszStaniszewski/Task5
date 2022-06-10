const MessageFrame = ({message}) => {
  const {title, postedBy, body} = message
  
  return (
    <div className="w-full  border-teal-500 border-b py-1 px-2 rounded border-collapse ">
      <div className="text-xl" >{postedBy}</div>
      <div className="text-l">{title}</div>
      <div className="text-sm">{body}</div>
    </div>
  )
}

export default MessageFrame