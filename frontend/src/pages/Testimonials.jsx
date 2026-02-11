import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Priya Sharma",
            role: "Mother of 2",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            text: "Slurrp Farm has been a lifesaver! My kids absolutely love the cereals and cookies. Knowing they are eating healthy, chemical-free food gives me so much peace of mind.",
            rating: 5
        },
        {
            id: 2,
            name: "Rahul Verma",
            role: "Father",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            text: "The quality of the products is outstanding. The millet dosa mix is our weekend favorite. Highly recommended for every parent looking for nutritious options.",
            rating: 5
        },
        {
            id: 3,
            name: "Anjali Gupta",
            role: "Nutritionist",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            text: "As a nutritionist, I am impressed by the ingredients list. No hidden sugars or preservatives. Just pure, verify whole grains. Great job Slurrp Farm!",
            rating: 4
        },
        {
            id: 4,
            name: "Vikram Singh",
            role: "Fitness Enthusiast",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            text: "Not just for kids, I enjoy the cookies as my post-workout snack. Tasty and healthy!",
            rating: 5
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">What Parents Say</h1>
                    <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">Trusted by over 1 million parents across India.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative">
                            <FaQuoteLeft className="text-4xl text-secondary/20 absolute top-6 left-6" />
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow-md mb-6"
                                />
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                                <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                                <p className="text-secondary font-medium">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
