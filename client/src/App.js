import { useEffect } from "react"
import { Application } from '@hotwired/stimulus'
import { Autocomplete } from 'stimulus-autocomplete'
import {Route, Routes} from 'react-router-dom'

import HomePage from "./routes/home-page/hompe-page.component"
import MessagePage from "./routes/message-page/message-page.component"

import {useUserContext} from "./context/user.context"

function App() {
  const {authenticateAndSetUser} = useUserContext()
  const application = Application.start()
  application.register('autocomplete', Autocomplete)

  useEffect(() => {
    (async() => authenticateAndSetUser())() 
  }, [])

  return (
    
    <div className="w-screen h-screen w-max-screen h-max-screen"> 
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/message" element={<MessagePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
