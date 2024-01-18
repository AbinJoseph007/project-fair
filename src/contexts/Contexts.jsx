import React, { createContext, useState } from 'react'

// create context api
export const addProjectResponseContext = createContext()
// edit project
export const editProjectResponseContext = createContext()

export const isAuthTokenContext = createContext()

//children is a predefined prop 
function Contexts({children}) {
    // data to share
    const [addProjectResponse , setAddProjectResponse] = useState({})

    const [editProjectResponse , setEditProjectResponse] = useState({})

    const [ isAuthToken , setIsAuthToken] = useState(false)
  return (
    <>
    {/* // only provider can provide data and value attribute is used to specify the data to share */}
    <addProjectResponseContext.Provider value={{addProjectResponse , setAddProjectResponse}}>
       <editProjectResponseContext.Provider value={{editProjectResponse , setEditProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken , setIsAuthToken}}>
          {children}
          </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>
       
    </addProjectResponseContext.Provider>
    </>
  )
}

export default Contexts