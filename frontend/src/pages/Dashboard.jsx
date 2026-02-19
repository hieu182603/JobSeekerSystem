
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    FileText,
    Eye,
    Calendar,
    TrendingUp,
    Users,
    Home,
    Briefcase,
    BarChart3,
    Settings,
    Bell,
    MessageSquare,
    ChevronRight,
    Search,
    Image as ImageIcon
} from 'lucide-react';

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState(null);
    const [activeMenu, setActiveMenu] = useState('home');

    useEffect(() => {
        if (user) {
            setProfile(user);
        }
    }, [user]);

    // Hardcoded stats for now as no backend endpoints exist
    const stats = [
        { label: 'Tổng số hồ sơ', value: '1,240', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', change: '+8%' },
        { label: 'Lượt xem hồ sơ', value: '5,820', icon: Eye, color: 'text-green-500', bg: 'bg-green-50', change: '+12%' },
        { label: 'Phỏng vấn', value: '45', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50', change: '+5%' },
        { label: 'Tỷ lệ thuyết đi', value: '3.2%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50', change: '+2%' }
    ];

    const notifications = [
        {
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            title: 'Cập nhật chính sách mới',
            description: 'Từ ngày 01/03/2024, hệ thống sẽ cập nhật các chính sách mới về quy định tuyển dụng. Vui lòng xem chi tiết và tuân thủ theo các quy định mới này.',
            time: '2 giờ trước'
        },
        {
            icon: Calendar,
            color: 'text-green-500',
            bg: 'bg-green-50',
            title: 'Gửi bạn gợi ý và ưu tiên thương hiệu',
            description: 'Nền tảng giúp bạn nâm nhanh và toàn diện các công cụ và hướng dẫn để tối ưu hóa thương hiệu với chỉ 3 bước đơn giản.',
            time: '5 giờ trước'
        },
        {
            icon: FileText,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            title: 'Mẹo tuyển dụng hiệu quả',
            description: 'Khám phá 5 chiến lược tuyển dụng hiệu quả để thu hút ứng viên chất lượng cao cho doanh nghiệp của bạn.',
            time: '1 ngày trước'
        },
        {
            icon: Bell,
            color: 'text-cyan-500',
            bg: 'bg-cyan-50',
            title: 'Tín năng cải tiến hệ thống',
            description: 'Phiên bản mới ngày 15/02/2024 đã có mặt với nhiều cải tiến về giao diện và tốc độ xử lý.',
            time: '3 ngày trước'
        }
    ];

    const campaigns = [
        {
            title: 'Tuyển dụng Software Engineer 2024',
            views: '3.2k lượt',
            applicants: '156 ứng viên',
            image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200',
            tag: 'ĐANG CHẠY'
        },
        {
            title: 'Branding: Mở trường hội việc dụng dễng',
            views: '2.8k lượt',
            applicants: '89 ứng viên',
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200',
            tag: 'ĐANG CHẠY'
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <Briefcase className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-lg">Recruit Pro</span>
                </div>

                <nav className="space-y-1">
                    <button
                        onClick={() => setActiveMenu('home')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === 'home' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Home size={20} />
                        <span className="font-medium">Tổng quan</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu('candidates')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === 'candidates' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Users size={20} />
                        <span className="font-medium">Tìm tuyển dụng</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu('jobs')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === 'jobs' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Briefcase size={20} />
                        <span className="font-medium">Quản lý ứng viên</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu('analytics')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === 'analytics' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <BarChart3 size={20} />
                        <span className="font-medium">Quản lý quảng cáo</span>
                    </button>
                    <button
                        onClick={() => setActiveMenu('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeMenu === 'settings' ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Báo cáo theo quá</span>
                    </button>
                </nav>

                <div className="mt-auto pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {profile?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{profile?.name || 'User'}</p>
                            <p className="text-xs text-gray-500">LeMint Tech</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm ứng viên theo tên, vị trí..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Bell size={22} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <MessageSquare size={22} />
                        </button>
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </header>

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Chào mừng trở lại!</h1>
                        <p className="text-gray-600">Hôm nay có 45 ứng viên mới đang chờ bạn xem xét</p>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.bg} p-3 rounded-lg`}>
                                        <stat.icon className={stat.color} size={24} />
                                    </div>
                                    <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Quản lý quảng cáo</h2>
                                    <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">
                                        Tất cả chiến dịch
                                    </button>
                                </div>

                                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-8 text-center mb-6">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ImageIcon className="text-cyan-500" size={32} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Tải lên Banner / Poster quảng cáo mới</h3>
                                    <p className="text-sm text-gray-600 mb-4">PNG, JPEG, PDF (Kích thước tối đa: 5MB). Tỷ lệ khuyến nghị: 16:9 </p>
                                    <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                                        Chọn tệp tin
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">CHIẾN DỊCH ĐANG CHẠY</h3>
                                    <div className="space-y-4">
                                        {campaigns.map((campaign, index) => (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <img
                                                    src={campaign.image}
                                                    alt={campaign.title}
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                                                            {campaign.tag}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Eye size={14} />
                                                            {campaign.views}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users size={14} />
                                                            {campaign.applicants}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Thông báo hệ thống</h2>
                                <div className="space-y-4">
                                    {notifications.map((notification, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <div className="flex gap-3">
                                                <div className={`${notification.bg} p-2 rounded-lg h-fit`}>
                                                    <notification.icon className={notification.color} size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm text-gray-900 mb-1">
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                        {notification.description}
                                                    </p>
                                                    <button className="text-xs text-cyan-500 hover:text-cyan-600 font-medium">
                                                        Xem toàn bộ thông báo
                                                    </button>
                                                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
