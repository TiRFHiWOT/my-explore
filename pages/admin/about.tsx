import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout/page";
import TitleInput from "@/components/Admin/title";
import TextArea from "@/components/Admin/text";
import SaveButton from "@/components/Admin/saveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbout,
  saveAbout,
  updateField,
  removeImage,
} from "@/store/slices/aboutAdminSlice";
import { RootState } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useImageUpload } from "@/components/Admin/imageUpload";
import ImagesSection from "@/components/Admin/imageSection";

const AboutAdmin = () => {
  const dispatch = useDispatch();
  const aboutAdminContent = useSelector((state: RootState) => state.aboutAdmin);
  const { title, description, more, vision, images, loading } =
    aboutAdminContent;
  const { uploadImages, uploading } = useImageUpload();

  const [newImages, setNewImages] = useState<FileList | null>(null);
  const [showSections, setShowSections] = useState({
    title: false,
    description: false,
    more: false,
    vision: false,
    images: false,
  });

  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showVision, setShowVision] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removeImage(index));
    toast.success("Image removed successfully!");
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(saveAbout(aboutAdminContent)).unwrap();
      setShowTitle(false);
      setShowDescription(false);
      setShowMore(false);
      setShowVision(false);
      setShowSections((prev) => ({
        ...prev,
        title: false,
        description: false,
        more: false,
        vision: false,
        images: false,
      }));
      toast.success("Content saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save content.");
    }
  };

  const toggleTitle = () => setShowTitle(!showTitle);
  const toggleDescription = () => setShowDescription(!showDescription);
  const toggleMore = () => setShowMore(!showMore);
  const toggleVision = () => setShowVision(!showVision);
  const toggleSection = (section: keyof typeof showSections) => {
    setShowSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleImageUpload = async () => {
    if (newImages) {
      try {
        const uploadedUrls = await uploadImages(newImages);
        uploadedUrls.forEach((url) => dispatch(addImage(url)));
        setNewImages(null);
        toast.success("Images uploaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload images.");
      }
    } else {
      toast.error("Please select images to upload.");
    }
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800 overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage About Page
        </h1>

        <div className="space-y-6">
          <TitleInput
            name="title"
            title={title}
            handleInputChange={handleInputChange}
            label="Title"
            showTitle={showTitle}
            toggleTitle={toggleTitle}
          />
          <TextArea
            name="description"
            value={description}
            handleInputChange={handleInputChange}
            label="Description"
            showText={showDescription}
            toggleText={toggleDescription}
          />

          <TextArea
            name="more"
            value={more}
            handleInputChange={handleInputChange}
            label="More"
            showText={showMore}
            toggleText={toggleMore}
          />

          <TextArea
            name="vision"
            value={vision}
            handleInputChange={handleInputChange}
            label="Vision"
            showText={showVision}
            toggleText={toggleVision}
          />

          <ImagesSection
            label="Images"
            images={images}
            handleRemoveImage={handleRemoveImage}
            showImages={showSections.images}
            toggleImages={() => toggleSection("images")}
            uploading={uploading}
            handleFileChange={(e) => setNewImages(e.target.files)}
            handleUpload={handleImageUpload}
          />
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-400">{`Don't forget to save changes.`}</p>
          <SaveButton
            handleSaveChanges={handleSaveChanges}
            loading={loading}
            label="Save Content"
          />
        </div>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default AboutAdmin;
