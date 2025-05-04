import React from 'react';

const NewsInsightCard = ({newsInsight}) => {
    return (
        <div className="border border-[#e6e6e6] rounded-[20px] p-[15px] ">
            <img className='w-full' src={newsInsight.image} alt="News Insight" />
            <h3 className='text-xl font-semibold mt-2'>{newsInsight.title}</h3>
            <p className='text-gray-600 mt-2'>{newsInsight.description}</p>
        </div>
    );
};

export default NewsInsightCard;