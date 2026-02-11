const Returns = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">Returns & Refunds Policy</h1>

                    <div className="prose max-w-none text-gray-600 space-y-6">
                        <p className="text-lg">
                            At Eshwar, we want you to love your purchase. If you are not completely satisfied, we're here to help.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">1. Return Eligibility</h3>
                        <p>
                            We accept returns/replacements within <strong>7 days</strong> of delivery if:
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>The product is damaged or defective.</li>
                                <li>You received the wrong item.</li>
                                <li>The product is expired (very unlikely!).</li>
                            </ul>
                            <strong>Note:</strong> We cannot accept returns for opened food products due to hygiene and safety reasons unless they are damaged.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">2. How to Initiate a Return</h3>
                        <p>
                            Please email us at <a href="mailto:support@eshwar.com" className="text-primary font-bold">support@eshwar.com</a> with your Order ID and photos of the issue. Our team will verify and arrange a pickup.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">3. Refunds</h3>
                        <p>
                            Once we receive the returned item and inspect it, we will initiate your refund.
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Prepaid Orders: Refunded to original source within 5-7 business days.</li>
                                <li>COD Orders: Refunded via bank transfer or store credit.</li>
                            </ul>
                        </p>

                        <h3 className="text-2xl font-bold text-gray-800">4. Cancellations</h3>
                        <p>
                            You can cancel your order before it is shipped. Once shipped, it cannot be cancelled but can be returned if it meets the eligibility criteria.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
