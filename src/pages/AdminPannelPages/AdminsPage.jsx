import React, { useState, useEffect } from "react";
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
import { MoreVertical, Edit, Trash2, X, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/AdminPannel/ui/dropdown-menu";
import { format, formatDistanceToNow, differenceInMinutes } from "date-fns";

const AdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const itemsPerPage = 10;

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
          role: admin.role || "Admin",
          isOnline: admin.isOnline || false,
          lastActivity: admin.lastActivity ? new Date(admin.lastActivity) : new Date(),
          lastLogin: admin.lastLogin ? new Date(admin.lastLogin) : new Date(),
          adminId: admin.adminId || `ADM${Math.floor(1000 + Math.random() * 9000)}`
        }));
        
        setAdmins(transformedAdmins);
        setFilteredAdmins(transformedAdmins);
      } catch (error) {
        console.error('Error fetching admins:', error);
        toast.error('Failed to load admins. Please try again later.');

        // Use mock data for development
        const mockAdmins = [
          {
            id: "1",
            fullName: "John Smith",
            email: "john.smith@realestate.com",
            username: "johnsmith",
            profileImage: `https://ui-avatars.com/api/?name=John+Smith&background=random`,
            role: "Super Admin",
            isOnline: true,
            lastActivity: new Date(),
            lastLogin: new Date(),
            adminId: "ADM001"
          },
          {
            id: "2",
            fullName: "Jessica Lee",
            email: "jessica.lee@realestate.com",
            username: "jessicalee",
            profileImage: `https://ui-avatars.com/api/?name=Jessica+Lee&background=random`,
            role: "Admin",
            isOnline: true,
            lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
            adminId: "ADM002"
          },
          {
            id: "3",
            fullName: "Robert Johnson",
            email: "robert.j@realestate.com",
            username: "robertj",
            profileImage: `https://ui-avatars.com/api/?name=Robert+Johnson&background=random`,
            role: "Agent Admin",
            isOnline: false,
            lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            adminId: "ADM003"
          },
          {
            id: "4",
            fullName: "Samantha Williams",
            email: "samantha.w@realestate.com",
            username: "samanthaw",
            profileImage: `https://ui-avatars.com/api/?name=Samantha+Williams&background=random`,
            role: "Content Editor",
            isOnline: false,
            lastActivity: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            lastLogin: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            adminId: "ADM004"
          },
          {
            id: "5",
            fullName: "Daniel Brown",
            email: "daniel.b@realestate.com",
            username: "danielb",
            profileImage: `https://ui-avatars.com/api/?name=Daniel+Brown&background=random`,
            role: "Admin",
            isOnline: true,
            lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            lastLogin: new Date(),
            adminId: "ADM005"
          }
        ];
        
        setAdmins(mockAdmins);
        setFilteredAdmins(mockAdmins);
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
          admin.username.toLowerCase().includes(lowercasedQuery) ||
          admin.role.toLowerCase().includes(lowercasedQuery) ||
          admin.adminId.toLowerCase().includes(lowercasedQuery)
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
    setEditingAdmin(null);
    setIsFormOpen(true);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setIsFormOpen(true);
  };

  const handleAdminAdded = (newAdmin) => {
    setAdmins(prevAdmins => [newAdmin, ...prevAdmins]);
  };

  const handleAdminUpdated = (updatedAdmin) => {
    setAdmins(prevAdmins => 
      prevAdmins.map(admin => 
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
  };

  const handleAdminDeleted = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${adminId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete admin');
      }

      toast.success('Admin deleted successfully');
      setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== adminId));
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('Failed to delete admin');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format date for display
  const formatDate = (date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (date >= yesterday) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    } else if (now.getFullYear() === date.getFullYear()) {
      return format(date, 'MMM d, h:mm a');
    } else {
      return format(date, 'MMM d, yyyy, h:mm a');
    }
  };

  // Check if user is online based on activity
  const getOnlineStatus = (admin) => {
    // Consider a user online if they were active in the last 30 minutes
    const minutesSinceLastActivity = differenceInMinutes(new Date(), admin.lastActivity);
    return minutesSinceLastActivity < 30;
  };

  // Format last activity time
  const formatLastActivity = (lastActivity) => {
    const now = new Date();
    const minutesAgo = differenceInMinutes(now, lastActivity);
    
    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else {
      return formatDistanceToNow(lastActivity, { addSuffix: true });
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Users</h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Admin Table */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800">Admin</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800">Role</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800">Email</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800">Status</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800">Last Login</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-800 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence mode="popLayout">
                    {currentAdmins.map((admin) => {
                      const isOnline = getOnlineStatus(admin);
                      return (
                        <motion.tr 
                          key={admin.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden text-center flex items-center justify-center relative">
                                {admin.profileImage ? (
                                  <img 
                                    src={admin.profileImage} 
                                    alt={admin.fullName}
                                    className="h-10 w-10 object-cover" 
                                  />
                                ) : (
                                  <span className="text-lg font-medium text-gray-600">
                                    {admin.fullName.charAt(0)}
                                  </span>
                                )}
                                {isOnline && (
                                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{admin.fullName}</div>
                                <div className="text-xs text-gray-500">ID: {admin.adminId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium" 
                              style={{
                                backgroundColor: 
                                  admin.role === 'Super Admin' ? '#e0f2fe' :
                                  admin.role === 'Property Admin' ? '#f0fdf4' :
                                  admin.role === 'Agent Admin' ? '#fef3c7' : '#f3f4f6',
                                color: 
                                  admin.role === 'Super Admin' ? '#0369a1' :
                                  admin.role === 'Property Admin' ? '#166534' :
                                  admin.role === 'Agent Admin' ? '#92400e' : '#4b5563'
                              }}
                            >
                              {admin.role}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{admin.email}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-sm text-gray-700">{isOnline ? 'Online' : 'Offline'}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                {isOnline ? '' : `Last active ${formatLastActivity(admin.lastActivity)}`}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{formatDate(admin.lastLogin)}</td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="rounded-full p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => handleEditAdmin(admin)} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAdminDeleted(admin.id)} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {currentAdmins.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">No admins found</h3>
                <p className="text-gray-500 mt-1">Try changing your search or add new admins.</p>
              </div>
            )}
            
            {/* Footer with Pagination */}
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {currentPage} of {Math.max(totalPages, 1)}
              </div>
              
              {filteredAdmins.length > 0 && totalPages > 1 && (
                <Pagination>
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
          </div>
        )}
      </div>

      <AdminFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onAdminAdded={handleAdminAdded}
        onAdminUpdated={handleAdminUpdated}
        admin={editingAdmin}
        isEditing={!!editingAdmin}
      />

      <FloatingActionButton
        label="Add Admin"
        onClick={handleAddAdmin}
      />
    </div>
  );
};

export default AdminsPage;