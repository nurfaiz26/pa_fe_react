import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import Cookies from "js-cookie"
import Search from "../components/search";

const Dashboard = () => {
    const { dataClassifications, baseUrl, navigate, setCurrentId, search } = useContext(MainContext)

    const userId = Cookies.get("userId")
    const token = Cookies.get("token")

    const [dataUser, setDataUser] = useState(
        {
            userId: "",
            name: "",
            role: "",
            username: ""
        }
    )

    useEffect(() => {
        document.title = "Ichwunden - Dashboard"

        axios.get(`${baseUrl}/users/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            let data = res.data.data[0]
            setDataUser(
                {
                    userId: data.userId,
                    name: data.name,
                    role: data.role,
                    username: data.username
                }
            )
        }).catch((error) => {
            console.log(error)
        })
    }, [baseUrl, userId, token])

    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)
        axios.delete(`${baseUrl}/class-results/${idData}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {
            window.location.reload()
        })
    }

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)

        setCurrentId(idData)

        navigate(`/detail/${idData}`)
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="relative overflow-x-auto">
                    <p className="font-bold text-xl ms-3">Hi, {String(dataUser.role) === "Doctor" ? "Dr. " : ""} {dataUser.name}!</p>
                    <div className="grid lg:grid-cols-3 m-2">
                        <div className="lg:col-span-2">
                            <Search from={'dahsboard'} />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left my-3 rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    PatientId
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Patient
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Label
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataClassifications !== null && dataClassifications.map((res) => {
                                let doctorId = 0
                                doctorId = res.doctorId
                                if (Number(doctorId) === Number(userId)) {
                                    if (String(search) === '') {
                                        return (
                                            <>
                                                <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td className="px-6 py-4 text-black">{res.date}</td>
                                                    <td className="px-6 py-4 text-black">{res.patientId}</td>
                                                    <td className="px-6 py-4 text-black">{res.patientName}</td>
                                                    <td className="px-6 py-4 text-black">
                                                        <img src={res.ctscan} alt="ct-scan" className="h-auto max-w-24 rounded-lg" />
                                                    </td>
                                                    <td className="px-6 py-4 text-black">{res.classification}</td>
                                                    <td className="px-6 py-4 text-black">{res.label}</td>
                                                    <td className="px-6 py-4 text-black">{res.name}</td>

                                                    <td className="px-6 py-4 flex items-center mt-5">
                                                        <button
                                                            onClick={handleEdit}
                                                            value={res.id}
                                                            className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                        >
                                                            Detail
                                                        </button>
                                                        <button
                                                            onClick={handleDelete}
                                                            value={res.id}
                                                            className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-red-700 font-bold"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    } else {
                                        if (String(res.patientId) === String(search)) {
                                            return (
                                                <>
                                                    <tr className="bg-primary border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="px-6 py-4 text-black">{res.date}</td>
                                                        <td className="px-6 py-4 text-black">{res.patientId}</td>
                                                        <td className="px-6 py-4 text-black">{res.patientName}</td>
                                                        <td className="px-6 py-4 text-black">
                                                            <img src={res.ctscan} alt="ct-scan" className="h-auto max-w-24 rounded-lg" />
                                                        </td>
                                                        <td className="px-6 py-4 text-black">{res.classification}</td>
                                                        <td className="px-6 py-4 text-black">{res.label}</td>
                                                        <td className="px-6 py-4 text-black">{res.name}</td>

                                                        <td className="px-6 py-4 flex items-center mt-5">
                                                            <button
                                                                onClick={handleEdit}
                                                                value={res.id}
                                                                className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-orange-500 font-bold"
                                                            >
                                                                Detail
                                                            </button>
                                                            <button
                                                                onClick={handleDelete}
                                                                value={res.id}
                                                                className="bg-primary hover:bg-primary-dark rounded-lg p-1 m-1 text-red-700 font-bold"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                </>
                                            )
                                        }
                                    }
                                } else {
                                    return (
                                        <>
                                        </>
                                    )
                                }
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard