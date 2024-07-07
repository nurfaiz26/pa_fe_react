import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainContext } from "../context/mainContext";
import axios from "axios";
import Cookies from "js-cookie"

const Classification = () => {
    let { IdData } = useParams()
    const userId = Cookies.get('userId')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { baseUrl, djangoBaseUrl, navigate } = useContext(MainContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [input, setInput] = useState(
        {
            patientId: "",
            doctorId: "",
            date: "",
            ctscan: "",
            label: "",
            classification: "",
            accuracy: ""
        }
    )

    useEffect(() => {
        document.title = "Ichwunden - Classification"
        function fetctData() {
            axios.get(`${baseUrl}/class-results/${IdData}`).then((res) => {
                let data = res.data.data[0]
                setInput(
                    {
                        patientId: data.patientId,
                        doctorId: data.doctorId,
                        date: data.date,
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

        if (IdData) {
            fetctData()
        } else {
            setLoading(false)
        }

    }, [IdData, baseUrl])

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        if (name === "patientId") {
            setInput({ ...input, patientId: value })
        } else if (name === "label") {
            setInput({ ...input, label: value })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            patientId,
            doctorId,
            date,
            ctscan,
            label,
            classification,
            accuracy,
        } = input


        if (input.classification !== 'Nonctscan') {
            axios.post(`${baseUrl}/class-results`, { patientId, doctorId, date, ctscan, label, classification, accuracy })
                .then((res) => {
                    setError(null)
                    navigate(`/dashboard`)
                    console.log(res)
                    window.location.reload()
                }).catch((error) => {
                    setError('input error')
                    console.log(error)
                })
        } else {
            setError("Upload CT-Scan Image Only!")
        }

    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = async (event) => {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData()
        const timeNow = new Date()
        const dateNow = `${timeNow.getFullYear()}-${timeNow.getMonth()}-${timeNow.getDate()}`
        let uploadRes
        let djangoRes
        let djangoReq

        if (selectedFile !== null) {
            formData.append(
                "ctscan",
                selectedFile,
                selectedFile.name
            )

            try {
                uploadRes = await axios.post(`${baseUrl}/upload`, formData)
                setError(null)
                if (uploadRes.status === 200) {
                    djangoReq = {
                        ctscanUrl: await uploadRes.data.url
                    }
                } else {
                    setError("error upload file/file too large max 3MB")
                    console.log(error)
                    setLoading(false)
                }

            } catch (error) {
                setError("error upload file/file too large max 3MB")
                console.log(error)
                setLoading(false)
            }

            try {
                djangoRes = await axios.post(`${djangoBaseUrl}/classification/`, djangoReq)
                setError(null)

                if (uploadRes.status === 200) {
                    setInput(
                        {
                            ctscan: await djangoRes.data.ctscanUrl,
                            accuracy: await djangoRes.data.accuracy,
                            classification: await djangoRes.data.result,
                            doctorId: userId,
                            date: dateNow
                        }
                    )
                } else {
                    setError("error upload file/file too large max 3MB")
                    console.log(error)
                    setLoading(false)
                }
                setLoading(false)
            } catch (error) {
                setError("error django api/file too large max 3MB")
                console.log(error)
                setLoading(false)
            }

        } else {
            setError("error upload image")
            setLoading(false)
            console.log(error)
        }

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
                                <p className="text-secondary">Classification Form</p>
                            </Link>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleFileUpload}>
                                <div>
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="file_input"
                                    >
                                        Upload CT-Scan
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Classify</button>
                                {loading ?
                                    <>
                                        <div className="flex flex-wrap justify-center">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    </>
                                    :
                                    <></>
                                }
                            </form>
                            <hr className="my-2" />
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <input
                                    type={"hidden"}
                                    name="patientId"
                                    id="patientId"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Patient Id"
                                    onChange={handleChange}
                                    value={input.patientId}
                                    required
                                />
                                {input.ctscan !== "" &&
                                    <div>
                                        <img
                                            className="h-auto w-full rounded-lg"
                                            src={input.ctscan}
                                            alt="ct-scan"
                                        />
                                    </div>
                                }
                                <div className="grid grid-cols-2">
                                    <div
                                        htmlFor="patientId"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Classification
                                    </div>
                                    {String(input.classification) === "Nonctscan" ?
                                        <>
                                            <div className="block mb-2 text-sm font-medium text-red-500 dark:text-white">
                                                : Not a CT-Scan Image!
                                            </div>
                                        </> :
                                        <>
                                            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {`: ${input.classification} ${parseFloat(input.accuracy).toFixed(2)}%`}
                                            </div>
                                        </>
                                    }
                                </div>
                                <div>
                                    <label
                                        htmlFor="patientId"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Patient Id
                                    </label>
                                    <input
                                        type={"text"}
                                        name="patientId"
                                        id="patientId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Patient Id"
                                        onChange={handleChange}
                                        value={input.patientId}
                                        required
                                    />
                                </div>
                                <div>
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
                                {error &&
                                    <>
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </>
                                }
                                <button type={"submit"} className="w-full text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Classification