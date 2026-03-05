
import { Briefcase, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 flex-shrink-0" />
                            <span className="text-lg sm:text-xl font-bold text-white">Việc Làm VN</span>
                        </div>
                        <p className="text-xs sm:text-sm mb-4 leading-relaxed">
                            Nền tảng tuyển dụng hàng đầu Việt Nam, kết nối ứng viên tài năng với các công ty uy tín.
                        </p>
                        <div className="flex gap-2 sm:gap-3">
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors flex-shrink-0">
                                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors flex-shrink-0">
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors flex-shrink-0">
                                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors flex-shrink-0">
                                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Về chúng tôi</h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Giới thiệu</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Liên hệ</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Chính sách bảo mật</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Ứng viên</h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li><Link to="/jobs" className="hover:text-cyan-400 transition-colors">Tìm việc làm</Link></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Công ty hàng đầu</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Cẩm nang nghề nghiệp</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Công cụ tạo CV</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Nhà tuyển dụng</h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Đăng tin tuyển dụng</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Tìm ứng viên</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Bảng giá dịch vụ</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Liên hệ hợp tác</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 sm:pt-8 text-xs sm:text-sm text-center">
                    <p>&copy;Bản quyền thuộc về Công ty cổ phần Việc Làm  Việt Nam.</p>
                </div>
            </div>
        </footer>
    );
}
