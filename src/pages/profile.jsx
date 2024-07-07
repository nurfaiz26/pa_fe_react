import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import Cookies from "js-cookie"

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { baseUrl, navigate } = useContext(MainContext)
    const [input, setInput] = useState(
        {
            name: "",
            role: ""
        }
    )
    const userId = Cookies.get('userId')
    const email = Cookies.get('email')
    const username = Cookies.get('username')

    useEffect(() => {
        document.title = "Ichwunden - Profile"
        function fetctData() {
            axios.get(`${baseUrl}/users/${userId}`).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        name: data.name,
                        role: data.role
                    }
                )
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setError("Update error!")
                setLoading(false)
            })
        }
        fetctData()

    }, [userId, baseUrl])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "name") {
            setInput({ ...input, name: value })
        } else if (name === "role") {
            setInput({ ...input, role: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let {
            name,
            role
        } = input

        axios.patch(`${baseUrl}/users/${userId}`, { name, role })
            .then((res) => {
                navigate(`/profile`)
                window.location.reload()
                alert("Update success!");
            }).catch((error) => {
                alert("Update failed " + error);
            })
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error)
    }


    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                <p className="text-secondary">Profile</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type={"text"}
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Name"
                                        onChange={handleChange}
                                        value={input.name}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value={input.role} selected>{input.role ? input.role : "--Masukkan Label--"}</option>
                                        <option value={"Doctor"}>Doctor</option>
                                        <option value={"Expert"}>Expert</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type={"text"}
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        value={username}
                                        disabled
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type={"email"}
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="email"
                                        onChange={handleChange}
                                        value={email}
                                        required
                                        disabled
                                    />
                                </div>
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile