import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const [state, setState] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleLogOut = () => {
        signOut(auth)
            .then(user => navigate('/'))
            .catch(error => console.log(error))
    }

    const userNavigation = <>
        {
            user && <div>
                <li>
                    <Link
                        className="flex items-center"
                        to={`/recommendations-for-me/${user?.email}`}>
                        <FaUser className="mr-2" />
                        Recommendations For Me</Link>
                </li>
                <li>
                    <Link
                        className="flex items-center"
                        to={`/my-recommendations/${user?.email}`}>
                        <FaUser className="mr-2" />
                        My Recommendations</Link>
                </li>
                <li>
                    <Link
                        className="flex items-center"
                        to={`/my-queries?email=${user?.email}`}>
                        <FaUser className="mr-2" />
                        My Queries</Link>
                </li>

                <li><Link className="btn btn-sm mt-4 bg-yellow-500" onClick={handleLogOut}>Logout</Link></li>
            </div>
        }
    </>

    const navigation = <>
        <li><Link className="hover" to='/'>Home</Link></li>
        <li><Link className="hover" to='/queries'>Queries</Link></li>
    </>

    function navLogo() {
        <>
            {
                user ? <div className="flex items-center">
                    <Link onClick={handleLogOut} className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">Log Out</Link>
                    <div className="avatar ml-4">
                        <div className="w-12 rounded-full">
                            <img referrerPolicy="no-referrer" src={user.photoURL} />
                        </div>
                    </div>
                </div>
                    :
                    <Link to='login' className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">Login</Link>
            }
        </>
    }

    return (
        <>

            <nav className="bg-white sticky top-0 w-full border-b md:border-0 md:static">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to='/'>
                            <img
                                src={logo}
                                width={70}
                            />
                        </Link>
                        <div className="md:hidden">
                            <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="justify-center items-center space-y-8 md:flex md:space-x-4 md:space-y-0">
                            {navigation}
                            <div className={`flex items-center ${state ? 'block' : 'hidden'}`}>
                                {
                                    user ? <div className="flex items-center">
                                        {userNavigation}
                                    </div>
                                        :
                                        <Link to='login' className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">Login</Link>
                                }
                            </div>
                        </ul>
                    </div>
                    <div className="hidden md:inline-block">
                        {
                            user ? <div className="flex items-center">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-primary">My Account</div>
                                    <ul tabIndex={0} className="dropdown-content menu z-50 p-2 shadow bg-base-100 rounded-box w-fit mt-2">
                                        {userNavigation}
                                    </ul>
                                </div>

                                <div className="avatar ml-4">
                                    <div className="w-12 rounded-full">
                                        <img referrerPolicy="no-referrer" src={user.photoURL} />
                                    </div>
                                </div>
                            </div>
                                :
                                <Link to='login' className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;