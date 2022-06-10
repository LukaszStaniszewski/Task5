import {useEffect} from 'react'

import MessageFrame from "./message-frame.component"
import * as api from "../api/axios-Instance.api"
import { useUserContext } from "../context/user.context"
import {useMessageContext} from "../context/message.context"

const MessageHistory = () => {
const {setMessages, messages} = useMessageContext()
const {user} = useUserContext()

  useEffect(() => {
    const getMessagesSendToCurrentUser = async () => {
      const response = await api.fetchMessages()
      setMessages(response.data)
    }
    getMessagesSendToCurrentUser()
  }, [user])
  

  return (
    <div className="col-start-1 col-end-2 py-10 px-10">
       <button className="block flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-full mb-3"
       type="submit"
       form="message-form"
       >Send Message</button>
       <div className="overflow-auto max-h-80vh">
         {
           messages.map((message, index) => 
            <MessageFrame key={index} message={message}/>
           )
         }
       </div>
    </div>
  )
}

export default MessageHistory