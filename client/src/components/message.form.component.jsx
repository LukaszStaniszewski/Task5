import {useState} from 'react'

import { useUserContext } from "../context/user.context"
import { useMessageContext } from "../context/message.context"
import FormInput from "./form-input.component"
import Autocomplete from "./autocomplete.component"


const defaultFormData = {
  recipient: "",
  title: "",
  body: ""
}

const MessgeForm = () => {

const [formData, setFormData] = useState(defaultFormData)
const {recipient, title, body} = formData
console.log("resicipient", recipient)

const {user, usersNames, isLoading} = useUserContext()
const {sendMessageAndFechData} = useMessageContext()


  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      setFormData(defaultFormData)
      await sendMessageAndFechData(formData, user)

    } catch(error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    
    setFormData((prevState) => 
      ({...prevState, [name]: value})
    )
  }
  
  console.log("name", usersNames)

  return (
    <div className="col-start-2 col-end-4 py-10 px-10 border-l">
      <form id="message-form" autoComplete="off" onSubmit={handleSubmit}>
        <FormInput
            list="names"
            label="recipient"
            type="text"
            name="recipient"
            value={recipient}
            onChange={handleChange}
            required
        />
      { !isLoading && <Autocomplete 
          listName = "names"
          stringArray = {usersNames}
          inputValue={recipient}
        />}
        <FormInput
            label="title" 
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
        />
        <textarea className="form-control block w-full h-60vh mt-5 p-2 border-2"  
          type="textarea" 
          placeholder="Your message"
          value={body}
          name="body"
          onChange={handleChange}
          required
            />
      </form>
    </div>
  )
}

export default MessgeForm