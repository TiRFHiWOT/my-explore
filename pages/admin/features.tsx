import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import {
  fetchFeatures,
  addFeature,
  updateFeature,
  removeFeature,
} from "@/store/slices/featuresAdminSlice";
import { AiFillHome, AiFillStar, AiFillHeart } from "react-icons/ai";
import { IconType } from "react-icons";
import DashboardLayout from "@/components/DashboardLayout/page";
import TitleInput from "@/components/Admin/title";
import TextArea from "@/components/Admin/text";
import SaveButton from "@/components/Admin/saveButton";
import SvgIconSelector from "@/components/Admin/svgIconSelector";
import FeatureCard from "@/components/Cards/featuresCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const icons: { name: string; component: IconType }[] = [
  { name: "Home", component: AiFillHome },
  { name: "Star", component: AiFillStar },
  { name: "Heart", component: AiFillHeart },
];

const FeaturesAdmin = () => {
  const dispatch = useDispatch();
  const { features, loading, error } = useSelector(
    (state: RootState) => state.featuresAdmin
  );

  const [selectedIcon, setSelectedIcon] = useState<string>(icons[0].name);
  const [featureName, setFeatureName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [showText, setShowText] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSvg, setShowSvg] = useState(false);

  useEffect(() => {
    dispatch(fetchFeatures());
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
      setFeatureName(value);
    }
  };

  const toggleTitle = () => {
    setShowTitle(!showTitle);
  };
  const toggleText = () => {
    setShowText(!showText);
  };
  const toggleSvg = () => {
    setShowSvg(!showSvg);
  };

  const handleAddFeature = () => {
    if (features.length >= 3) {
      toast.error(
        "You can only add up to 3 features. Please remove one to add a new one."
      );
      return;
    }

    if (featureName && selectedIcon && description) {
      const newFeature = { name: featureName, icon: selectedIcon, description };
      dispatch(addFeature(newFeature));
      setFeatureName("");
      setDescription("");
      setSelectedIcon(icons[0].name);
      setShowTitle(false);
      setShowText(false);
      setShowSvg(false);
      toast.success("Feature added successfully!");
    } else {
      toast.error("Please fill in all fields before adding a feature.");
    }
  };

  const handleEditFeature = (feature: Feature) => {
    setEditingFeature(feature);
    setFeatureName(feature.name);
    setSelectedIcon(feature.icon);
    setDescription(feature.description || "");
    setShowTitle(true);
    setShowText(true);
    setShowSvg(true);
  };

  const handleSaveEdit = () => {
    if (editingFeature) {
      const updatedFeature = {
        ...editingFeature,
        name: featureName,
        icon: selectedIcon,
        description,
      };
      dispatch(updateFeature(updatedFeature));
      setEditingFeature(null);
      setFeatureName("");
      setDescription("");
      setSelectedIcon(icons[0].name);
      setShowTitle(false);
      setShowText(false);
      setShowSvg(false);
      toast.success("Feature updated successfully!");
    } else {
      toast.error("No feature selected for editing.");
    }
  };

  const handleRemoveFeature = (featureId: string) => {
    dispatch(removeFeature(featureId));
    toast.success("Feature removed successfully!");
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage Features
        </h1>

        <div className="space-y-6">
          <TitleInput
            name="title"
            title={featureName}
            handleInputChange={handleInputChange}
            label="Feature Name"
            showTitle={showTitle}
            toggleTitle={toggleTitle}
          />
          <TextArea
            name="description"
            value={description}
            handleInputChange={handleInputChange}
            label="Description"
            showText={showText}
            toggleText={toggleText}
          />
          <SvgIconSelector
            label="Select Icon"
            value={selectedIcon}
            onChange={setSelectedIcon}
            showSvg={showSvg}
            toggleSvg={toggleSvg}
          />
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-400">
            Don&apos;t forget to save changes.
          </p>
          <SaveButton
            handleSaveChanges={
              editingFeature ? handleSaveEdit : handleAddFeature
            }
            label="Save Feature"
            loading={loading}
          />
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Saved Features
          </h2>
          <div className="flex space-x-4">
            {features.length > 0 ? (
              features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  icons={icons}
                  handleEditFeature={handleEditFeature}
                  handleRemoveFeature={handleRemoveFeature}
                />
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No features available.
              </p>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default FeaturesAdmin;
