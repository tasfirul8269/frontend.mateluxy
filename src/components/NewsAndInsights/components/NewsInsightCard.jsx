import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';

const NewsInsightCard = ({newsInsight}) => {
    return (
        <div className="border border-[#e6e6e6] hover:border-[#FF2626] transition-all duration-300 rounded-[20px] p-[15px] hover:shadow-lg group overflow-hidden h-full flex flex-col">
            <div className="overflow-hidden rounded-[12px] mb-4">
                <img 
                    className='w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-[12px]' 
                    src={newsInsight.image} 
                    alt={newsInsight.title} 
                />
            </div>
            
            {/* Category and Date */}
            <div className="flex items-center gap-4 mb-3">
                {newsInsight.category && (
                    <div className="flex items-center text-sm text-gray-600">
                        <FiTag className="mr-1 text-[#FF2626]" />
                        <span>{newsInsight.category}</span>
                    </div>
                )}
                {newsInsight.date && (
                    <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-1 text-[#FF2626]" />
                        <span>{newsInsight.date}</span>
                    </div>
                )}
            </div>
            
            <h3 className='text-xl font-semibold mb-3 group-hover:text-[#FF2626] transition-colors line-clamp-2'>
                {newsInsight.title}
            </h3>
            
            <p className='text-gray-600 mb-4 flex-grow line-clamp-3'>
                {newsInsight.description}
            </p>
            
            <Link 
                to={`/news/${newsInsight.slug || newsInsight._id || newsInsight.id}`} 
                className="flex items-center text-[#FF2626] font-medium mt-auto group-hover:underline"
            >
                Read More <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};

export default NewsInsightCard;