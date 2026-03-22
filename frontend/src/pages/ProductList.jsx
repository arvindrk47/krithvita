import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const location = useLocation();

    // Parse search params
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Construct API URL with search and filter
                let url = `products/?search=${encodeURIComponent(searchQuery)}`;
                if (selectedCategory) {
                    url += `&category__slug=${selectedCategory}`;
                }

                const [productsRes, categoriesRes] = await Promise.all([
                    api.get(url),
                    api.get('categories/') // Assuming a categories endpoint exists or we extract from products (better to have dedicated endpoint, but trying both)
                ]);

                setProducts(productsRes.data.results || productsRes.data);

                // If categories endpoint exists use it, otherwise might need another way or just manual list for now
                // Attempting to fetch categories if endpoint works, if not we'll just handle valid products
                if (categoriesRes.data && Array.isArray(categoriesRes.data)) {
                    setCategories(categoriesRes.data);
                }

            } catch (error) {
                console.error("Error fetching data", error);

                // Fallback if categories endpoint fails but products works
                try {
                    const productsRes = await api.get(`products/?search=${encodeURIComponent(searchQuery)}`);
                    setProducts(productsRes.data.results || productsRes.data);
                } catch (e) {
                    console.error("Critical error fetching products", e);
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, selectedCategory]);




    if (loading) return (
        <div className="flex justify-center items-center h-screen pt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    );

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white shadow-sm mb-10 pb-10 pt-10">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4 font-serif">
                        {searchQuery ? `Results for "${searchQuery}"` : 'Shop Our Collection'}
                    </h1>
                    <p className="text-gray-500 max-w-2xl text-lg">
                        Discover our range of healthy, natural, and delicious products made with love for you and your family.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6">

                {/* Filters & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                    {/* Category Filter Chips */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${!selectedCategory ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${selectedCategory === cat.slug ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Result Count */}
                    <p className="text-gray-500 font-medium">{products.length} Products Found</p>
                </div>


                {/* Product Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 shadow-md">
                            <FaSearch className="text-4xl text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button onClick={() => { setSelectedCategory(null); window.history.replaceState(null, '', '/products'); window.location.reload(); }} className="mt-6 text-primary font-bold hover:underline">
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
