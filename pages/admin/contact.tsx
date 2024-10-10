import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchContactInfo,
  updateContactInfo,
  fetchLocationInfo,
  updateLocationInfo,
} from "@/store/slices/contactAdminSlice";
import DashboardLayout from "@/components/DashboardLayout/page";
import ContactInfoInput from "@/components/Admin/contactInfo";
import LocationInput from "@/components/Admin/location";
import SaveButton from "@/components/Admin/saveButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { contactInfo, locationInfo, loading, error } = useSelector(
    (state: RootState) => state.contactAdmin
  );

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [showSections, setShowSections] = useState({
    contactInfo: false,
    location: false,
  });

  useEffect(() => {
    dispatch(fetchContactInfo() as any);
    dispatch(fetchLocationInfo() as any);
  }, [dispatch]);

  useEffect(() => {
    if (contactInfo) {
      setEmail(contactInfo.email);
      setPhone(contactInfo.phone);
      setTwitter(contactInfo.twitter);
      setFacebook(contactInfo.facebook);
      setInstagram(contactInfo.instagram);
    }
    if (locationInfo) {
      setAddress(locationInfo.address);
      setCity(locationInfo.city);
      setCountry(locationInfo.country);
    }
  }, [contactInfo, locationInfo]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "phone") setPhone(value);
    else if (name === "twitter") setTwitter(value);
    else if (name === "facebook") setFacebook(value);
    else if (name === "instagram") setInstagram(value);
    else if (name === "address") setAddress(value);
    else if (name === "city") setCity(value);
    else if (name === "country") setCountry(value);
  };

  const toggleSection = (section: keyof typeof showSections) => {
    setShowSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const validateForm = () => {
    if (!email || !phone || !address || !city || !country) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (validateForm()) {
      const updatedContactInfo = { email, phone, twitter, facebook, instagram };
      const updatedLocationInfo = { address, city, country };

      try {
        await Promise.all([
          dispatch(updateContactInfo(updatedContactInfo) as any).unwrap(),
          dispatch(updateLocationInfo(updatedLocationInfo) as any).unwrap(),
        ]);
        toast.success("Information updated successfully!");
      } catch {
        toast.error("Failed to update information.");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="relative p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-800">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Manage Contact Information
        </h1>

        <div className="space-y-6">
          <ContactInfoInput
            info={{ email, phone, twitter, facebook, instagram }}
            handleInputChange={handleInputChange}
            showContactInfo={showSections.contactInfo}
            toggleContactInfo={() => toggleSection("contactInfo")}
          />

          <LocationInput
            location={{ address, city, country }}
            handleInputChange={handleInputChange}
            showLocation={showSections.location}
            toggleLocation={() => toggleSection("location")}
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-400">{`Don't forget to save changes.`}</p>
          <SaveButton
            handleSaveChanges={handleSaveChanges}
            loading={loading}
            label="Save Changes"
          />
        </div>

        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default ContactAdmin;
