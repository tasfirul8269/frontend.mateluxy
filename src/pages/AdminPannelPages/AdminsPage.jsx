import React, { useState, useEffect } from "react";
import { AdminCard } from "@/components/AdminPannel/admins/AdminCard";
import { FloatingActionButton } from "@/components/AdminPannel/ui/UIComponents";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/AdminPannel/ui/pagination";
import { AdminFormDialog } from "@/components/AdminPannel/admins/AdminFormDialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;

  // Fetch admins from API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        
        const data = await response.json();
        
        // Transform data to match our frontend structure
        const transformedAdmins = data.map(admin => ({
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          username: admin.username,
          profileImage: admin.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.fullName)}&background=random`,
        }));
        
        setAdmins(transformedAdmins);
        setFilteredAdmins(transformedAdmins);
      } catch (error) {
        console.error('Error fetching admins:', error);
        toast.error('Failed to load admins. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdmins();
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
      setFilteredAdmins(admins);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = admins.filter(
        admin =>
          admin.fullName.toLowerCase().includes(lowercasedQuery) ||
          admin.email.toLowerCase().includes(lowercasedQuery) ||
          admin.username.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredAdmins(filtered);
    }
  }, [searchQuery, admins]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const currentAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAdmin = () => {
    setIsFormOpen(true);
  };

  const handleAdminAdded = (newAdmin) => {
    setAdmins(prevAdmins => [newAdmin, ...prevAdmins]);
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
          <h2 className="text-xl font-medium text-gray-800">System Administrators ({filteredAdmins.length})</h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Admins List */}
        {!isLoading && (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {currentAdmins.map((admin) => (
                <motion.div 
                  key={admin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <AdminCard admin={admin} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No results */}
        {currentAdmins.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-medium text-gray-700">No admins found</h3>
            <p className="text-gray-500 mt-1">Try changing your search or add new admins.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredAdmins.length > 0 && totalPages > 1 && (
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

      <AdminFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onAdminAdded={handleAdminAdded}
      />

      <FloatingActionButton
        label="Add Admin"
        onClick={handleAddAdmin}
      />
    </div>
  );
};

export default AdminsPage;