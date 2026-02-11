import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">We'd love to hear from you. Here is how you can reach us.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Contact Info Card */}
                    <div className="bg-primary text-white p-12 md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Contact Info</h2>
                            <p className="text-white/80 mb-10">
                                Have a question or just want to say hi? We're here to help you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <FaPhone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Phone</h3>
                                        <p className="text-white/80">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email</h3>
                                        <p className="text-white/80">support@eshwar.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Address</h3>
                                        <p className="text-white/80">123, Eshwar Plaza, Bangalore, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <div className="flex space-x-4">
                                {/* Social Icons could go here */}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-12 md:w-3/5">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Message</label>
                                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition" rows="4" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition duration-300 shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
