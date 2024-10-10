import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} from "@/store/slices/testimonialsAdminSlice";
import DashboardLayout from "@/components/DashboardLayout/page";
import TitleInput from "@/components/Admin/title";
import TextArea from "@/components/Admin/text";
import ImageSection from "@/components/Admin/imgSec";
import SaveButton from "@/components/Admin/saveButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialCard from "@/components/Cards/TestCard";

type Testimonial = {
  id: string;
  name: string;
  comment: string;
  images: string[];
};

const TestimonialsAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state: RootState) => state.testimonialAdmin
  );

  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [showSections, setShowSections] = useState({
    name: false,
    comment: false,
    images: false,
  });

  useEffect(() => {
    dispatch(fetchTestimonials() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "comment") {
      setComment(value);
    }
  };

  const toggleSection = (section: keyof typeof showSections) => {
    setShowSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const validateForm = () => {
    if (!name) {
      toast.error("Name is required.");
      return false;
    }
    if (!comment) {
      toast.error("Comment is required.");
      return false;
    }
    if (images.length === 0) {
      toast.error("Please upload the person's image.");
      return false;
    }
    return true;
  };

  const handleAddItem = async () => {
    if (validateForm()) {
      const newItem = { name, comment, images };
      try {
        await dispatch(addTestimonial(newItem) as any).unwrap();
        resetForm();
        setShowSections(false);
      } catch {
        toast.error("Failed to add testimonial.");
      }
    }
  };

  const handleEditTestimonial = (item: Testimonial) => {
    setEditingItem(item);
    setName(item.name);
    setComment(item.comment);
    setImages(item.images);
    setShowSections({
      name: true,
      comment: true,
      images: true,
    });
  };

  const handleRemoveTestimonial = (testimonialId: string) => {
    dispatch(removeTestimonial(testimonialId) as any);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveEdit = async () => {
    if (editingItem) {
      const updatedItem = { ...editingItem, name, comment, images };
      try {
        await dispatch(updateTestimonial(updatedItem) as any).unwrap();
        resetForm();
        setShowSections({
          name: false,
          comment: false,
          images: false,
        });
        toast.success("Testimonial updated successfully!");
      } catch {
        toast.error("Failed to update testimonial.");
      }
    } else {
      toast.error("No item selected for editing.");
    }
  };

  const handleSaveChanges = async () => {
    if (editingItem) {
      await handleSaveEdit();
    } else {
      await handleAddItem();
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setName("");
    setComment("");
    setImages("");
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage Testimonials
        </h1>

        <div className="space-y-6">
          <TitleInput
            name="name"
            title={name}
            handleInputChange={handleInputChange}
            label="Name"
            showTitle={showSections.name}
            toggleTitle={() => toggleSection("name")}
          />
          <TextArea
            name="comment"
            value={comment}
            handleInputChange={handleInputChange}
            label="Comment"
            showText={showSections.comment}
            toggleText={() => toggleSection("comment")}
          />
          <ImageSection
            name="images"
            label="Profile Picture"
            images={images}
            handleRemoveImage={handleRemoveImage}
            showImages={showSections.images}
            toggleImages={() => toggleSection("images")}
            updateField={(field, value) => {
              if (field === "images") {
                setImages(value);
              }
            }}
          />
        </div>
        <div className="mt-8 flex justify-end items-center">
          <SaveButton
            handleSaveChanges={handleSaveChanges}
            loading={loading}
            label={editingItem ? "Update Testimonial" : "Save Testimonial"}
          />
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wider">
            Testimonials
          </h2>
          <div className="flex flex-wrap space-x-4">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial: any) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  handleEditTestimonial={handleEditTestimonial}
                  handleRemoveTestimonial={handleRemoveTestimonial}
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No team members available.
              </p>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default TestimonialsAdmin;
