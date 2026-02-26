import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function ApplicationsList() {
  const { user, signOut } = useAuth(); 
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterId = user?._id;

  useEffect(() => {
    // ⚠️ Nếu chưa có user → đá về login
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:4000/api/applications")
      .then(res => res.json())
      .then(data => {
        const myJobs = Array.isArray(data)
          ? data.filter(job => job.recruiterId === recruiterId)
          : [];
        setJobs(myJobs);
        setLoading(false);
      })
      .catch(err => {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      });
  }, [user, recruiterId, navigate]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar
        profile={user} />

      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            My Job Posts
          </h1>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={() => navigate("/create")}
          >
            + Create Job
          </button>
        </div>

        {jobs.length === 0 && (
          <p>No jobs found.</p>
        )}

        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center"
          >
            {/* LEFT */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {job.title}
              </h3>

              <p className="text-sm text-gray-600">
                {job.description}
              </p>

              <div className="text-sm text-gray-600 flex gap-4 flex-wrap">
                <span>💼 {job.jobType}</span>

                <span>
                  💰 {job.salary?.min?.toLocaleString()} -{" "}
                  {job.salary?.max?.toLocaleString()}{" "}
                  {job.salary?.currency}
                </span>

                <span>
                  📍 {job.location?.city || "N/A"}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                Created at:{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right space-y-2">
              <div className="text-sm">
                Applications:{" "}
                <span className="font-semibold">
                  {job.applicationsCount || 0}
                </span>
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${job.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                  }`}
              >
                {job.status}
              </span>

              <div>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => navigate(`/applications/${job._id}`)}
                >
                  View Applications
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsList;
