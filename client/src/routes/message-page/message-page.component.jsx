import MessageHistory from "../../components/message-history.component"
import MessgeForm from "../../components/message.form.component"
import { useUserContext } from "../../context/user.context"

const MessagePage = () => {
  const {user} = useUserContext()
  return (
    <section className="grid grid-cols-3 h-max-screen relative">
      {user && <h5 className="z-10 absolute top-5 right-1 px-10" >Hi {user.username}</h5>}
      <MessageHistory/>
      <MessgeForm/>
    </section>
  )
}

export default MessagePage