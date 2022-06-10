import { createContext, useState, useContext } from "react";
import * as api from "../api/axios-Instance.api"


const sendMessage = async (formData ,user) => {
  const message = {postedBy: user.username, ...formData, }
  try{
    const sendMessage = await api.createMessage(message)
    return sendMessage.data
    } catch (error) {
      console.error(error)
    }
}

export const MessageContext = createContext({
    message: null,
    setMessage: () => {},
    setMessendMessageAndFechDatasage: () => {}
});


export const MessageProvider = ({children}) => {
    const [messages, setMessages] = useState([])
    
    const sendMessageAndFechData = async (formData, user) => {
      const messageToMyself = await sendMessage(formData, user)
      if(messageToMyself) {
        setMessages((prevState) => ([...prevState, messageToMyself]))
      }
    }
    
    const value = {sendMessageAndFechData, setMessages, messages}
    return <MessageContext.Provider value={value} >{children}</MessageContext.Provider>
} 

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error("MessageContext was used outside of its Provider");
  }
  return context;
};