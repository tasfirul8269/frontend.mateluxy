import React, { useState } from 'react';
import NewsInsightCard from './components/NewsInsightCard';
import { FiArrowRight } from 'react-icons/fi';

const NewsAndInsights = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const newsInsights = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world.",
            date: "May 5, 2025",
            category: "Business"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "The latest trends in Dubai's luxury real estate market",
            description: "Discover what's driving the luxury property market in Dubai and where the best investment opportunities lie.",
            date: "May 2, 2025",
            category: "Real Estate"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "Top 5 neighborhoods for families in Dubai",
            description: "Find out which Dubai neighborhoods offer the best amenities, schools, and lifestyle for families.",
            date: "April 28, 2025",
            category: "Lifestyle"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1546412414-e1885e51cfa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "Investment guide: Off-plan properties in Dubai",
            description: "Everything you need to know about investing in off-plan properties in Dubai's dynamic real estate market.",
            date: "April 25, 2025",
            category: "Investment"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1609348445429-a21d6e8fd0ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "Dubai's new visa policies and what they mean for property investors",
            description: "Learn how Dubai's latest visa reforms are making it easier for foreign investors to live and invest in the emirate.",
            date: "April 20, 2025",
            category: "Policy"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            title: "Sustainable living: Eco-friendly properties in Dubai",
            description: "Explore Dubai's growing portfolio of sustainable and eco-friendly residential developments.",
            date: "April 15, 2025",
            category: "Sustainability"
        }
    ];
    
    const handleLoadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 3, newsInsights.length));
    };
    
    const handleShowLess = () => {
        setVisibleCount(3);
    };

    return (
        <div className='py-0 sm:py-0 md:py-0'>
            <div className='mx-auto'>
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 space-y-4 sm:space-y-0 px-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800'>News and Insights</h1>
                        <p className='text-gray-600 mt-2 max-w-xl'>Stay updated with the latest trends and insights in Dubai's real estate market</p>
                    </div>
                    <button className='text-[#FF2626] bg-[#FFF0F0] hover:bg-[#FFE0E0] transition-colors px-4 py-2 sm:px-5 sm:py-3 font-medium rounded-[10px] text-sm sm:text-base flex items-center'>
                        All News <FiArrowRight className='ml-2' />
                    </button>
                </div>

                {/* Category Filters */}
                <div className='flex flex-wrap gap-2 mb-8 px-4 overflow-x-auto pb-2'>
                    <button className='bg-[#FF2626] text-white px-4 py-2 rounded-full text-sm whitespace-nowrap'>All</button>
                    <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm whitespace-nowrap'>Real Estate</button>
                    <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm whitespace-nowrap'>Investment</button>
                    <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm whitespace-nowrap'>Lifestyle</button>
                    <button className='bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm whitespace-nowrap'>Business</button>
                </div>

                {/* News Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 px-4'>
                    {newsInsights.slice(0, visibleCount).map(newsInsight => (
                        <NewsInsightCard 
                            key={newsInsight.id} 
                            newsInsight={newsInsight}
                        />
                    ))}
                </div>
                
                {/* Load More / Show Less Buttons */}
                {newsInsights.length > 3 && (
                    <div className='flex justify-center mt-10'>
                        {visibleCount < newsInsights.length ? (
                            <button 
                                onClick={handleLoadMore}
                                className='bg-white border border-[#FF2626] text-[#FF2626] hover:bg-[#FFF0F0] transition-colors px-6 py-3 rounded-[10px] font-medium flex items-center'
                            >
                                Load More <FiArrowRight className='ml-2' />
                            </button>
                        ) : (
                            <button 
                                onClick={handleShowLess}
                                className='bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors px-6 py-3 rounded-[10px] font-medium'
                            >
                                Show Less
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsAndInsights;