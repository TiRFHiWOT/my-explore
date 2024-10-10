import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { updateField } from "@/store/slices/aboutAdminSlice";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

export const useImageUpload = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.aboutAdmin.images);
  const [uploadingIndexes, setUploadingIndexes] = useState<number[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const storage = getStorage();
    const newImages: string[] = images ? [...images] : [];
    const newUploadingIndexes: number[] = [];

    setUploadingIndexes((prevIndexes) => [
      ...prevIndexes,
      ...Array.from(files).map((_, index) => index),
    ]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uniqueFileName = `${uuidv4()}_${file.name}`;
      const storageRef = ref(storage, `aboutImages/${uniqueFileName}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        newImages.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      }
    }

    dispatch(updateField({ field: "images", value: newImages }));
    setUploadingIndexes([]);
  };

  return { handleImageUpload, uploadingIndexes };
};
