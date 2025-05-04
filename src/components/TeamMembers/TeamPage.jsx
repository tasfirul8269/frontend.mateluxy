import React, { useState, useEffect } from 'react';
import { Users, Award, UserCheck, Clock, Building } from 'lucide-react';
import FilterBar from './FilterBar';
import TeamMember from './TeamMember';

const ITEMS_PER_PAGE = 6;

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teamData, setTeamData] = useState({
    teamMembers: [],
    departments: [],
    languages: []
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('team-members.json');
        const data = await response.json();
        setTeamData(data);
        setFilteredMembers(data.teamMembers);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    let filtered = teamData.teamMembers;

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(
        (member) => member.department === selectedDepartment
      );
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(
        (member) => member.languages.includes(selectedLanguage)
      );
    }

    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedLanguage, teamData.teamMembers]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-14">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Meet the talented professionals who make our success possible. Our diverse team brings expertise, passion, and innovation to everything we do.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            departments={teamData.departments}
            languages={teamData.languages}
          />

        
          {paginatedMembers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {paginatedMembers.map((member) => (
                  <TeamMember key={member.id} member={member} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-[10px] bg-[#256fff] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Previous
                </button>
                <div >{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 mr-[5px] rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600 border border-[#e6e6e6] hover:bg-blue-50'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}</div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-[10px] bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No team members found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find team members.
              </p>
            </div>
          )}

            {/* Why Choose Us Section */}
            <div className="mt-12 bg-white rounded-[20px] border border-[#e6e6e6] p-8">
            <h2 className="text-3xl font-bold text-center mb-15">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Industry Leaders</h3>
                <p className="text-gray-600">Recognized excellence in real estate with years of market expertise.</p>
              </div>
              <div className="text-center">
                <UserCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-gray-600">Highly qualified professionals dedicated to your success.</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock assistance for all your needs.</p>
              </div>
              <div className="text-center">
                <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-600">International presence with local market knowledge.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeamPage;