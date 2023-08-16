import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"

const usePasswordToggle = () => {

    const [visible, setVisibility] = useState(false)

    const icon = (
      <FontAwesomeIcon 
        icon={visible ? faEyeSlash : faEye} 
        onClick={() => setVisibility(!visible)}
      />
    )

    const inputType = visible ? "text" : "password"


  return [inputType, icon]
}

export default usePasswordToggle