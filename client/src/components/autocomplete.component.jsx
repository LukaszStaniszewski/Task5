import Fuse from 'fuse.js'
import { useState, useEffect } from "react"
import Spinner from "./spinner.comonent"
import * as api from "../api/axios-Instance.api"


const Autocomplete = (data) => {
  const {listName, inputValue, stringArray} = data
  
  const options = {
    includeScore: true,
  }
  
  const fuse = new Fuse(stringArray, options)

  const result = fuse.search(inputValue)

  return (
    <datalist id={`${listName}`}>
      {
        result.map((name, index )=> 
        <option key={index} value={name.item}/>
          )
      }
    </datalist>
  ) 
}

export default Autocomplete