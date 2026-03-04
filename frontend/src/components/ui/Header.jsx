
import { Menu, X, Bell, Settings as SettingsIcon, Search, Rocket, LogOut, User, ChevronDown, FileText, ClipboardList } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const ROLE_LABEL = {
    ADMIN: 'Quản trị viên',
    EMPLOYER: 'Nhà tuyển dụng',
    JOB_SEEKER: 'Ứng viên',
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const notificationRef = useRef(null);
    const bellRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target) &&
                bellRef.current && !bellRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOut();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 min-w-0 pr-4">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                            <Rocket className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">RecruitHub</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 pl-4">
                        <Link to="/jobs" className="font-medium text-gray-800 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Tìm việc làm</Link>
                        {user?.role === 'JOB_SEEKER' && (
                            <>
                                <Link to="/cv-upload" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">CV của tôi</Link>
                                <Link to="/my-applications" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Việc đã ứng tuyển</Link>
                            </>
                        )}
                        {(!user || user?.role === 'EMPLOYER' || user?.role === 'ADMIN') && (
                            <>
                                <a href="#" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Công ty</a>
                                <a href="#" className="font-medium text-gray-600 hover:text-cyan-500 text-sm lg:text-base whitespace-nowrap">Blog</a>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {user ? (
                            <>
                                {/* Search */}
                                <div className="hidden lg:block relative mr-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        className="w-[200px] pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm"
                                    />
                                </div>

                                {/* Bell */}
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

                                {/* Settings */}
                                <Link to="/profile" className="hidden sm:block p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                    <SettingsIcon size={20} />
                                </Link>

                                {/* User menu */}
                                <div className="relative hidden sm:block" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                                            {user.name?.charAt(0)?.toUpperCase() || <User size={16} />}
                                        </div>
                                        <div className="hidden lg:block text-left">
                                            <p className="text-sm font-medium text-gray-900 leading-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500">{ROLE_LABEL[user.role] || user.role}</p>
                                        </div>
                                        <ChevronDown size={14} className="text-gray-400 hidden lg:block" />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-cyan-50 text-cyan-700 rounded-full font-medium">
                                                    {ROLE_LABEL[user.role] || user.role}
                                                </span>
                                            </div>
                                            {user.role === 'JOB_SEEKER' ? (
                                                <>
                                                    <Link to="/my-applications" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                        <ClipboardList size={15} /> Việc đã ứng tuyển
                                                    </Link>
                                                    <Link to="/cv-upload" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                        <FileText size={15} /> CV của tôi
                                                    </Link>
                                                </>
                                            ) : (
                                                <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                    <User size={15} /> Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <SettingsIcon size={15} /> Cài đặt
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut size={15} /> Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
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
                        <Link to="/jobs" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-medium text-gray-800 hover:bg-gray-50 rounded-lg">Tìm việc làm</Link>
                        {user?.role === 'JOB_SEEKER' ? (
                            <>
                                <Link to="/cv-upload" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">CV của tôi</Link>
                                <Link to="/my-applications" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Việc đã ứng tuyển</Link>
                            </>
                        ) : (
                            <>
                                <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Công ty</a>
                                <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Blog</a>
                            </>
                        )}
                        {user ? (
                            <div className="pt-2 border-t border-gray-100 space-y-1">
                                <div className="px-3 py-2">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{ROLE_LABEL[user.role] || user.role}</p>
                                </div>
                                {user.role === 'JOB_SEEKER' ? (
                                    <>
                                        <Link to="/my-applications" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Việc đã ứng tuyển</Link>
                                        <Link to="/cv-upload" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">CV của tôi</Link>
                                    </>
                                ) : (
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Dashboard</Link>
                                )}
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Cài đặt</Link>
                                <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">Đăng xuất</button>
                            </div>
                        ) : (
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
