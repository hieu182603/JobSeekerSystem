import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Briefcase, MapPin, Clock, ChevronRight, Loader2,
    FileText, Heart, User, Settings, LogOut, LayoutDashboard,
    CheckCircle2, Circle, Calendar, Building2, Filter, Search,
    ClipboardList, ChevronLeft, ChevronDown
} from 'lucide-react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const STATUS_CONFIG = {
    pending:   { label: 'Đang xem xét', color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
    interview: { label: 'Hẹn phỏng vấn', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
    accepted:  { label: 'Đã nhận', color: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
    rejected:  { label: 'Đã kết thúc', color: 'bg-gray-100 text-gray-500',    dot: 'bg-gray-400' },
};

const TABS = [
    { key: 'all',       label: 'Tất cả' },
    { key: 'pending',   label: 'Đang xem xét' },
    { key: 'interview', label: 'Phỏng vấn' },
    { key: 'done',      label: 'Đã kết thúc' },
];

const STEPS = ['Đã gửi', 'Xem hồ sơ', 'Phỏng vấn', 'Kết quả'];

function getStepIndex(status) {
    if (status === 'pending')   return 1;
    if (status === 'interview') return 2;
    if (status === 'accepted' || status === 'rejected') return 3;
    return 0;
}

function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const d = Math.floor(diff / 86400000);
    if (d === 0) return 'Hôm nay';
    if (d === 1) return 'Hôm qua';
    if (d < 30)  return `${d} ngày trước`;
    const m = Math.floor(d / 30);
    return `${m} tháng trước`;
}

function CompanyLogo({ company, avatar }) {
    if (avatar) return (
        <img src={`${API_URL}${avatar}`} alt={company}
            className="w-12 h-12 rounded-xl object-cover border border-gray-100 flex-shrink-0"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
    );
    const initials = (company || 'C').charAt(0).toUpperCase();
    const colors = ['bg-cyan-500','bg-violet-500','bg-emerald-500','bg-orange-400','bg-pink-500'];
    const color = colors[initials.charCodeAt(0) % colors.length];
    return (
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {initials}
        </div>
    );
}

function ProgressStepper({ status }) {
    const activeStep = getStepIndex(status);
    const isRejected = status === 'rejected';
    return (
        <div className="flex items-center gap-0 mt-4 w-full">
            {STEPS.map((step, i) => {
                const done = i <= activeStep;
                const active = i === activeStep;
                const stepColor = isRejected && i === activeStep ? 'bg-red-500 border-red-500' : done ? 'bg-cyan-500 border-cyan-500' : 'bg-white border-gray-300';
                const textColor = active ? (isRejected ? 'text-red-600 font-semibold' : 'text-cyan-600 font-semibold') : done ? 'text-cyan-500 font-medium' : 'text-gray-400';
                const lineColor = i < activeStep ? 'bg-cyan-500' : 'bg-gray-200';
                return (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-white text-xs ${stepColor}`}>
                                {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-gray-300" />}
                            </div>
                            <span className={`text-[10px] mt-1 whitespace-nowrap ${textColor}`}>{step}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`h-0.5 flex-1 mx-1 mb-4 ${lineColor}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function ApplicationCard({ app }) {
    const job = app.jobId || {};
    const recruiter = job.recruiterId || {};
    const companyName = recruiter.companyName || recruiter.name || 'Công ty';
    const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
    const city = job.location?.city || '';

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-cyan-200 transition-all">
            <div className="flex items-start gap-4">
                <CompanyLogo company={companyName} avatar={recruiter.avatarUrl || recruiter.avatar} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="min-w-0">
                            <Link
                                to={`/jobs/${job._id}`}
                                className="text-base font-bold text-gray-900 hover:text-cyan-600 transition-colors line-clamp-1"
                            >
                                {job.title || 'Vị trí không xác định'}
                            </Link>
                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="truncate">{companyName}</span>
                                {city && <><span className="text-gray-300 mx-1">•</span><MapPin className="w-3.5 h-3.5 flex-shrink-0" /><span className="truncate">{city}</span></>}
                            </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                            {cfg.label}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Đã ứng tuyển {timeAgo(app.createdAt)}</span>
                        {app.status === 'interview' && app.interviewDate && (
                            <span className="flex items-center gap-1 text-purple-600 font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                Phỏng vấn: {new Date(app.interviewDate).toLocaleDateString('vi-VN')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <ProgressStepper status={app.status} />

            {/* Interview notification */}
            {app.status === 'interview' && app.interviewDate && (
                <div className="mt-4 flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <span className="w-1.5 h-full min-h-[36px] bg-purple-400 rounded-full flex-shrink-0 mt-0.5"></span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-purple-800 mb-0.5">Phản hồi từ Nhà tuyển dụng</p>
                        <p className="text-xs text-purple-700">
                            Bạn có lịch phỏng vấn vào <strong>{new Date(app.interviewDate).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</strong>.
                        </p>
                    </div>
                </div>
            )}

            {/* Rejected message */}
            {app.status === 'rejected' && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 italic">
                        Cảm ơn bạn đã quan tâm. Vị trí này hiện đã được lấp đầy hoặc tạm dừng tuyển dụng. Chúng tôi sẽ lưu hồ sơ của bạn cho các cơ hội sắp tới.
                    </p>
                </div>
            )}
        </div>
    );
}

const PER_PAGE = 5;

export default function MyApplications() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/applications/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setApplications(res.data.applications || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = applications.filter(app => {
        const job = app.jobId || {};
        const recruiter = job.recruiterId || {};
        const matchTab =
            activeTab === 'all' ? true :
            activeTab === 'done' ? (app.status === 'rejected' || app.status === 'accepted') :
            app.status === activeTab;
        const q = search.toLowerCase();
        const matchSearch = !q ||
            (job.title || '').toLowerCase().includes(q) ||
            (recruiter.companyName || recruiter.name || '').toLowerCase().includes(q);
        return matchTab && matchSearch;
    });

    const tabCounts = {
        all: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        interview: applications.filter(a => a.status === 'interview').length,
        done: applications.filter(a => a.status === 'rejected' || a.status === 'accepted').length,
    };

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const handleTabChange = (key) => { setActiveTab(key); setPage(1); };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-3 px-4">
                <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <Link to="/" className="hover:text-cyan-600 transition-colors">Trang chủ</Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-700 font-medium">Việc đã ứng tuyển</span>
                </div>
            </div>

            <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* ── LEFT Sidebar ── */}
                    <div className="lg:col-span-1 space-y-4">

                        {/* Profile card */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                    <p className="text-xs text-cyan-600 font-medium">Hồ sơ: Hoàn thiện 80%</p>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" />
                            </div>
                        </div>

                        {/* Nav */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {[
                                { to: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Bảng điều khiển' },
                                { to: '/my-applications', icon: <ClipboardList className="w-4 h-4" />, label: 'Việc đã ứng tuyển', active: true },
                                { to: '/cv-upload', icon: <FileText className="w-4 h-4" />, label: 'CV của tôi' },
                                { to: '/profile', icon: <User className="w-4 h-4" />, label: 'Hồ sơ cá nhân' },
                                { to: '/profile', icon: <Settings className="w-4 h-4" />, label: 'Cài đặt' },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.to}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm border-b border-gray-50 last:border-0 transition-colors ${
                                        item.active
                                            ? 'bg-cyan-50 text-cyan-700 font-semibold border-l-2 border-l-cyan-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Premium upsell */}
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-white shadow-md">
                            <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-1">Gói thành viên</p>
                            <p className="text-lg font-bold mb-2">Nâng cấp Pro</p>
                            <p className="text-xs opacity-80 mb-4 leading-relaxed">Nhận phản hồi sớm nhất từ các nhà tuyển dụng hàng đầu.</p>
                            <button className="w-full py-2 bg-white text-cyan-600 rounded-xl text-xs font-bold hover:bg-cyan-50 transition-colors">
                                Nâng cấp ngay
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT Main ── */}
                    <div className="lg:col-span-3 space-y-5">

                        {/* Page header */}
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Việc làm đã ứng tuyển</h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Theo dõi trạng thái và phản hồi từ {applications.length} đơn ứng tuyển gần nhất.
                            </p>
                        </div>

                        {/* Search + Filter bar */}
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                                    placeholder="Tìm theo tên công việc, công ty..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm overflow-x-auto">
                            {TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => handleTabChange(tab.key)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                        activeTab === tab.key
                                            ? 'bg-cyan-500 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                        activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {tabCounts[tab.key]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Application list */}
                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                            </div>
                        ) : paginated.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                                <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">Chưa có đơn ứng tuyển nào</p>
                                <p className="text-sm text-gray-400 mt-1">Hãy ứng tuyển để bắt đầu hành trình sự nghiệp!</p>
                                <Link to="/jobs" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-xl text-sm font-semibold hover:bg-cyan-600 transition-colors">
                                    <Briefcase className="w-4 h-4" /> Tìm việc làm
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {paginated.map(app => (
                                    <ApplicationCard key={app._id} app={app} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-1 pt-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                            p === page ? 'bg-cyan-500 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
