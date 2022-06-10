import {useState} from 'react'
import { useUserContext } from "../context/user.context"
import { useMessageContext } from "../context/message.context"
import FormInput from "./form-input.component"

const defaultFormData = {
  recipient: "",
  title: "",
  body: ""
}

const MessgeForm = () => {
const [formData, setFormData] = useState(defaultFormData)
const {recipient, title, body} = formData
const {user} = useUserContext()
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

  return (
    <div className="col-start-2 col-end-4 py-10 px-10 border-l">
      <form id="message-form" onSubmit={handleSubmit}>
        <FormInput
            label="recipient"
            type="text"
            name="recipient"
            value={recipient}
            onChange={handleChange}
            required
      />
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