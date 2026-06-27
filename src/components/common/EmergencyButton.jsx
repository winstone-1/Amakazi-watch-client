function EmergencyButton() {
  const handleSOS = () => {
    alert('🚨 Emergency alert triggered! Call 1195 for immediate help.');
  };

  return (
    <button 
      onClick={handleSOS}
      className="fixed bottom-6 right-6 bg-red-500 text-white px-6 py-6 rounded-full shadow-2xl font-bold text-lg hover:bg-red-600 transition-all animate-pulse z-50"
    >
      🆘 SOS
    </button>
  );
}
export default EmergencyButton;
