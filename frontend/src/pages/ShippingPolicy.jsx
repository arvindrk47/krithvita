const ShippingPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">Shipping Policy</h1>

                    <div className="prose max-w-none text-gray-600 space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">1. Shipping Charges</h3>
                        <p>
                            We offer <strong>Free Shipping</strong> on all orders above ₹500 within India. For orders below ₹500, a nominal shipping fee of ₹50 will be charged.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">2. Delivery Timelines</h3>
                        <p>
                            We strive to deliver your products as quickly as possible.
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li><strong>Metro Cities:</strong> 2-4 business days</li>
                                <li><strong>Rest of India:</strong> 5-7 business days</li>
                            </ul>
                            Please note that delivery times may be affected by public holidays or unforeseen circumstances.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">3. Order Tracking</h3>
                        <p>
                            Once your order is shipped, you will receive a tracking link via email and SMS. You can also view the status in your "My Orders" section.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">4. International Shipping</h3>
                        <p>
                            Currently, we do not ship internationally. We are working on it and will update you soon!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
