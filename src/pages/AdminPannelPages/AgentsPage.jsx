import React, { useState, useEffect } from "react";
import { AgentCard } from "@/components/AdminPannel/agents/AgentCard";
import { FloatingActionButton } from "@/components/AdminPannel/ui/UIComponents";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/AdminPannel/ui/pagination";
import { AgentFormDialog } from "@/components/AdminPannel/agents/AgentFormDialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AgentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agents`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        
        const data = await response.json();
        
        // Transform data to match our frontend structure
        const transformedAgents = data.map(agent => ({
          id: agent._id,
          name: agent.fullName,
          role: agent.position,
          email: agent.email,
          phone: agent.contactNumber,
          avatarUrl: agent.profileImage || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
          listings: 0, // You might want to add this field to your backend model
        }));
        
        setAgents(transformedAgents);
        setFilteredAgents(transformedAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
        toast.error('Failed to load agents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  // Listen for search event from Header
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchQuery(event.detail);
      setCurrentPage(1); // Reset to first page on search
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, []);

  // Apply search filter
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAgents(agents);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = agents.filter(
        agent =>
          agent.name.toLowerCase().includes(lowercasedQuery) ||
          agent.email.toLowerCase().includes(lowercasedQuery) ||
          agent.role.toLowerCase().includes(lowercasedQuery) ||
          agent.phone.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredAgents(filtered);
    }
  }, [searchQuery, agents]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const currentAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAgent = () => {
    setIsFormOpen(true);
  };

  const handleAgentAdded = (newAgent) => {
    setAgents(prevAgents => [newAgent, ...prevAgents]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800">All Agents ({filteredAgents.length})</h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Agents List */}
        {!isLoading && (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {currentAgents.map((agent) => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <AgentCard agent={agent} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No results */}
        {!isLoading && currentAgents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-medium text-gray-700">No agents found</h3>
            <p className="text-gray-500 mt-1">Try changing your search or add new agents.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {!isLoading && filteredAgents.length > 0 && totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <AgentFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onAgentAdded={handleAgentAdded}
      />

      <FloatingActionButton
        label="Add Agent"
        onClick={handleAddAgent}
      />
    </div>
  );
};

export default AgentsPage;