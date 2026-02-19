
import { ArrowRight, FileText } from 'lucide-react';

export default function CallToAction() {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-xl">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                        Sẵn sàng để bắt đầu bước tiến mới trong sự nghiệp?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-cyan-50 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        Tham gia ngay hôm nay để khám phá hàng ngàn cơ hội việc làm và kết nối với các nhà tuyển dụng hàng đầu
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                            Đăng ký ngay
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                            Tải CV mẫu
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
