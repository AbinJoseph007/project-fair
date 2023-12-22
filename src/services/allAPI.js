

//register api

import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

export const registerAPI = async(user)=>{
   return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}

// login api

export const loginAPI = async (user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`, user , "")
}

// add project
export const addProjectAPI = async (reqBody , reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/projects/add`, reqBody , reqHeader)
}
// changampuzha park  metro station 

export const homeProjectAPI = async ()=>{
    return await commonAPI('GET',`${BASE_URL}/project/home-project`)
}
// all project
export const allProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"", reqHeader)
}

export const userProjectAPI = async (reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/user/user-projects`,"", reqHeader)
}