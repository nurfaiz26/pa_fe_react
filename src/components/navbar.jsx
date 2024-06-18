import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="bg-secondary border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to={"/"}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={require('../assets/images/logo.png')}
                            className="sm:h-8 lg:h-12"
                            alt="Flowbite Logo"
                        />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar