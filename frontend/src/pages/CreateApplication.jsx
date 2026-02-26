import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from '../contexts/AuthContext';

function CreateApplication() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const userRaw = localStorage.getItem("user");

    const [form, setForm] = useState({
        title: "",
        description: "",
        requirements: "",
        jobType: "full_time",
        salaryMin: "",
        salaryMax: "",
        currency: "VND",
        city: "",
        district: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?._id) {
            alert("Bạn cần đăng nhập để đăng tin tuyển dụng");
            return;
        }

        const payload = {
            recruiterId: user._id,
            title: form.title,
            description: form.description,
            requirements: form.requirements,
            jobType: form.jobType,
            salary: {
                min: Number(form.salaryMin),
                max: Number(form.salaryMax),
                currency: form.currency,
            },
            location: {
                city: form.city,
                district: form.district,
                address: form.address,
            },
        };

        try {
            const res = await fetch("http://localhost:4000/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Create failed");

            alert("Đăng tin thành công!");
            navigate("/job-application");
        } catch (err) {
            console.error(err);
            alert("Đăng tin thất bại");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex ">
            <SideBar
                profile={user} />
            <div className="w-full max-w-5xl ml-10 p-3">
                <h1 className="text-2xl font-semibold mb-1">
                    Đăng Tin Tuyển Dụng
                </h1>
                <p className="text-gray-500 mb-6">
                    Hoàn thành các bước dưới đây để tìm kiếm ứng viên phù hợp
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Section title="Thông tin cơ bản">
                        <Input
                            label="Tiêu đề công việc"
                            name="title"
                            required
                            onChange={handleChange}
                        />

                        <Select
                            label="Loại hình công việc"
                            name="jobType"
                            value={form.jobType}
                            onChange={handleChange}
                            options={[
                                { value: "full_time", label: "Toàn thời gian" },
                                { value: "part_time", label: "Bán thời gian" },
                                { value: "remote", label: "Remote" },
                                { value: "freelance", label: "Freelance" },
                            ]}
                        />
                    </Section>

                    <Section title="Chi tiết công việc">
                        <Textarea
                            label="Mô tả công việc"
                            name="description"
                            onChange={handleChange}
                        />
                        <Textarea
                            label="Yêu cầu ứng viên"
                            name="requirements"
                            onChange={handleChange}
                        />
                    </Section>

                    <Section title="Lương & Quyền lợi">
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="Lương từ"
                                name="salaryMin"
                                type="number"
                                onChange={handleChange}
                            />
                            <Input
                                label="Đến"
                                name="salaryMax"
                                type="number"
                                onChange={handleChange}
                            />
                            <Select
                                label="Tiền tệ"
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                                options={[
                                    { value: "VND", label: "VND" },
                                    { value: "USD", label: "USD" },
                                ]}
                            />
                        </div>
                    </Section>

                    <Section title="Địa điểm làm việc">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tỉnh / Thành phố"
                                name="city"
                                onChange={handleChange}
                            />
                            <Input
                                label="Quận / Huyện"
                                name="district"
                                onChange={handleChange}
                            />
                        </div>
                        <Input
                            label="Địa chỉ cụ thể"
                            name="address"
                            onChange={handleChange}
                        />
                    </Section>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-6 py-2 border rounded-lg"
                            onClick={() => navigate(-1)}
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            disabled={!user}
                            className={`px-6 py-2 rounded-lg text-white ${user
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Đăng tin ngay →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ===== COMPONENT DÙNG CHUNG ===== */

const Section = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        {children}
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <input {...props} className="w-full border rounded-lg p-2" />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <textarea {...props} rows={4} className="w-full border rounded-lg p-2" />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <select {...props} className="w-full border rounded-lg p-2">
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    </div>
);

export default CreateApplication;
