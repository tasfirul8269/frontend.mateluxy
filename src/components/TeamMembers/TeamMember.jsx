import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const TeamMember = ({ member }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent/${member.id}`); 
  }

  console.log(member)

  return (
  
     <div onClick={handleClick} className=" cursor-pointer bg-white rounded-[20px] border border-[#e6e6e6] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-64 overflow-hidden">
        <img  
          src={member.profileImage} 
          alt={member.name} 
          className="w-full h-full rounded-[20px] object-cover object-center p-4 transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-[#256fff] font-medium mb-3">{member.position}</p>
        
      
        <div className="mt-4 flex flex-wrap gap-2">
          {member.languages.map((language) => (
            <span 
              key={language} 
              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;