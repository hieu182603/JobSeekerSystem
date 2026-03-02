import {
  Home,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeMenu,
  setActiveMenu,
  profile,
}) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`
        bg-white border-r border-gray-200 p-4
        flex flex-col
        h-screen sticky top-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${sidebarOpen ? "bottom-0" : "top-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg">Recruit Pro</span>
        </div>

        <button
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setSidebarOpen(false)}
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-1 flex-shrink-0">
        <MenuItem
          icon={<Home size={20} />}
          label="Tổng quan"
          active={activeMenu === "home"}
          onClick={() => {
            navigate("/dashboard");
          }}
        />

        {/* <MenuItem
          icon={<Users size={20} />}
          label="Tìm tuyển dụng"
          onClick={() => {
            setActiveMenu("candidates");
            navigate("/candidates");
          }}
        /> */}

        <MenuItem
          icon={<Briefcase size={20} />}
          label="Quản lý công việc"
          onClick={() => {
            navigate("/job-application");
          }}
        />
        <MenuItem
          icon={<Users size={20} />}
          label="Danh sách ứng viên"
          onClick={() => {
            navigate("/candidate");
          }}
        />

        {/* <MenuItem
          icon={<BarChart3 size={20} />}
          label="Quản lý quảng cáo"
          onClick={() => setActiveMenu("analytics")}
        />

        <MenuItem
          icon={<Settings size={20} />}
          label="Báo cáo theo quá"
          onClick={() => setActiveMenu("settings")}
        /> */}
      </nav>

      {/* Profile */}
      <div className="mt-auto px-2 flex-shrink-0">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 px-2 py-3 mb-2 rounded-xl
                     hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#00b5d8] rounded-full flex items-center justify-center
                          text-white font-semibold text-lg flex-shrink-0">
            {profile?.name?.charAt(0) || "C"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[15px] text-[#0f2a4a] truncate">
              {profile?.name || "Candidate User 2"}
            </p>
            <p className="text-[13px] text-gray-500 font-medium">
              LeMint Tech
            </p>
          </div>

          <ChevronRight
            size={18}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

/* ------------------ Sub component ------------------ */
const MenuItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
      ${active ? "bg-cyan-50 text-cyan-600" : "text-gray-700 hover:bg-gray-50"}
    `}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);
