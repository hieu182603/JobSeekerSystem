
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState('candidate'); // 'candidate' | 'employer'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);

        const result = await signUp(email, password, fullName, userType);

        if (result.error) {
            setError(result.error.message);
            setLoading(false);
        } else {
            // Backend requires OTP verification. 
            // Show success message and redirect to Login (or OTP page if we had one)
            setSuccessMessage("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP và xác thực tài khoản.");
            setLoading(false);

            // Optional: Delay redirect to let user read message
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-100 via-cyan-50 to-white hidden md:flex flex-col items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-cyan-300 rounded-full opacity-15"></div>

                <div className="bg-teal-700 p-8 rounded-2xl shadow-2xl mb-8 relative z-10 w-80 h-80 flex items-center justify-center">
                    <img
                        src="https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Office"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                <div className="text-center max-w-md relative z-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Mở khóa cơ hội nghề nghiệp mới
                    </h2>
                    <p className="text-gray-600">
                        Hàng ngàn việc làm chất lượng và nhà tuyển dụng
                        uy tín đang chờ đón bạn tham gia cộng đồng lớn
                        nhất Việt Nam.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h1>
                    <p className="text-gray-600 mb-8">Bắt đầu hành trình tìm kiếm sự nghiệp của bạn ngay hôm nay</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                            {successMessage}
                        </div>
                    )}

                    <div className="flex gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setUserType('candidate')}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${userType === 'candidate'
                                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <User size={20} />
                            <span className="font-medium">Người tìm việc</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('employer')}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${userType === 'employer'
                                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <Briefcase size={20} />
                            <span className="font-medium">Nhà tuyển dụng</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Họ và tên
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Nhập họ và tên đầy đủ"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email công việc
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Xác nhận
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <input type="checkbox" className="mt-1 mr-2" required />
                            <p className="text-xs text-gray-600">
                                Tôi đồng ý với <span className="text-cyan-500">Điều khoản dịch vụ</span> và{' '}
                                <span className="text-cyan-500">Chính sách bảo mật</span> của ViecLam.vn
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký ngay'}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-cyan-500 hover:text-cyan-600 font-medium"
                            >
                                Đăng nhập
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
