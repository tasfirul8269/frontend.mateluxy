import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/AdminPannel/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/AdminPannel/ui/form";
import { Input } from "@/components/AdminPannel/ui/input";
import { Button } from "@/components/AdminPannel/ui/button";
import { toast } from "sonner";
import { Check, X, User, Info, Phone, Lock, Plus, Trash2, XCircle, FileText, Link } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/AdminPannel/ui/select";

const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook', icon: '📘' },
  { value: 'instagram', label: 'Instagram', icon: '📸' },
  { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { value: 'twitter', label: 'Twitter', icon: '🐦' },
  { value: 'youtube', label: 'YouTube', icon: '🎥' },
  { value: 'tiktok', label: 'TikTok', icon: '🎵' },
  { value: 'pinterest', label: 'Pinterest', icon: '📌' },
  { value: 'website', label: 'Website', icon: '🌐' },
];

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).optional(),
  profileImage: z.any().optional(),
  role: z.string().optional(),
});

export function AdminFormDialog({ open, onOpenChange, onAdminAdded, admin, onAdminUpdated, isEditing = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  
  const fileInputRef = useRef(null);
  const usernameCheckTimeout = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      profileImage: "",
      role: "Admin",
    },
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        username: admin.username || "",
        fullName: admin.fullName || "",
        email: admin.email || "",
        password: "********",
        profileImage: admin.profileImage || "",
        role: admin.role || "Admin",
      });
      
      // Set preview URL for profile image from the database
      if (admin.profileImage) {
        setPreviewUrl(admin.profileImage);
      } else {
        setPreviewUrl("");
      }
    } else {
      form.reset({
        username: "",
        fullName: "",
        email: "",
        password: "",
        profileImage: "",
        role: "Admin",
      });
      setPreviewUrl("");
    }
  }, [admin, form]);

  const checkUsernameAvailability = async (username) => {
    // If we're editing and the username hasn't changed, it's available
    if (isEditing && admin && username === admin.username) {
      setIsUsernameAvailable(true);
      return;
    }
    
    if (!username || username.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }
    
    try {
      setIsCheckingUsername(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/check-username?username=${encodeURIComponent(username)}${admin ? `&currentId=${admin.id}` : ''}`,
        {
          credentials: 'include',
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to check username');
      }
      
      const data = await response.json();
      setIsUsernameAvailable(data.available);
    } catch (error) {
      console.error('Error checking username:', error);
      setIsUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    form.setValue('username', username);
    
    if (usernameCheckTimeout.current) {
      clearTimeout(usernameCheckTimeout.current);
    }
    
    usernameCheckTimeout.current = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleImageSelection(file);
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        handleImageSelection(file);
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  const handleImageSelection = (file) => {
    setSelectedFile(file);
    form.setValue("profileImage", file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    setPreviewUrl("");
    setSelectedFile(null);
    setIsUsernameAvailable(null);
    form.reset();
    onOpenChange(false);
  };

  const renderFormFields = () => (
    <div className="space-y-6 w-full">
      {/* Row 1: Username and Full Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    placeholder="Enter username" 
                    {...field} 
                    onChange={handleUsernameChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                {isCheckingUsername && (
                  <div className="absolute right-3 top-2.5 animate-spin h-5 w-5 border-2 border-gray-300 rounded-full border-t-blue-600"></div>
                )}
                {!isCheckingUsername && isUsernameAvailable !== null && (
                  <div className="absolute right-3 top-2.5">
                    {isUsernameAvailable ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {!isCheckingUsername && isUsernameAvailable === false && (
                <p className="text-sm text-red-500 mt-1">Username is already taken</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter full name" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Row 2: Email and Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Enter email address" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditing ? "New Password (leave unchanged to keep current)" : "Password"}</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder={isEditing ? "••••••••" : "Enter password"} 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Property Admin">Property Admin</SelectItem>
                  <SelectItem value="Agent Admin">Agent Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {field.value === "Super Admin" && "Super Admins have full access to all features, including admin management."}
                {field.value === "Property Admin" && "Property Admins can add, edit, and manage properties only."}
                {field.value === "Agent Admin" && "Agent Admins can add, edit, and manage agents only."}
                {field.value === "Admin" && "Regular Admins have limited access to dashboard features."}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="flex flex-col items-center mb-8">
      {/* Profile Image */}
      <div className="relative mb-4">
        <div 
          className={`h-28 w-28 flex items-center justify-center rounded-full overflow-hidden border-2 
          ${dragActive ? "border-blue-500" : "border-gray-200"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={() => setPreviewUrl("")}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
              <Plus className="h-6 w-6 mb-1" />
              <span>Upload Photo</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      
      // If there's a new profile image selected, upload it
      if (selectedFile) {
        try {
          const imageUrl = await uploadToCloudinary(selectedFile);
          values.profileImage = imageUrl;
        } catch (error) {
          toast.error("Failed to upload profile image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Don't send the password if it's the placeholder in edit mode
      if (isEditing && values.password === "********") {
        delete values.password;
      }
      
      const url = isEditing 
        ? `${import.meta.env.VITE_API_URL}/api/${admin.id}`
        : `${import.meta.env.VITE_API_URL}/api/admins`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update admin' : 'Failed to add admin');
      }
      
      const data = await response.json();
      
      toast.success(isEditing ? 'Admin updated successfully' : 'Admin added successfully');
      
      // Transform response to match frontend structure
      const transformedAdmin = {
        id: data._id,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        profileImage: data.profileImage,
        role: data.role || "Admin",
        lastLogin: data.lastLogin ? new Date(data.lastLogin) : new Date(),
        adminId: data.adminId || `ADM${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      if (isEditing && onAdminUpdated) {
        onAdminUpdated(transformedAdmin);
      } else if (!isEditing && onAdminAdded) {
        onAdminAdded(transformedAdmin);
      }
      
      handleCancel();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(isEditing ? 'Failed to update admin' : 'Failed to add admin');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Admin" : "Add New Admin"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the admin's information below."
              : "Fill in the details to create a new admin account."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Profile Section */}
              {renderProfileSection()}

              {/* Form Fields */}
              {renderFormFields()}
            </div>

            <DialogFooter className="px-6 py-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="bg-white hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                {isSubmitting 
                  ? (isEditing ? "Updating..." : "Adding...") 
                  : (isEditing ? "Update" : "Add Admin")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}