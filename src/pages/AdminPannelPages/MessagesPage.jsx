import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/AdminPannel/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/AdminPannel/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/AdminPannel/ui/dialog";
import { Button } from "@/components/AdminPannel/ui/button";
import { Badge } from "@/components/AdminPannel/ui/UIComponents";
import { Input } from "@/components/AdminPannel/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/AdminPannel/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminPannel/ui/tabs";
import { EllipsisVertical, Trash2, Mail, ExternalLink, CheckCircle, Clock, Search, PhoneCall, MessageSquare } from "lucide-react";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const messagesPerPage = 10;

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Get API URL with fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      console.log("Fetching messages from:", `${apiUrl}/api/messages`);
      
      // Make API request with credentials to send cookies
      const response = await fetch(`${apiUrl}/api/messages`, {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Handle unauthorized
      if (response.status === 401) {
        console.error("Unauthorized: 401 response");
        toast.error("Session expired. Please log in again.");
        setError("Authentication required. Please log in again.");
        return;
      }
      
      // Handle other errors
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Messages data:", data);
      
      if (data.success) {
        setMessages(data.data);
        setTotalPages(Math.ceil(data.count / messagesPerPage) || 1);
      } else {
        throw new Error(data.message || "Failed to fetch messages");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err.message);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMessages();
  }, []);

  // Open message detail dialog
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
  };

  // Filter messages based on search term and active tab
  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === "" || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && message.status === activeTab;
  });

  // Slice messages for current page
  const currentMessages = filteredMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  // Update message status
  const updateMessageStatus = async (id, status) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const response = await fetch(`${apiUrl}/api/messages/${id}/status`, {
        method: 'PATCH',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        setError("Authentication required. Please log in again.");
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update local messages state
        setMessages(prev => 
          prev.map(msg => msg._id === id ? { ...msg, status } : msg)
        );
        
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, status });
        }
        
        toast.success("Message status updated");
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating message status:", err);
      toast.error("Failed to update message status");
    }
  };

  // Delete message
  const deleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const response = await fetch(`${apiUrl}/api/messages/${messageToDelete._id}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        setError("Authentication required. Please log in again.");
        setDeleteDialogOpen(false);
        setMessageToDelete(null);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update local messages state
        setMessages(prev => 
          prev.filter(msg => msg._id !== messageToDelete._id)
        );
        
        // If the deleted message is currently selected, close the dialog
        if (selectedMessage && selectedMessage._id === messageToDelete._id) {
          setShowMessageDialog(false);
          setSelectedMessage(null);
        }
        
        toast.success("Message deleted successfully");
      } else {
        throw new Error(data.message || "Failed to delete message");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      toast.error("Failed to delete message");
    } finally {
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  // Handle confirmation for message deletion
  const confirmDelete = (message) => {
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  // Get badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge variant="warning">New</Badge>;
      case 'in-progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge variant="warning">New</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy • h:mm a");
    } catch (err) {
      return "Invalid date";
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Improved header section with statistics */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Contact Messages</h1>
            <p className="text-gray-500 text-sm">
              Manage all customer inquiries and communication
            </p>
          </div>
          
          {!loading && !error && (
            <div className="flex flex-wrap gap-3">
              <div className="bg-blue-50 rounded-lg px-4 py-2 min-w-[100px]">
                <div className="text-xs text-blue-500 font-medium mb-1">Total</div>
                <div className="text-xl font-bold text-blue-700">{messages.length}</div>
              </div>
              <div className="bg-yellow-50 rounded-lg px-4 py-2 min-w-[100px]">
                <div className="text-xs text-yellow-500 font-medium mb-1">New</div>
                <div className="text-xl font-bold text-yellow-700">
                  {messages.filter(m => m.status === 'new').length}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg px-4 py-2 min-w-[100px]">
                <div className="text-xs text-green-500 font-medium mb-1">Resolved</div>
                <div className="text-xl font-bold text-green-700">
                  {messages.filter(m => m.status === 'resolved').length}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search and filters - Enhanced with card style */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email or message content..."
              className="pl-10 py-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="new" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                New
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="resolved" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Resolved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Messages Table - Enhanced with better styling */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm flex flex-col justify-center items-center h-64 border border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-8 rounded-xl shadow-sm text-center border border-red-100">
          <MessageSquare className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
          <p className="text-red-600 mb-4">There was a problem loading your messages.</p>
          {(error && error.includes("Authentication")) && (
            <button 
              onClick={() => navigate('/admin-login')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Go to Login
            </button>
          )}
        </div>
      ) : currentMessages.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-100">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <MessageSquare className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm ? "Try a different search term or filter to find what you're looking for." : "No contact messages have been received yet. When customers send inquiries, they'll appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">From</TableHead>
                <TableHead className="hidden md:table-cell font-semibold">Contact</TableHead>
                <TableHead className="font-semibold">Subject</TableHead>
                <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMessages.map((message) => (
                <TableRow 
                  key={message._id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleViewMessage(message)}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{message.name}</span>
                      <span className="text-sm text-gray-500 md:hidden mt-0.5">
                        {message.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Mail className="h-3.5 w-3.5 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 truncate max-w-[200px]">
                        {message.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-gray-700">
                      {message.subject || "General Inquiry"}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-500">
                    {formatDate(message.createdAt)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                          <EllipsisVertical className="h-4 w-4 text-gray-600" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-xl border border-gray-100">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewMessage(message);
                        }} className="cursor-pointer flex items-center gap-2 py-2 text-gray-700 hover:text-blue-600">
                          <Mail className="h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMessageStatus(message._id, 'new');
                          }}
                          disabled={message.status === 'new'}
                          className="cursor-pointer flex items-center gap-2 py-2 text-gray-700 hover:text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Mail className="h-4 w-4" />
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMessageStatus(message._id, 'in-progress');
                          }}
                          disabled={message.status === 'in-progress'}
                          className="cursor-pointer flex items-center gap-2 py-2 text-gray-700 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Clock className="h-4 w-4" />
                          Mark In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMessageStatus(message._id, 'resolved');
                          }}
                          disabled={message.status === 'resolved'}
                          className="cursor-pointer flex items-center gap-2 py-2 text-gray-700 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(message);
                          }}
                          className="cursor-pointer flex items-center gap-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Pagination - Enhanced with better styling */}
      {!loading && !error && filteredMessages.length > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i} className={currentPage === i + 1 ? "hidden sm:block" : totalPages > 5 && (i < currentPage - 2 || i > currentPage + 0) ? "hidden sm:block" : ""}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className={currentPage === i + 1 ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200" : "hover:bg-gray-100"}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Message Detail Dialog - Enhanced with better styling */}
      {selectedMessage && (
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent className="sm:max-w-lg bg-white p-0 rounded-xl overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <DialogTitle className="flex items-center gap-2 text-gray-900">
                <Mail className="h-5 w-5 text-blue-500" />
                Contact Message
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Message details from {selectedMessage.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
                    <p className="font-medium text-gray-900">{selectedMessage.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-blue-600 font-medium">{selectedMessage.email}</p>
                        <a 
                          href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject || 'Your inquiry'}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                    
                    {selectedMessage.phone && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{selectedMessage.phone}</p>
                          <a 
                            href={`tel:${selectedMessage.phone}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PhoneCall className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                    <p className="font-medium text-gray-900">{selectedMessage.subject || "General Inquiry"}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Contact Method</h3>
                    <p className="font-medium text-gray-900 capitalize">{selectedMessage.preferredContact || "Email"}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                    <div className="mt-2 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-gray-800">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              <div className="grid grid-cols-3 gap-2 w-full mb-4">
                <Button
                  variant={selectedMessage.status === 'new' ? "default" : "outline"}
                  className={selectedMessage.status === 'new' ? "bg-yellow-500 hover:bg-yellow-600 border-yellow-500" : "border-gray-200"}
                  onClick={() => updateMessageStatus(selectedMessage._id, 'new')}
                  disabled={selectedMessage.status === 'new'}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  New
                </Button>
                <Button
                  variant={selectedMessage.status === 'in-progress' ? "default" : "outline"}
                  className={selectedMessage.status === 'in-progress' ? "bg-blue-500 hover:bg-blue-600 border-blue-500" : "border-gray-200"}
                  onClick={() => updateMessageStatus(selectedMessage._id, 'in-progress')}
                  disabled={selectedMessage.status === 'in-progress'}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  In Progress
                </Button>
                <Button
                  variant={selectedMessage.status === 'resolved' ? "default" : "outline"}
                  className={selectedMessage.status === 'resolved' ? "bg-green-500 hover:bg-green-600 border-green-500" : "border-gray-200"}
                  onClick={() => updateMessageStatus(selectedMessage._id, 'resolved')}
                  disabled={selectedMessage.status === 'resolved'}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolved
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowMessageDialog(false)}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowMessageDialog(false);
                    confirmDelete(selectedMessage);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog - Enhanced with better styling */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white p-0 rounded-xl overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 py-4">
            {messageToDelete && (
              <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-100">
                <p className="font-medium text-red-700 mb-1">Message from: {messageToDelete.name}</p>
                <p className="text-sm text-red-600 truncate">{messageToDelete.subject || "General Inquiry"}</p>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={deleteMessage}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesPage; 