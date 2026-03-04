
export default function Partners() {
    const partners = [
        'VIETTEL',
        'GRAB',
        'SHOPEE',
        'VINAMILK',
        'MOMO',
        'TECHCOMBANK',
    ];

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
                    Đối tác hàng đầu
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-3 sm:p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-pointer"
                        >
                            <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-700 text-center">{partner}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
