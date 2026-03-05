
import { Search, MapPin, Building2, Briefcase } from 'lucide-react';

export default function Hero() {
    return (
        <section className="bg-gradient-to-b from-cyan-50 to-white py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="min-w-0">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                            Tìm kiếm công việc{' '}
                            <span className="text-cyan-500">mơ ước</span> của bạn tại Việt Nam
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                            Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các công ty hàng đầu.
                            Tìm công việc phù hợp với kỹ năng và đam mê của bạn.
                        </p>

                        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 mb-4">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg min-w-0">
                                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Tên công việc, vị trí"
                                            className="flex-1 outline-none text-sm sm:text-base min-w-0"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:w-48 min-w-0">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                        <select className="flex-1 outline-none bg-transparent text-sm sm:text-base">
                                            <option>Hà Nội</option>
                                            <option>TP. HCM</option>
                                            <option>Đà Nẵng</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium text-sm sm:text-base">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>

                        <button className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors font-medium text-sm sm:text-base">
                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            Tìm Công ty Hàng đầu
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <div className="relative aspect-square">
                            <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl p-6 sm:p-8 shadow-2xl h-full flex items-center">
                                <img
                                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="Professional working"
                                    className="rounded-lg w-full h-auto"
                                />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-600">Cơ hội việc làm</p>
                                    <p className="text-lg sm:text-xl font-bold text-gray-900">10,000+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
