import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { MainContext } from "../context/mainContext";

const Login = () => {
    const { baseUrl, navigate } = useContext(MainContext)

    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = "Ichwunden - Login"
    }, [])

    const handleChange = (event) => {

        let value = event.target.value
        let name = event.target.name

        setInput({ ...input, [name]: value })
    }

    const handleLogin = (event) => {
        event.preventDefault()

        let { username, password } = input

        if (username !== "" && password !== "") {
            axios.post(`${baseUrl}/login`, { username, password })
                .then((res) => {
                    let { token } = res.data
                    let { data } = res.data

                    setError(null)

                    Cookies.set('token', token)
                    Cookies.set('userId', data.userId)
                    Cookies.set('username', data.username)
                    Cookies.set('role', data.role)
                    Cookies.set('name', data.name)
                    Cookies.set('email', data.email)
                    navigate('/dashboard')
                }).catch(error => {
                    console.log(error)
                    setError("Credentials not valid!")
                })
        } else {
            setError("Input yang benar!")
        }

    }

    return (
        <>
            <div className="grid sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Link
                                to={"#"}
                                className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                <img
                                    className="w-8 h-8 mr-2"
                                    src={require('../assets/images/app-logo.png')}
                                    alt="logo"
                                />
                                <p className="text-secondary">ICHWUNDEN LOGIN</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {error &&
                                    <>
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </>
                                }
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="m-6 lg:m-10">
                    <img
                        src={require('../assets/images/dashboard-img.png')}
                        alt="dashboard-img"
                        className="w-full"
                    />
                </div>
            </div>
        </>
    )
}

export default Login