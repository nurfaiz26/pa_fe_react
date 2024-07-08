import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"

export const MainContext = createContext()

export const MainProvider = (props) => {
    // Online Server
    // const baseUrl = "https://api.ichwunden.my.id"
    // const djangoBaseUrl = "https://smart-top-dory.ngrok-free.app/api"
    // Local Server
    const baseUrl = "http://localhost:4000"
    // const baseUrl = "http://192.168.1.10:4000"
    const djangoBaseUrl = "http://127.0.0.1:8000/api"
    // const djangoBaseUrl = "http://192.168.1.10:8000/api"
    let navigate = useNavigate()
    let userId = Cookies.get('userId')
    let token = Cookies.get('token')
    const [dataUsers, setDataUsers] = useState(null)
    const [dataUser, setDataUser] = useState(null)
    const [dataClassifications, setDataClassifications] = useState(null)
    const [dataPatients, setDataPatients] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(true)
    const [currentId, setCurrentId] = useState(-1)

    useEffect(() => {

        if (fetchStatus === true) {
            if (token !== undefined) {
                axios.get(`${baseUrl}/users`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataUsers([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })

                axios.get(`${baseUrl}/class-results`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataClassifications([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })

                axios.get(`${baseUrl}/patients`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then((res) => {
                    setDataPatients([...res.data.data])
                }).catch((error) => {
                    console.log(error)
                })
            }

            setFetchStatus(false)
        }


    }, [fetchStatus, setFetchStatus, userId, dataUser, token])


    return (
        <MainContext.Provider value={
            {
                baseUrl,
                djangoBaseUrl,
                navigate,
                dataUser,
                setDataUser,
                dataUsers,
                setDataUsers,
                dataPatients,
                setDataPatients,
                fetchStatus,
                setFetchStatus,
                currentId,
                setCurrentId,
                dataClassifications,
                setDataClassifications
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}