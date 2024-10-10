import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import {
  fetchTimelineItems,
  addTimelineItem,
  updateTimelineItem,
  removeTimelineItem,
} from "@/store/slices/timelineAdminSlice";
import DashboardLayout from "@/components/DashboardLayout/page";
import YearInput from "@/components/Admin/year";
import TextArea from "@/components/Admin/text";
import SaveButton from "@/components/Admin/saveButton";
import TimelineCard from "@/components/Cards/timelineCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimelineAdmin = () => {
  const dispatch = useDispatch();
  const { timelineItems, loading, error } = useSelector(
    (state: RootState) => state.timelineAdmin
  );

  const [year, setYear] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showYear, setShowYear] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    dispatch(fetchTimelineItems() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      setDescription(value);
    } else {
      setYear(value);
    }
  };

  const toggleYear = () => {
    setShowYear(!showYear);
  };

  const toggleText = () => {
    setShowText(!showText);
  };

  const handleAddItem = () => {
    if (year && description) {
      const newItem = { year, description };
      dispatch(addTimelineItem(newItem));
      setYear("");
      setDescription("");
      setShowYear(false);
      setShowText(false);
      toast.success("Timeline item added successfully!");
    } else {
      toast.error("Please fill in all fields before adding an item.");
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setYear(item.year);
    setDescription(item.description || "");
    setShowYear(true);
    setShowText(true);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        year,
        description,
      };
      dispatch(updateTimelineItem(updatedItem));
      setEditingItem(null);
      setYear("");
      setDescription("");
      setShowYear(false);
      setShowText(false);
      toast.success("Timeline item updated successfully!");
    } else {
      toast.error("No item selected for editing.");
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeTimelineItem(itemId));
    toast.success("Timeline item removed successfully!");
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage Timeline
        </h1>

        <div className="space-y-6">
          <YearInput
            year={year}
            handleInputChange={handleInputChange}
            label="Year"
            showYear={showYear}
            toggleYear={toggleYear}
          />
          <TextArea
            name="description"
            value={description}
            handleInputChange={handleInputChange}
            label="Description"
            showText={showText}
            toggleText={toggleText}
          />
        </div>

        <div className="mt-8 flex justify-end items-center">
          <SaveButton
            handleSaveChanges={editingItem ? handleSaveEdit : handleAddItem}
            loading={loading}
            label={editingItem ? "Update Timeline" : "Save Timeline"}
          />
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Saved Timeline Items
          </h2>
          <div className="flex space-x-4">
            {timelineItems.length > 0 ? (
              timelineItems.map((item) => (
                <TimelineCard
                  key={item.id}
                  item={item}
                  handleEditItem={handleEditItem}
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No timeline items available.
              </p>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default TimelineAdmin;
