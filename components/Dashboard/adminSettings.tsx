import React, { useState } from "react";
import { FaSave, FaPlus, FaTrashAlt } from "react-icons/fa"; // Import icons

const AdminSettings: React.FC = () => {
  // State hooks for managing settings
  const [enableSkillTracking, setEnableSkillTracking] = useState(true);
  const [enableTestimonialsTracking, setEnableTestimonialsTracking] =
    useState(true);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]); // Manage skills
  const [testimonials, setTestimonials] = useState<string[]>([]); // Manage testimonials

  // Handle saving settings
  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      enableSkillTracking,
      enableTestimonialsTracking,
      skills,
      testimonials,
    });
    alert("Settings have been saved successfully.");
  };

  // Add new skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Delete skill
  const deleteSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Add new testimonial
  const addTestimonial = (newTestimonial: string) => {
    setTestimonials([...testimonials, newTestimonial]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Dashboard Settings
      </h2>

      {/* Settings Toggles */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Tracking Settings
        </h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={enableSkillTracking}
            onChange={() => setEnableSkillTracking(!enableSkillTracking)}
            className="mr-2"
          />
          <label className="text-gray-600 dark:text-gray-300">
            Enable Skills Tracking
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={enableTestimonialsTracking}
            onChange={() =>
              setEnableTestimonialsTracking(!enableTestimonialsTracking)
            }
            className="mr-2"
          />
          <label className="text-gray-600 dark:text-gray-300">
            Enable Testimonials Tracking
          </label>
        </div>
      </div>

      {/* Skills Management Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Manage Skills
        </h3>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new skill"
            className="p-2 rounded border border-gray-300 dark:border-gray-600 mr-2"
          />
          <button
            onClick={addSkill}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            <FaPlus /> Add Skill
          </button>
        </div>
        <ul>
          {skills.map((skill, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700"
            >
              <span className="text-gray-600 dark:text-gray-300">{skill}</span>
              <button
                onClick={() => deleteSkill(index)}
                className="text-red-600"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonials Management Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          Manage Testimonials
        </h3>
        {/* Add functionality to manage testimonials here */}
        {/* Example: Call addTestimonial function or manage with text input similar to skills */}
        <p className="text-gray-600 dark:text-gray-300">
          Add or remove testimonials by clicking on the buttons below.
        </p>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveSettings}
        className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 flex items-center"
      >
        <FaSave className="mr-2" /> Save Settings
      </button>
    </div>
  );
};

export default AdminSettings;
