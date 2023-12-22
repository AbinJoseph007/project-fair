import React, { createContext, useState } from 'react'

// create context api
export const addProjectResponseContext = createContext()

//children is a predefined prop 
function Contexts({children}) {
    // data to share
    const [addProjectResponse , setAddProjectResponse] = useState({})
  return (
    <>
    {/* // only provider can provide data and value attribute is used to specify the data to share */}
    <addProjectResponseContext.Provider value={{addProjectResponse , setAddProjectResponse}}>
       {children} 
    </addProjectResponseContext.Provider>
    </>
  )
}

export default Contexts