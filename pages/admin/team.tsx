import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchTeamMembers,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
} from "@/store/slices/teamAdminSlice";
import DashboardLayout from "@/components/DashboardLayout/page";
import TitleInput from "@/components/Admin/title";
import TextArea from "@/components/Admin/text";
import ImageSection from "@/components/Admin/imgSec";
import SocialLinksInput from "@/components/Admin/social";
import SaveButton from "@/components/Admin/saveButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamCard from "@/components/Cards/TeamCard";

type SocialLinks = {
  linkedin: string;
  twitter: string;
  github: string;
};

type TeamMember = {
  id: string;
  title: string;
  description: string;
  images: string[];
  links: SocialLinks;
};

const TeamAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { teamMembers, loading, error } = useSelector(
    (state: RootState) => state.teamAdmin
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [links, setLinks] = useState<SocialLinks>({
    linkedin: "",
    twitter: "",
    github: "",
  });
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [showSections, setShowSections] = useState({
    title: false,
    description: false,
    images: false,
    links: false,
  });

  useEffect(() => {
    dispatch(fetchTeamMembers() as any);
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
    if (name in links) {
      setLinks((prev) => ({ ...prev, [name]: value }));
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const toggleSection = (section: keyof typeof showSections) => {
    setShowSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!title) {
      toast.error("Name is required.");
      return false;
    }
    if (!description) {
      toast.error("Position is required.");
      return false;
    }
    if (!links.linkedin && !links.twitter && !links.github) {
      toast.error("At least one social link is required.");
      return false;
    }
    if (images.length === 0) {
      toast.error("Please upload the member's image.");
      return false;
    }
    return true;
  };

  const handleAddItem = async () => {
    if (validateForm()) {
      const newItem = { title, description, images, links };
      try {
        await dispatch(addTeamMember(newItem) as any).unwrap();
        resetForm();
        setShowSections(false);
      } catch {
        toast.error("Failed to add member.");
      }
    }
  };

  const handleEditMember = (item: TeamMember) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setImages(item.images);
    setLinks(item.links);
    setShowSections({
      title: true,
      description: true,
      images: true,
      links: true,
    });
  };

  const handleRemoveMember = (MemberId: string) => {
    dispatch(removeTeamMember(MemberId) as any);
  };

  const handleSaveEdit = async () => {
    if (editingItem) {
      const updatedItem = { ...editingItem, title, description, images, links };
      try {
        await dispatch(updateTeamMember(updatedItem) as any).unwrap();
        resetForm();
        setShowSections({
          title: false,
          description: false,
          images: false,
          links: false,
        });
        toast.success("Member updated successfully!");
      } catch {
        toast.error("Failed to update member.");
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
    setTitle("");
    setDescription("");
    setImages([]);
    setLinks({ linkedin: "", twitter: "", github: "" });
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage Team
        </h1>

        <div className="space-y-6">
          <TitleInput
            name="title"
            title={title}
            handleInputChange={handleInputChange}
            label="Name"
            showTitle={showSections.title}
            toggleTitle={() => toggleSection("title")}
          />
          <TextArea
            name="description"
            value={description}
            handleInputChange={handleInputChange}
            label="Position"
            showText={showSections.description}
            toggleText={() => toggleSection("description")}
          />
          <SocialLinksInput
            links={links}
            handleInputChange={handleInputChange}
            showLinks={showSections.links}
            toggleLinks={() => toggleSection("links")}
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
            label={editingItem ? "Update Member" : "Save Member"}
          />
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wider">
            Our Members
          </h2>
          <div className="flex flex-wrap space-x-4">
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  handleEditMember={handleEditMember}
                  handleRemoveMember={handleRemoveMember}
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

export default TeamAdmin;
