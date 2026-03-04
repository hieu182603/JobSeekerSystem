
import { Briefcase, Menu, X, Bell, Settings as SettingsIcon, Search, Rocket } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { user } = useAuth();

    const notificationRef = useRef(null);
    const bellRef = useRef(null);

    // Hardcode generic user for UI display matching the mock
    const displayUser = user || { name: 'User' };

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target) &&
                bellRef.current && !bellRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2 min-w-0 pr-4">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                            <Rocket className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">RecruitHub</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 pl-4">
                        <a href="#" className="font-medium text-gray-800 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Việc làm</a>
                        <a href="#" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Hồ sơ</a>
                        <a href="#" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Công ty</a>
                        <a href="#" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Blog</a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Search input from Image */}
                        <div className="hidden lg:block relative mr-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm thông báo..."
                                className="w-[240px] pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <button
                                ref={bellRef}
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className={`relative p-2 rounded-full transition-colors ${isNotificationOpen ? 'bg-cyan-50 text-cyan-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                <Bell size={20} className={isNotificationOpen ? "fill-cyan-600" : ""} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                            </button>

                            {isNotificationOpen && (
                                <div ref={notificationRef}>
                                    <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />
                                </div>
                            )}
                        </div>

                        <button className="hidden sm:block p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <SettingsIcon size={20} />
                        </button>

                        <div className="hidden sm:block">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                        </div>

                        {!user && (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link to="/login" className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium">
                                    Đăng nhập
                                </Link>
                                <Link to="/register" className="px-3 py-2 text-sm bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition-colors">
                                    Đăng ký
                                </Link>
                            </div>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-2">
                        <a href="#" className="block px-3 py-2 font-medium text-gray-800 hover:bg-gray-50 rounded-lg">Việc làm</a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Hồ sơ</a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Công ty</a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Blog</a>
                        {!user && (
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                                <Link to="/login" className="text-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg">Đăng nhập</Link>
                                <Link to="/register" className="text-center px-4 py-2 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">Đăng ký</Link>
                            </div>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}
