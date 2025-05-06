import React, { useState, useRef } from "react";
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
import { toast } from "@/components/AdminPannel/ui/sonner";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  fullname: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  profileImage: z.any().optional(),
});

export function AdminFormDialog({ open, onOpenChange, onAdminAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      profileImage: "",
    },
  });

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

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      // Upload image to Cloudinary if selected
      let imageUrl = "";
      if (selectedFile) {
        try {
          toast.info("Uploading image...");
          imageUrl = await uploadToCloudinary(selectedFile);
        } catch (error) {
          toast.error("Image upload failed. Using default image.");
          console.error("Image upload error:", error);
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admins/add-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          fullName: values.fullname,
          email: values.email,
          password: values.password,
          profileImage: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add admin');
      }

      const data = await response.json();

      const newAdmin = {
        id: data._id || `ad${Date.now()}`,
        name: values.fullname,
        email: values.email,
        avatarUrl: imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(values.fullname)}&background=random`,
        lastActive: "Just now",
      };

      if (onAdminAdded) {
        onAdminAdded(newAdmin);
      }

      toast.success("Admin added successfully!");
      form.reset();
      setSelectedFile(null);
      setPreviewUrl("");
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error("Failed to add admin. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Admin</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new admin account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <div 
                        className="relative"
                        onDragEnter={handleDrag}
                      >
                        {previewUrl ? (
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={previewUrl}
                              alt="Profile preview"
                              className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleButtonClick}
                              disabled={isSubmitting}
                              className="bg-white hover:bg-gray-50"
                            >
                              Change Image
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className={`h-32 w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 transition-colors bg-white
                            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={handleButtonClick}
                          >
                            <span>Drag and drop an image here or click to browse</span>
                            <span className="text-sm text-gray-500">
                              Recommended size: 500x500px
                            </span>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin_username" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@estatecompass.com" {...field} className="bg-white" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPreviewUrl("");
                  setSelectedFile(null);
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={isSubmitting}
                className="bg-white hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Admin"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}