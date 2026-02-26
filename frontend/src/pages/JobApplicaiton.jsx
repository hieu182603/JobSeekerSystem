import { useState } from "react";
import SideBar from "../components/SideBar";

const JobApplication = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("Tất cả");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");

    const employees = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            position: "Nhân viên kinh doanh",
            department: "Kinh doanh",
            phone: "0123456789",
            email: "nguyenvana@company.com",
            status: "Đang làm việc",
            avatar: "https://via.placeholder.com/40",
        },
        {
            id: 2,
            name: "Trần Thị B",
            position: "Kế toán trưởng",
            department: "Kế toán",
            phone: "0987654321",
            email: "tranthib@company.com",
            status: "Đang làm việc",
            avatar: "https://via.placeholder.com/40",
        },
        {
            id: 3,
            name: "Lê Văn C",
            position: "Lập trình viên",
            department: "IT",
            phone: "0369852147",
            email: "levanc@company.com",
            status: "Đang làm việc",
            avatar: "https://via.placeholder.com/40",
        },
        {
            id: 4,
            name: "Phạm Thị D",
            position: "Nhân viên marketing",
            department: "Marketing",
            phone: "0147258369",
            email: "phamthid@company.com",
            status: "Nghỉ phép",
            avatar: "https://via.placeholder.com/40",
        },
        {
            id: 5,
            name: "Hoàng Văn E",
            position: "Trưởng phòng nhân sự",
            department: "Nhân sự",
            phone: "0258147369",
            email: "hoangvane@company.com",
            status: "Đang làm việc",
            avatar: "https://via.placeholder.com/40",
        },
    ];

    const departments = [
        "Tất cả",
        "Kinh doanh",
        "Kế toán",
        "IT",
        "Marketing",
        "Nhân sự",
    ];
    const statuses = ["Tất cả", "Đang làm việc", "Nghỉ phép", "Đã nghỉ việc"];

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.phone.includes(searchTerm);
        const matchesDepartment =
            selectedDepartment === "Tất cả" ||
            employee.department === selectedDepartment;
        const matchesStatus =
            selectedStatus === "Tất cả" || employee.status === selectedStatus;
        return matchesSearch && matchesDepartment && matchesStatus;
    });

    return (
        <div className="flex h-screen bg-gray-50">
            <SideBar />
            <main className="flex-1 overflow-auto w-full relative">
                <div className="max-w-[1440px] mx-auto px-8 py-6">
                    <header className="mb-8">
                        <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-2">
                            Quản lý nhân viên
                        </h1>
                        <p className="text-[14px] text-[#666666]">
                            Quản lý thông tin và trạng thái nhân viên trong công ty
                        </p>
                    </header>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex-1 min-w-[300px]">
                                <label
                                    htmlFor="search"
                                    className="block text-[14px] font-medium text-[#333333] mb-2"
                                >
                                    Tìm kiếm
                                </label>
                                <div className="relative">
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Tìm theo tên, email hoặc số điện thoại..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1890ff] focus:border-transparent"
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999999]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="w-[200px]">
                                <label
                                    htmlFor="department"
                                    className="block text-[14px] font-medium text-[#333333] mb-2"
                                >
                                    Phòng ban
                                </label>
                                <select
                                    id="department"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1890ff] focus:border-transparent cursor-pointer"
                                >
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-[200px]">
                                <label
                                    htmlFor="status"
                                    className="block text-[14px] font-medium text-[#333333] mb-2"
                                >
                                    Trạng thái
                                </label>
                                <select
                                    id="status"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1890ff] focus:border-transparent cursor-pointer"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-[14px] text-[#666666]">
                                Hiển thị{" "}
                                <span className="font-semibold text-[#1a1a1a]">
                                    {filteredEmployees.length}
                                </span>{" "}
                                nhân viên
                            </p>
                            <button className="px-6 py-2 bg-[#1890ff] text-white text-[14px] font-medium rounded-md hover:bg-[#40a9ff] transition-colors duration-200">
                                + Thêm nhân viên
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#fafafa] border-b border-[#f0f0f0]">
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-[#d9d9d9] cursor-pointer"
                                                aria-label="Chọn tất cả nhân viên"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Nhân viên
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Chức vụ
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Phòng ban
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Liên hệ
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1a1a1a]">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-[#d9d9d9] cursor-pointer"
                                                    aria-label={`Chọn ${employee.name}`}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#1890ff] flex items-center justify-center text-white font-semibold text-[14px]">
                                                        {employee.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-medium text-[#1a1a1a]">
                                                            {employee.name}
                                                        </p>
                                                        <p className="text-[12px] text-[#999999]">
                                                            {employee.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[14px] text-[#333333]">
                                                    {employee.position}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#e6f7ff] text-[#1890ff]">
                                                    {employee.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[14px] text-[#333333]">
                                                    {employee.phone}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${employee.status === "Đang làm việc"
                                                        ? "bg-[#f6ffed] text-[#52c41a]"
                                                        : employee.status === "Nghỉ phép"
                                                            ? "bg-[#fff7e6] text-[#fa8c16]"
                                                            : "bg-[#fff1f0] text-[#ff4d4f]"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-2 h-2 rounded-full mr-2 ${employee.status === "Đang làm việc"
                                                            ? "bg-[#52c41a]"
                                                            : employee.status === "Nghỉ phép"
                                                                ? "bg-[#fa8c16]"
                                                                : "bg-[#ff4d4f]"
                                                            }`}
                                                    ></span>
                                                    {employee.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-2 text-[#1890ff] hover:bg-[#e6f7ff] rounded transition-colors duration-150"
                                                        aria-label={`Chỉnh sửa ${employee.name}`}
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="p-2 text-[#ff4d4f] hover:bg-[#fff1f0] rounded transition-colors duration-150"
                                                        aria-label={`Xóa ${employee.name}`}
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredEmployees.length === 0 && (
                            <div className="py-12 text-center">
                                <svg
                                    className="mx-auto w-16 h-16 text-[#d9d9d9] mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                </svg>
                                <p className="text-[16px] font-medium text-[#1a1a1a] mb-1">
                                    Không tìm thấy nhân viên
                                </p>
                                <p className="text-[14px] text-[#999999]">
                                    Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                                </p>
                            </div>
                        )}

                        <div className="px-6 py-4 border-t border-[#f0f0f0] flex items-center justify-between">
                            <p className="text-[14px] text-[#666666]">Trang 1 / 1</p>
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 border border-[#d9d9d9] rounded text-[14px] text-[#666666] hover:text-[#1890ff] hover:border-[#1890ff] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled
                                >
                                    Trước
                                </button>
                                <button className="px-3 py-1 bg-[#1890ff] text-white rounded text-[14px]">
                                    1
                                </button>
                                <button
                                    className="px-3 py-1 border border-[#d9d9d9] rounded text-[14px] text-[#666666] hover:text-[#1890ff] hover:border-[#1890ff] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default JobApplication;
