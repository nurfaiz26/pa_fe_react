import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainContext } from "../context/mainContext";
import axios from "axios";

const Detail = () => {
    let { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { baseUrl, navigate } = useContext(MainContext)
    const [input, setInput] = useState(
        {
            patientName: "",
            ctscan: "",
            label: "",
            classification: "",
            accuracy: ""
        }
    )

    useEffect(() => {
        document.title = "Ichwunden - Detail"
        function fetctData() {
            axios.get(`${baseUrl}/class-results/${id}`).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        patientName: data.patientName,
                        ctscan: data.ctscan,
                        label: data.label,
                        classification: data.classification,
                        accuracy: data.accuracy
                    }
                )
                setLoading(false)
            }).catch((error) => {
                setError(error)
                setLoading(false)
            })
        }
        fetctData()

    }, [id, baseUrl])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "label") {
            setInput({ ...input, label: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let {
            label
        } = input


        if (id !== undefined) {
            axios.patch(`${baseUrl}/class-results/${id}`, { label })
                .then((res) => {
                    navigate(`/detail/${id}`)
                    window.location.reload()
                })
        }

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
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                <p className="text-secondary">Classification Form</p>
                            </Link>
                            <form className="col-span-2 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-3 gap-4">
                                    <img
                                        className="h-auto w-full rounded-lg"
                                        src={input.ctscan}
                                        alt="ct-scan"
                                    />
                                    <div className="col-span-2">
                                        <div className="grid grid-cols-2">
                                            <div
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Patient Name
                                            </div>
                                            <div
                                                className="block mb-2 text-sm text-gray-900 dark:text-white"
                                            >
                                                {`: ${input.patientName}`}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Classification
                                            </div>
                                            <div
                                                className="block mb-2 text-sm text-gray-900 dark:text-white"
                                            >
                                                {`: ${input.classification} (${parseFloat(input.accuracy).toFixed(2)}%)`}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="label"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Label
                                            </label>
                                            <select
                                                id="label"
                                                name="label"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                                onChange={handleChange}
                                            >
                                                <option value={input.label} selected>{input.label ? input.label : "--Masukkan Label--"}</option>
                                                <option value={"Subdural"}>Subdural</option>
                                                <option value={"Subarachnoid"}>Subarachnoid</option>
                                                <option value={"Intraparenchymal"}>Intraparenchymal</option>
                                                <option value={"Intraventicular"}>Intraventicular</option>
                                                <option value={"Epidural"}>Epidural</option>
                                                <option value={"Normal"}>Normal</option>
                                            </select>
                                        </div>
                                    </div>

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

export default Detail