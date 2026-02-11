import { FaLeaf, FaHeart, FaUsers, FaGlobe } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-primary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-md">Our Story</h1>
                    <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light">
                        Born from a mother's love, fueled by nature's goodness.
                    </p>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                            Bringing <span className="text-primary">Millet Magic</span> back to your plate.
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Once upon a time, two friends, Meghana and Shauravi, struggled to find healthy, chemical-free food options for their own children. They realized that the "healthy" aisles were often filled with hidden sugars and processed ingredients.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Determined to make a change, they turned to the wisdom of their grandmothers and the nutritional powerhouse of ancient grains like Millets. Thus, Slurrp Farm was born – a promise to provide honest, yummy, and 100% natural food for every family.
                        </p>
                        <div className="flex space-x-4 pt-4">
                            <div className="flex items-center space-x-2 text-secondary font-bold">
                                <FaLeaf size={24} />
                                <span>100% Natural</span>
                            </div>
                            <div className="flex items-center space-x-2 text-primary font-bold">
                                <FaHeart size={24} />
                                <span>Zero Junk</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Mother and Child cooking"
                            className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why We Do What We Do</h2>
                        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: <FaGlobe className="text-5xl text-secondary" />, title: "Sustainable Farming", desc: "We support bio-diverse farming practices that are good for the planet and good for you." },
                            { icon: <FaUsers className="text-5xl text-primary" />, title: "Community First", desc: "We are building a community of conscious parents who want the best for their children." },
                            { icon: <FaHeart className="text-5xl text-red-500" />, title: "Made with Love", desc: "Every recipe is tasted and approved by our own children before it reaches yours." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 text-center border-t-4 border-transparent hover:border-secondary">
                                <div className="mb-6 flex justify-center">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section Placeholder */}
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet the Founders</h2>
                <div className="flex flex-col md:flex-row justify-center gap-12">
                    <div className="max-w-xs mx-auto">
                        <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Founder 1" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold">Meghana Narayan</h3>
                        <p className="text-gray-500">Co-Founder</p>
                    </div>
                    <div className="max-w-xs mx-auto">
                        <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-secondary">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Founder 2" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold">Shauravi Malik</h3>
                        <p className="text-gray-500">Co-Founder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
