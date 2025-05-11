import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import DarkModeToggle from './DarkModeToggle';
import logo from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';

const NewNavbar = () => {
    
    const { user } = useAuth()

    return (
        <nav className="bg-white border-red-500 border-b-[1px] sticky top-0 z-40">
            <div className="w-full md:max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img className="h-14 w-auto" src={logo} alt="Logo" />
                        </Link>
                    </div>

                    {/* Middle: Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/queries"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Queries
                        </Link>
                    </div>

                    {/* Right: User dropdown and Dark mode toggle */}
                    <div className="flex items-center space-x-4">

                        {
                            user ? <>
                            <UserDropdown />
                            <img
                                className="h-10 w-10 rounded-full"
                                src={user?.photoURL}
                                alt="User photo"
                            />
                        </> : <Link
                            to='/login'
                            className="flex items-center py-1 px-3 cursor-pointer text-black bg-yellow-400 rounded-md"
                        >
                            Login
                        </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NewNavbar;