import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import useAuth from '../../hooks/useAuth';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogOut = () => {
        signOut(auth)
            .then(user => {
                navigate('/');
                setIsOpen(false);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center py-1 px-3 cursor-pointer text-black bg-yellow-400 rounded-md"
            >
                My Account
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <Link
                            to={`/my-recommendations/${user?.email}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-200 "
                            onClick={() => setIsOpen(false)}
                        >
                            My Recommendations
                        </Link>
                        <Link
                            to={`/recommendations-for-me/${user?.email}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-200 "
                            onClick={() => setIsOpen(false)}
                        >
                            Recommendations For Me
                        </Link>
                        <Link
                            to={`/my-queries?email=${user?.email}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-200 "
                            onClick={() => setIsOpen(false)}
                        >
                            My Queries
                        </Link>
                        <hr />
                        <button
                            onClick={handleLogOut}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
