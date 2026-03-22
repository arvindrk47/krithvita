import { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

// ⚠️ Replace this with your actual WhatsApp number (include country code, no + or spaces)
// Example: India +91 98765 43210 → '919876543210'
const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_MESSAGE = 'Hi! I have a question about your products. 🌿';

const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [visible, setVisible] = useState(false);

    // Fade in after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}
            className={`flex flex-col items-end gap-3 transition-opacity duration-500 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Tooltip / Chat bubble */}
            {showTooltip && (
                <div className="bg-white text-gray-800 text-sm font-medium px-4 py-3 rounded-2xl rounded-br-sm shadow-2xl border border-gray-100 max-w-[200px] animate-fade-in relative">
                    <button
                        onClick={() => setShowTooltip(false)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition"
                        aria-label="Close"
                    >
                        <FaTimes size={8} />
                    </button>
                    <p className="leading-snug">👋 Hi there! Chat with us on WhatsApp</p>
                </div>
            )}

            {/* WhatsApp Button */}
            <button
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                style={{ backgroundColor: '#25D366' }}
                className="group w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 relative"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={30} className="relative z-10" />
                {/* Pulse ring */}
                <span 
                    className="absolute inset-0 rounded-full animate-ping" 
                    style={{ backgroundColor: '#25D366', opacity: 0.4 }}
                />
            </button>
        </div>
    );
};

export default WhatsAppButton;
