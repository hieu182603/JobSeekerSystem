
import { MapPin, DollarSign, Bookmark } from 'lucide-react';

const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'Tech Corp',
        location: 'Hà Nội',
        salary: '20-30 triệu',
        type: 'Full-time',
        logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
        id: 2,
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'TP. HCM',
        salary: '15-25 triệu',
        type: 'Full-time',
        logo: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
        id: 3,
        title: 'Digital Marketing Lead',
        company: 'Marketing Pro',
        location: 'Đà Nẵng',
        salary: '18-28 triệu',
        type: 'Full-time',
        logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
];

export default function JobListings() {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
                    <div className="min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Việc làm nổi bật</h2>
                        <p className="text-sm sm:text-base text-gray-600">Khám phá những vị trí việc làm hấp dẫn nhất</p>
                    </div>
                    <a href="#" className="text-cyan-500 hover:text-cyan-600 font-medium text-sm whitespace-nowrap">
                        Xem tất cả →
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                                <img
                                    src={job.logo}
                                    alt={job.company}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                                />
                                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                </button>
                            </div>

                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{job.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 sm:mb-4">{job.company}</p>

                            <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">{job.salary}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-medium">
                                    {job.type}
                                </span>
                                <button className="text-cyan-500 hover:text-cyan-600 font-medium text-xs sm:text-sm whitespace-nowrap">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
