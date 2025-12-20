import { X } from "lucide-react";

export default function PremiumModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-[#181A1C] border border-white/10 w-full max-w-md rounded-2xl p-8 text-center shadow-2xl animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="bg-gradient-to-br from-[#0F1E93] to-[#192DB7] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(15,30,147,0.5)]">
          <img src="/assets/Vector1.png" alt="Premium" className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Konten Ini Premium!</h2>
        <p className="text-gray-400 text-sm mb-8">
          Ups! Kamu butuh paket premium untuk menonton film ini. Mulai langganan hanya dari Rp 30.000/bulan.
        </p>

        <div className="space-y-3">
          <button className="w-full bg-[#0F1E93] hover:bg-[#192DB7] text-white font-bold py-3 rounded-full transition shadow-lg">
            Langganan Sekarang
          </button>
          <button onClick={onClose} className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-full transition">
            Mungkin Nanti
          </button>
        </div>
      </div>
    </div>
  );
}