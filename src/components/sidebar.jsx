import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { MainContext } from "../context/mainContext";

const Sidebar = () => {
    const { navigate } = useContext(MainContext)
    const [mobileNavbarShow, setMobileNavbarShow] = useState(false)
    const location = useLocation();
    const route = location.pathname
    const activeLink = "flex w-full items-center p-2 text-white rounded-lg dark:text-white bg-tersier hover:bg-tersier-dark"
    const nonActiveLink = "flex w-full items-center p-2 text-white rounded-lg dark:text-white hover:bg-secondary-dark"

    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                    setMobileNavbarShow(true)
                }}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={mobileNavbarShow ?
                    "fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0"
                    : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                }
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-secondary dark:bg-gray-800">
                    <button
                        type="button"
                        className="flex items-center p-2 -mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-tersier focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={() => {
                            setMobileNavbarShow(false)
                        }}
                    >

                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>


                    </button>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to={"/dashboard"}
                                className="flex items-center p-2 text-white rounded-lg dark:text-white"
                            >
                                <img
                                    src={require('../assets/images/logo.png')}
                                    alt="logo"
                                    className="object-cover"
                                />
                            </Link>
                            <hr className="my-2" />
                        </li>
                        <li>
                            <Link
                                to={"/dashboard"}
                                className={route === "/dashboard" ? activeLink : nonActiveLink}
                            >
                                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                </svg>

                                <span className="ms-3">Classification History</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/classification"}
                                className={route === "/classification" ? activeLink : nonActiveLink}
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 18"
                                >
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-white">Classification</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/profile"}
                                className={route === "/profile" ? activeLink : nonActiveLink}
                            >
                                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                                </svg>


                                <span className="flex-1 ms-3 whitespace-nowrap text-white">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary-dark dark:hover:bg-gray-700 group"
                                onClick={() => {
                                    Cookies.remove('token')
                                    Cookies.remove('userId')
                                    Cookies.remove('username')
                                    Cookies.remove('role')
                                    Cookies.remove('name')
                                    Cookies.remove('email')
                                    navigate('/')
                                }}
                            >
                                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                </svg>

                                <span className="flex ms-3 whitespace-nowrap text-white">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar