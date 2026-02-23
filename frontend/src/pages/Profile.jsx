import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Briefcase, Camera, Building, Mail, Phone, MapPin, ChevronLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Profile() {
    const { user, signIn, signOut } = useAuth(); // We might need a method to manually update context user, but for now we'll rely on local state or reload.
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('general');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        avatar: '',
        skills: '',
        experience: '',
        education: '',
        companyName: '',
        companyDescription: '',
        companyWebsite: ''
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
                avatar: user.avatar || '',
                skills: user.skills ? user.skills.join(', ') : '',
                experience: user.experience || '',
                education: user.education || '',
                companyName: user.companyName || '',
                companyDescription: user.companyDescription || '',
                companyWebsite: user.companyWebsite || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('token');
            const dataToUpdate = { ...formData };
            // parse skills string to array
            if (dataToUpdate.skills) {
                dataToUpdate.skills = dataToUpdate.skills.split(',').map(s => s.trim()).filter(Boolean);
            }

            const res = await axios.put(`${API_URL}/api/users/profile`, dataToUpdate, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: 'Cập nhật hồ sơ thành công!' });
            // Optional: you might want to update the AuthContext's user object here 
            // but simply showing success is good for now.
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSavePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/api/users/change-password`, {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Không thể đổi mật khẩu.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h1>
                                <p className="text-sm text-gray-500">Quản lý hồ sơ và tùy chọn bảo mật của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Sidebar Tabs */}
                    <div className="md:col-span-1 space-y-1">
                        <button
                            onClick={() => { setActiveTab('general'); setMessage({ type: '', text: '' }) }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'general'
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <User size={18} />
                            Hồ sơ cá nhân
                        </button>

                        {user?.role === 'JOB_SEEKER' && (
                            <button
                                onClick={() => { setActiveTab('professional'); setMessage({ type: '', text: '' }) }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'professional'
                                        ? 'bg-cyan-50 text-cyan-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Briefcase size={18} />
                                Thông tin nghề nghiệp
                            </button>
                        )}

                        {user?.role === 'EMPLOYER' && (
                            <button
                                onClick={() => { setActiveTab('company'); setMessage({ type: '', text: '' }) }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'company'
                                        ? 'bg-cyan-50 text-cyan-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Building size={18} />
                                Thông tin công ty
                            </button>
                        )}

                        <button
                            onClick={() => { setActiveTab('security'); setMessage({ type: '', text: '' }) }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'security'
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Lock size={18} />
                            Bảo mật
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

                            {message.text && (
                                <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {message.text}
                                </div>
                            )}

                            {activeTab === 'general' && (
                                <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                                {formData.name.charAt(0) || 'U'}
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="text-white" size={24} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Ảnh đại diện</h3>
                                            <p className="text-sm text-gray-500 mt-1">Chấp nhận JPG, PNG dung lượng tối đa 2MB</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <User size={16} className="text-gray-400" /> Họ và tên
                                            </label>
                                            <input
                                                type="text" name="name"
                                                value={formData.name} onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Mail size={16} className="text-gray-400" /> Email <span className="text-xs text-gray-400 font-normal">(Không thể đổi)</span>
                                            </label>
                                            <input
                                                type="email" value={user?.email || ''} readOnly
                                                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Phone size={16} className="text-gray-400" /> Số điện thoại
                                            </label>
                                            <input
                                                type="tel" name="phone"
                                                value={formData.phone} onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-400" /> Địa chỉ
                                            </label>
                                            <input
                                                type="text" name="address"
                                                value={formData.address} onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button disabled={loading} type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-white font-medium rounded-xl hover:bg-cyan-600 transition-colors shadow-sm shadow-cyan-200">
                                            <Save size={18} /> Lưu thay đổi
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'professional' && (
                                <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Kỹ năng (Cánh nhau bằng dấu phẩy)</label>
                                        <input
                                            type="text" name="skills" placeholder="React, Node.js, Design..."
                                            value={formData.skills} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Kinh nghiệm làm việc</label>
                                        <textarea
                                            name="experience" rows={4} placeholder="Mô tả kinh nghiệm của bạn..."
                                            value={formData.अनुभव || formData.experience} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Học vấn</label>
                                        <textarea
                                            name="education" rows={3} placeholder="Trường đại học, chứng chỉ..."
                                            value={formData.education} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button disabled={loading} type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-white font-medium rounded-xl hover:bg-cyan-600 transition-colors shadow-sm shadow-cyan-200">
                                            <Save size={18} /> Lưu hồ sơ nghề nghiệp
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'company' && (
                                <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Tên công ty</label>
                                        <input
                                            type="text" name="companyName" placeholder="Tên doanh nghiệp của bạn"
                                            value={formData.companyName} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Website công ty</label>
                                        <input
                                            type="text" name="companyWebsite" placeholder="https://..."
                                            value={formData.companyWebsite} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Mô tả công ty</label>
                                        <textarea
                                            name="companyDescription" rows={5} placeholder="Giới thiệu về văn hóa, lĩnh vực hoạt động..."
                                            value={formData.companyDescription} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button disabled={loading} type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-white font-medium rounded-xl hover:bg-cyan-600 transition-colors shadow-sm shadow-cyan-200">
                                            <Save size={18} /> Cập nhật công ty
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'security' && (
                                <form onSubmit={handleSavePassword} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="max-w-md space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                                            <input
                                                type="password" name="oldPassword"
                                                value={passwordData.oldPassword} onChange={handlePasswordChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                            <input
                                                type="password" name="newPassword" minLength={6}
                                                value={passwordData.newPassword} onChange={handlePasswordChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                                required
                                            />
                                            <p className="text-xs text-gray-500">Yêu cầu tối thiểu 6 ký tự.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                                            <input
                                                type="password" name="confirmPassword" minLength={6}
                                                value={passwordData.confirmPassword} onChange={handlePasswordChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none"
                                                required
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button disabled={loading} type="submit" className="flex items-center justify-center gap-2 w-full px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                                                <Lock size={18} /> Đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
