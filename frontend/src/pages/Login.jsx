
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn(email, password, rememberMe);

        if (result.error) {
            setError(result.error.message);
            setLoading(false);
        } else {
            // Success -> Redirect to dashboard
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-200 to-cyan-300 hidden md:flex flex-col items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-30"></div>
                <div className="absolute bottom-12 right-12 w-40 h-40 bg-white rounded-full opacity-20"></div>

                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 relative z-10">
                    <img
                        src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Professional"
                        className="w-64 h-80 object-cover rounded-lg"
                    />
                </div>

                <div className="text-center max-w-md relative z-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Kiến tạo tương lai tại Việt Nam
                    </h2>
                    <p className="text-gray-600">
                        Hơn 50,000+ cơ hội việc làm đang chờ đón bạn.
                        Đăng nhập để tiếp tục hành trình sự nghiệp.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h1>
                    <p className="text-gray-600 mb-8">Vui lòng nhập thông tin để truy cập tài khoản</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Địa chỉ Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                required
                            />
                        </div>

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
                                    placeholder="Nhập mật khẩu của bạn"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2 cursor-pointer"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-gray-600">Ghi nhớ đăng nhập</span>
                            </label>
                            <button type="button" className="text-cyan-500 hover:text-cyan-600">
                                Quên mật khẩu?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập ngay'}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Chưa có tài khoản?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-cyan-500 hover:text-cyan-600 font-medium"
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
