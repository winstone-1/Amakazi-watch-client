function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-[#2C3E50] mb-4">AmakaziWatch</h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
        Kenya's first crowdsourced GBV awareness, reporting and prevention platform
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">Report Now</button>
        <button className="bg-[#2C3E50] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A2A3A] transition">Find Help</button>
        <button className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition animate-pulse">🆘 SOS Emergency</button>
      </div>
      <div className="mt-12 text-sm text-gray-500">
        <span className="font-bold">Emergency?</span> Call <span className="font-bold text-red-600">1195</span> (toll-free) or <span className="font-bold">999</span> for Police
      </div>
    </div>
  );
}
export default Landing;
