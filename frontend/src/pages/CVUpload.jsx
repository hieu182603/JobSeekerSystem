import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Upload, FileText, Trash2, Eye, Download,
    CheckCircle, AlertCircle, Loader2, ChevronRight,
    Shield, Zap, Clock, RefreshCw, FilePlus2
} from 'lucide-react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function CVUpload() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const inputRef = useRef(null);

    const [cvInfo, setCvInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        fetchCVInfo();
    }, []);

    const fetchCVInfo = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/cv/my-cv`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCvInfo(res.data);
        } catch {
            setCvInfo({ hasCV: false });
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        if (!file) return;
        if (file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Chỉ chấp nhận file PDF.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File quá lớn. Kích thước tối đa là 5MB.' });
            return;
        }
        try {
            setUploading(true);
            setMessage(null);
            const formData = new FormData();
            formData.append('cv', file);
            await axios.post(`${API_URL}/api/cv/upload`, formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            });
            setMessage({ type: 'success', text: 'Upload CV thành công!' });
            await fetchCVInfo();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Lỗi khi upload CV.' });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc muốn xóa CV?')) return;
        try {
            await axios.delete(`${API_URL}/api/cv`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage({ type: 'success', text: 'Đã xóa CV thành công.' });
            setCvInfo({ hasCV: false, resumeUrl: null });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Lỗi khi xóa CV.' });
        }
    };

    const handleView = () => window.open(`${API_URL}/api/cv/${user.id}`, '_blank');
    const handleDownload = () => window.open(`${API_URL}/api/cv/${user.id}/download`, '_blank');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 KB';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-3 px-4">
                <div className="max-w-5xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <Link to="/" className="hover:text-cyan-600 transition-colors">Trang chủ</Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <Link to="/dashboard" className="hover:text-cyan-600 transition-colors">Dashboard</Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-700 font-medium">Quản lý CV</span>
                </div>
            </div>

            <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

                {/* Page title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý CV của bạn</h1>
                    <p className="text-sm text-gray-500 mt-1">Upload CV để ứng tuyển nhanh hơn và nổi bật hơn với nhà tuyển dụng.</p>
                </div>

                {/* Message banner */}
                {message && (
                    <div className={`mb-6 flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
                        message.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {message.type === 'success'
                            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                        {message.text}
                        <button onClick={() => setMessage(null)} className="ml-auto text-current opacity-60 hover:opacity-100 text-lg leading-none">×</button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── LEFT: upload + current CV ── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Current CV card */}
                        {loading ? (
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center shadow-sm">
                                <Loader2 className="w-7 h-7 animate-spin text-cyan-500" />
                            </div>
                        ) : cvInfo?.hasCV ? (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-1 h-4 bg-cyan-500 rounded-full"></span>
                                        CV hiện tại
                                    </h2>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                                        <CheckCircle className="w-3 h-3" /> Đã có CV
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl">
                                        <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-red-100 flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-7 h-7 text-red-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-900 truncate">{cvInfo.fileName}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {formatFileSize(cvInfo.fileSize)} &nbsp;·&nbsp; Cập nhật {new Date(cvInfo.uploadedAt).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={handleView}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-colors"
                                        >
                                            <Eye className="w-4 h-4" /> Xem CV
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                        >
                                            <Download className="w-4 h-4" /> Tải về
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" /> Xóa CV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/* Upload zone */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-cyan-500 rounded-full"></span>
                                    {cvInfo?.hasCV ? 'Thay thế CV' : 'Upload CV'}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">{cvInfo?.hasCV ? 'Upload file mới để thay thế CV hiện tại' : 'Tải lên CV của bạn để bắt đầu ứng tuyển'}</p>
                            </div>
                            <div className="p-6">
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => !uploading && inputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer select-none ${
                                        dragActive
                                            ? 'border-cyan-400 bg-cyan-50 scale-[1.01]'
                                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                                        className="hidden"
                                    />

                                    {uploading ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center">
                                                <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">Đang tải lên...</p>
                                                <p className="text-sm text-gray-400 mt-1">Vui lòng đợi trong giây lát</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${dragActive ? 'bg-cyan-100' : 'bg-cyan-50'}`}>
                                                {cvInfo?.hasCV
                                                    ? <RefreshCw className="w-7 h-7 text-cyan-500" />
                                                    : <FilePlus2 className="w-7 h-7 text-cyan-500" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    Kéo & thả file vào đây hoặc{' '}
                                                    <span className="text-cyan-500 hover:underline">chọn file</span>
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">Chỉ chấp nhận file <strong>PDF</strong>, tối đa <strong>5MB</strong></p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">.pdf</span>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">≤ 5MB</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => !uploading && inputRef.current?.click()}
                                    disabled={uploading}
                                    className="mt-4 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                >
                                    {uploading
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tải lên...</>
                                        : <><Upload className="w-4 h-4" /> {cvInfo?.hasCV ? 'Chọn CV mới' : 'Chọn file CV'}</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: tips / info ── */}
                    <div className="space-y-5">

                        {/* Status card */}
                        <div className={`rounded-2xl p-5 border shadow-sm ${cvInfo?.hasCV ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="flex items-center gap-3 mb-3">
                                {cvInfo?.hasCV
                                    ? <CheckCircle className="w-5 h-5 text-green-600" />
                                    : <AlertCircle className="w-5 h-5 text-amber-600" />}
                                <p className={`text-sm font-bold ${cvInfo?.hasCV ? 'text-green-800' : 'text-amber-800'}`}>
                                    {cvInfo?.hasCV ? 'Hồ sơ đã sẵn sàng' : 'Chưa có CV'}
                                </p>
                            </div>
                            <p className={`text-xs leading-relaxed ${cvInfo?.hasCV ? 'text-green-700' : 'text-amber-700'}`}>
                                {cvInfo?.hasCV
                                    ? 'CV của bạn đã được cập nhật. Bạn có thể ứng tuyển ngay!'
                                    : 'Hãy upload CV để tăng cơ hội được nhà tuyển dụng chú ý và ứng tuyển nhanh hơn.'}
                            </p>
                            {cvInfo?.hasCV && (
                                <Link
                                    to="/jobs"
                                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:underline"
                                >
                                    Tìm việc làm ngay →
                                </Link>
                            )}
                        </div>

                        {/* Tips */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4">Lưu ý khi tạo CV</h3>
                            <div className="space-y-3.5">
                                {[
                                    { icon: <FileText className="w-4 h-4 text-cyan-600" />, bg: 'bg-cyan-50', text: 'Lưu CV dưới định dạng PDF để đảm bảo hiển thị đúng.' },
                                    { icon: <Zap className="w-4 h-4 text-yellow-600" />, bg: 'bg-yellow-50', text: 'CV rõ ràng, súc tích giúp tăng tỷ lệ được gọi phỏng vấn.' },
                                    { icon: <Shield className="w-4 h-4 text-green-600" />, bg: 'bg-green-50', text: 'Thông tin cá nhân được bảo mật, chỉ chia sẻ khi bạn ứng tuyển.' },
                                    { icon: <Clock className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50', text: 'Cập nhật CV định kỳ để phù hợp với vị trí bạn muốn ứng tuyển.' },
                                ].map((tip, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className={`w-8 h-8 ${tip.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            {tip.icon}
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed pt-1">{tip.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-3">Liên kết nhanh</h3>
                            <div className="space-y-2">
                                <Link to="/profile" className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 group">
                                    Cập nhật hồ sơ
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                                </Link>
                                <Link to="/jobs" className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 group">
                                    Tìm việc làm
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                                </Link>
                                <Link to="/dashboard" className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 group">
                                    Dashboard
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
