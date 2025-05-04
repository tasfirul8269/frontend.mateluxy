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

// Mock admin data
const MOCK_ADMINS = [
  {
    id: "ad1",
    name: "John Smith",
    email: "john.s@estatecompass.com",
    role: "Super Admin",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    lastActive: "Just now"
  },
  {
    id: "ad2",
    name: "Fatima Al Zahra",
    email: "fatima.z@estatecompass.com",
    role: "Content Admin",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    lastActive: "2 hours ago"
  },
  {
    id: "ad3",
    name: "Robert Chen",
    email: "robert.c@estatecompass.com",
    role: "Agent Admin",
    avatarUrl: "https://randomuser.me/api/portraits/men/36.jpg",
    lastActive: "Yesterday"
  },
  {
    id: "ad4",
    name: "Layla Kumar",
    email: "layla.k@estatecompass.com",
    role: "Property Admin",
    avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
    lastActive: "3 days ago"
  },
  {
    id: "ad5",
    name: "Mohammed Al Farsi",
    email: "mohammed.f@estatecompass.com",
    role: "Super Admin",
    avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    lastActive: "1 week ago"
  }
];

const AdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [filteredAdmins, setFilteredAdmins] = useState(admins);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const itemsPerPage = 4;

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
          admin.name.toLowerCase().includes(lowercasedQuery) ||
          admin.email.toLowerCase().includes(lowercasedQuery) ||
          admin.role.toLowerCase().includes(lowercasedQuery)
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

        {/* Admins List */}
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
                <AdminCard key={admin.id} admin={admin} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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