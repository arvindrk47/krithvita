import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const faqs = [
        {
            question: "What is the shelf life of your products?",
            answer: "Our products are made with fresh, natural ingredients and typically have a shelf life of 6-9 months from the date of manufacture. Please check the back of the pack for exact details."
        },
        {
            question: "Do you offer free shipping?",
            answer: "Yes! We offer free shipping on all orders above ₹500 within India."
        },
        {
            question: "Are your products gluten-free?",
            answer: "Many of our products like Millet Dosa Mixes are naturally gluten-free. However, they are processed in a facility that also handles wheat."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it from the 'My Orders' section."
        },
        {
            question: "Can I cancel my order?",
            answer: "You can cancel your order within 24 hours of placing it, provided it hasn't been shipped yet."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
                            <button
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-bold text-gray-800">{faq.question}</span>
                                {openIndex === index ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-gray-400" />}
                            </button>
                            <div
                                className={`px-6 pb-6 text-gray-600 leading-relaxed transition-all duration-300 ${openIndex === index ? 'block' : 'hidden'}`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
