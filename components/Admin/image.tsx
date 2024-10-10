interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  handleImageUpload,
  name,
}) => (
  <div className="space-y-4">
    <input
      name={name}
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg w-full transition duration-300 ease-in-out transform"
    />
  </div>
);

export default ImageUpload;
