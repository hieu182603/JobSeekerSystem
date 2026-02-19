
import { Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2 min-w-0">
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 flex-shrink-0" />
                        <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">Việc Làm VN</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">Tuyển dụng</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">Về chúng tôi</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">Blog</a>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link to="/login" className="hidden sm:block px-3 sm:px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                            Đăng nhập
                        </Link>
                        <Link to="/register" className="px-3 sm:px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors whitespace-nowrap">
                            Đăng ký
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <nav className="md:hidden pb-4 space-y-3">
                        <a href="#" className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Tuyển dụng</a>
                        <a href="#" className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Về chúng tôi</a>
                        <a href="#" className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Blog</a>
                        <Link to="/login" className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Đăng nhập</Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
