import React from 'react';
import NewsInsightCard from './components/NewsInsightCard';

const NewsAndInsights = () => {

    const newsInsights = [
        {
            id: 1,
            image: "https://i.ibb.co.com/SX1q4qdQ/image.png",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world. "
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/SX1q4qdQ/image.png",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world. "
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/SX1q4qdQ/image.png",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world. "
        },
        {
            id: 4,
            image: "https://i.ibb.co.com/SX1q4qdQ/image.png",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world. "
        },
        {
            id: 5,
            image: "https://i.ibb.co.com/SX1q4qdQ/image.png",
            title: "How easy is it to set up a business in Dubai?",
            description: "As a global business hub, Dubai attracts entrepreneurs and investors from all over the world. "
        },
    ]

    return (
        <div className=' py-20 md:py-10  '>
            <div className=' mx-auto'>
                {/* Header Section */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 px-4'>
                    <h1 className='text-2xl md:text-3xl font-bold'>News and Insights</h1>
                    <button className='text-[#256fff] bg-[#E8F7FF] px-4 py-2 md:px-5 md:py-3 font-medium rounded-[10px] text-sm md:text-base'>
                        All News
                    </button>
                </div>

                {/* News Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8'>
                    {newsInsights.slice(0,3).map(newsInsight => (
                        <NewsInsightCard 
                            key={newsInsight.id} 
                            newsInsight={newsInsight}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsAndInsights;