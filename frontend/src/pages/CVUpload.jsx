import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
    Upload,
    FileText,
    Trash2,
    Eye,
    Download,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Loader2,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function CVUpload() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [cvInfo, setCvInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // Lấy thông tin CV hiện tại
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
        } catch (error) {
            console.error('Error fetching CV info:', error);
        } finally {
            setLoading(false);
        }
    };

    // Upload CV
    const handleUpload = async (file) => {
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Chỉ chấp nhận file PDF' });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File quá lớn. Kích thước tối đa là 5MB' });
            return;
        }

        try {
            setUploading(true);
            setMessage(null);

            const formData = new FormData();
            formData.append('cv', file);

            await axios.post(`${API_URL}/api/cv/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage({ type: 'success', text: 'Upload CV thành công!' });
            await fetchCVInfo();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi khi upload CV';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setUploading(false);
        }
    };

    // Xóa CV
    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc muốn xóa CV?')) return;

        try {
            await axios.delete(`${API_URL}/api/cv`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage({ type: 'success', text: 'Đã xóa CV thành công' });
            setCvInfo({ hasCV: false, resumeUrl: null });
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi khi xóa CV';
            setMessage({ type: 'error', text: errorMsg });
        }
    };

    // Xem CV
    const handleView = () => {
        window.open(`${API_URL}/api/cv/${user.id}`, '_blank');
    };

    // Tải CV
    const handleDownload = () => {
        window.open(`${API_URL}/api/cv/${user.id}/download`, '_blank');
    };

    // Drag & Drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 KB';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý CV</h1>
                        <p className="text-sm text-gray-600">Upload và quản lý CV của bạn</p>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 flex items-center gap-3 p-4 rounded-lg ${message.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm">{message.text}</span>
                    </div>
                )}

                {/* CV hiện tại */}
                {cvInfo?.hasCV && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">CV hiện tại</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{cvInfo.fileName}</p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(cvInfo.fileSize)} • Cập nhật{' '}
                                        {new Date(cvInfo.uploadedAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handleView}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    Xem
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Tải về
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Zone */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {cvInfo?.hasCV ? 'Upload CV mới (thay thế)' : 'Upload CV'}
                    </h2>

                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors cursor-pointer ${dragActive
                                ? 'border-cyan-400 bg-cyan-50'
                                : 'border-gray-300 hover:border-cyan-400 hover:bg-gray-50'
                            }`}
                        onClick={() => document.getElementById('cv-input').click()}
                    >
                        <input
                            id="cv-input"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileInput}
                            className="hidden"
                        />

                        {uploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                                <p className="text-sm text-gray-600">Đang upload...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-cyan-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Kéo thả file PDF vào đây hoặc <span className="text-cyan-500">chọn file</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Chỉ chấp nhận file PDF, tối đa 5MB</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
