import SideBar from "../../components/SideBar";
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Briefcase, Mail, Phone, FileText, Calendar, Loader2, 
    ArrowLeft, MapPin, DollarSign, Clock, CheckCircle, 
    Eye, ChevronRight, UserCheck 
} from 'lucide-react';

const JobDetail = () => {
    const { user } = useAuth();
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobAndApplicants = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/applications/job/${jobId}`);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Không thể tải dữ liệu công việc");
            } finally {
                setLoading(false);
            }
        };

        if (jobId) fetchJobAndApplicants();
    }, [jobId]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Đang tải chi tiết công việc...</p>
        </div>
    );

    if (error || !data) return (
        <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
            <div className="bg-red-50 p-6 rounded-2xl">
                <p className="text-red-500 font-bold text-lg">{error || "Dữ liệu không tồn tại"}</p>
                <button onClick={() => navigate(-1)} className="mt-4 flex items-center justify-center w-full text-blue-600 font-semibold hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại ngay
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <SideBar profile={user} />
            
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header & Back Button */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
                    </button>
                    <div className="flex gap-2">
                        <span className="text-xs text-gray-400 bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center">
                            <Eye className="w-3.5 h-3.5 mr-1.5" /> {data.views || 0} lượt xem
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{data.title}</h1>
                                    <div className="flex items-center mt-3 gap-3">
                                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                                            {data.jobType?.replace('_', ' ')}
                                        </span>
                                        <span className={`flex items-center text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider ${data.status === 'open' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {data.status === 'open' ? 'Đang tuyển' : 'Đã đóng'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 mt-10">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                        Mô tả công việc
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line pl-4 text-[15px]">
                                        {data.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                                        Yêu cầu ứng viên
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line pl-4 text-[15px]">
                                        {data.requirements || "Không có yêu cầu cụ thể."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DANH SÁCH ỨNG VIÊN */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                    <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                                    Danh sách ứng tuyển
                                    <span className="ml-3 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                        {data.applicants?.length || 0}
                                    </span>
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                                        <tr>
                                            <th className="p-5 text-left">Ứng viên</th>
                                            <th className="p-5 text-center">Trạng thái</th>
                                            <th className="p-5 text-left">Ngày nộp</th>
                                            <th className="p-5 text-right">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {data.applicants?.map((app) => (
                                            <tr key={app._id} className="hover:bg-blue-50/20 transition-all group">
                                                <td className="p-5">
                                                    <div className="flex items-center">
                                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-sm mr-4">
                                                            {app.jobseekerId?.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{app.jobseekerId?.name}</p>
                                                            <div className="flex flex-col text-xs text-gray-400 mt-0.5">
                                                                <span className="flex items-center mt-1"><Mail className="w-3 h-3 mr-1.5 text-gray-300" /> {app.jobseekerId?.email}</span>
                                                                <span className="flex items-center mt-1"><Phone className="w-3 h-3 mr-1.5 text-gray-300" /> {app.jobseekerId?.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-center">
                                                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                                        app.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-green-50 text-green-600 border border-green-100'
                                                    }`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-sm text-gray-500 font-medium font-mono">
                                                    {new Date(app.appliedAt || app.createdAt).toLocaleDateString('vi-VN')}
                                                </td>
                                                <td className="p-5 text-right">
                                                    <a
                                                        href={app.resumeUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-xs shadow-sm"
                                                    >
                                                        <FileText className="w-3.5 h-3.5 mr-2" /> CV
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {(!data.applicants || data.applicants.length === 0) && (
                                    <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                                            <FileText className="w-8 h-8 text-gray-200" />
                                        </div>
                                        <p className="italic text-sm">Chưa có ứng viên nào nộp đơn.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: THÔNG TIN NHANH */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-8">
                            <h3 className="text-gray-900 font-bold mb-6 flex items-center px-2">
                                Tóm tắt công việc
                            </h3>
                            
                            <div className="space-y-1">
                                <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mr-4">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Mức lương</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            {data.salary?.min?.toLocaleString()} - {data.salary?.max?.toLocaleString()} {data.salary?.currency}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Địa điểm</p>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">
                                            {data.location?.city}, {data.location?.district}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{data.location?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mr-4">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ngày đăng</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            {new Date(data.createdAt).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mr-4">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hình thức</p>
                                        <p className="text-sm font-bold text-gray-900 capitalize">
                                            {data.jobType?.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-none transition-all flex items-center justify-center group">
                                Quản lý trạng thái tuyển 
                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;