import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
export default function FloatingContacts() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      <a href={import.meta.env.VITE_WHATSAPP} target="_blank" className="p-3 rounded-full bg-green-500 hover:scale-110 transition shadow-lg"><FaWhatsapp size={22}/></a>
      <a href={import.meta.env.VITE_TELEGRAM} target="_blank" className="p-3 rounded-full bg-sky-500 hover:scale-110 transition shadow-lg"><FaTelegramPlane size={22}/></a>
    </div>
  );
}
