import React, { useEffect, useState, useContext } from "react";
import { Modal } from "flowbite-react";
import axios from "axios";
import { MainContext } from "../context/mainContext";

const Landing = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)
    const [classRes, setClassResult] = useState(
        {
            ctscanUrl: "",
            probability: "",
            result: ""
        }
    )
    const [openModal, setOpenModal] = useState(false);
    const { baseUrl, djangoBaseUrl, navigate } = useContext(MainContext)

    useEffect(() => {
        document.title = "Ichwunden"
    }, [])

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setOpenModal(true)
        setloading(true)
        const formData = new FormData()
        let uploadRes
        let djangoRes
        let djangoReq

        if (selectedFile != null) {
            formData.append(
                "ctscan",
                selectedFile,
                selectedFile.name
            )

            try {
                uploadRes = await axios.post(`${baseUrl}/upload`, formData)
                setError(null)
                djangoReq = {
                    ctscanUrl: await uploadRes.data.url
                }
            } catch (error) {
                setError("error upload file/file too large max 3MB")
                console.log(error)
            }

            try {
                djangoRes = await axios.post(`${djangoBaseUrl}/classification/`, djangoReq)
                setClassResult(
                    {
                        ctscanUrl: await djangoRes.data.ctscanUrl,
                        probability: await djangoRes.data.probability,
                        result: await djangoRes.data.result
                    }
                )
                setloading(false)
                setError(null)
            } catch (error) {
                setError("error django api/file too large max 3MB")
                setloading(false)
                console.log(error)
            }
        } else {
            setloading(false)
            console.log("error upload image")
        }

    }

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="my-auto mx-16">
                    <div className="font-bold sm:text-2xl lg:text-5xl">
                        INTRACRANIAL HEMORRHAGE {"(ICH)"} DETECTION WITH VISION TRANSFORMER APP
                    </div>
                    <div className="mt-4 font-normal sm:text-lg lg:text-xl">
                        Membantu dokter dan ahli dalam proses klasifikasi ICH CT-Scan dengan metode Vision Transformer
                        Login untuk dapat menggunakan fitur lebih
                    </div>
                    <div className="mt-4">
                        <form className="" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-6">
                                <input
                                    className="col-span-5 sm:text-sm lg:text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input"
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={handleChange}
                                />
                                <button type={"submit"} className="ms-auto sm:size-10 lg:size-12 p-2 text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <img
                                        src={require('../assets/images/brain-icon.png')}
                                        alt="dashboard-img"
                                        className="m-auto h-fit"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                    <button onClick={() => { navigate('/login') }} className="w-full mt-4 text-white bg-secondary hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                </div>
                <div className="mx-auto my-10">
                    <img
                        src={require('../assets/images/dashboard-img.png')}
                        alt="dashboard-img"
                        className="h-fit"
                    />
                </div>
            </div>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Classification Result</Modal.Header>
                <Modal.Body>
                    {!error ?
                        <>
                            {!loading ?
                                <>
                                    <img
                                        src={classRes.ctscanUrl}
                                        alt="ctscan"
                                        className="mx-auto rounded-lg sm:h-36 lg:h-64"
                                    />
                                    {String(classRes.result) === "Nonctscan" ?
                                        <>
                                            <div className="mt-4 font-semibold text-center text-red-500 sm:text-lg lg:text-xl">
                                                Not a CT-Scan Image!
                                            </div>
                                        </> :
                                        <>
                                            <div className="mt-4 font-semibold text-center sm:text-lg lg:text-xl">
                                                {classRes.result}
                                            </div>
                                            <div className=" font-semibold text-center sm:text-lg lg:text-xl">
                                                {parseFloat(classRes.probability).toFixed(2)}%
                                            </div>
                                        </>
                                    }

                                </>
                                :
                                <>
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
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
                            }

                        </>
                        :
                        <>
                            <div className="mt-4 text-red-700 font-normal text-center sm:text-lg lg:text-xl">
                                {error}
                            </div>
                        </>
                    }

                </Modal.Body>
            </Modal>
        </>
    )
}

export default Landing