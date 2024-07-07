import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="bg-secondary border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap p-2 items-center justify-center mx-auto sm:p-4 lg:justify-start">
                    <Link
                        to={"/"}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={require('../assets/images/logo.png')}
                            className="h-8 sm:h-10 lg:h-12"
                            alt="App Logo"
                        />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar