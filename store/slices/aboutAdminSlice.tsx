import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Firebase Firestore functions
export const fetchAboutContent = async () => {
  const docRef = doc(db, "aboutContent", "aboutPage");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {
      title: "",
      description: "",
      more: "",
      vision: "",
      images: [],
    };
  }
};

export const updateAboutContent = async (aboutContent: any) => {
  const docRef = doc(db, "aboutContent", "aboutPage");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, aboutContent);
    } else {
      await setDoc(docRef, aboutContent);
    }
  } catch (error) {
    console.error("Error updating about content:", error);
    throw error;
  }
};

// Redux slice
export interface AboutAdminState {
  title: string;
  description: string;
  more: string;
  vision: string;
  images: string[];
  loading: boolean;
  error: string | null;
  uploadingIndexes: number[];
}

const initialState: AboutAdminState = {
  title: "",
  description: "",
  more: "",
  vision: "",
  images: [],
  loading: false,
  error: null,
  uploadingIndexes: [],
};

// Thunks
export const fetchAbout = createAsyncThunk(
  "aboutAdmin/fetchAbout",
  async () => {
    const data = await fetchAboutContent();
    return data;
  }
);

export const saveAbout = createAsyncThunk(
  "aboutAdmin/saveAbout",
  async (aboutContent: AboutAdminState) => {
    await updateAboutContent(aboutContent);
    return aboutContent;
  }
);

export const uploadImages = createAsyncThunk(
  "aboutAdmin/uploadImages",
  async (files: FileList, { dispatch, getState }) => {
    const storage = getStorage();
    const state = getState() as { aboutAdmin: AboutAdminState };
    const newImages: string[] = [...state.aboutAdmin.images];
    const newUploadingIndexes: number[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uniqueFileName = `${uuidv4()}_${file.name}`;
      const storageRef = ref(storage, `aboutImages/${uniqueFileName}`);

      try {
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Add the download URL to the images array
        newImages.push(downloadURL);
        newUploadingIndexes.push(i);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      }
    }

    dispatch(updateField({ field: "images", value: newImages }));
    return newUploadingIndexes;
  }
);

// Slice
const aboutAdminSlice = createSlice({
  name: "aboutAdmin",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(
        (_, index) => index !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.more = action.payload.more;
        state.vision = action.payload.vision;
        state.images = action.payload.images;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load content.";
      })
      .addCase(saveAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveAbout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save content.";
      })
      .addCase(uploadImages.pending, (state, action) => {
        state.uploadingIndexes = action.meta.arg.map((_, index) => index);
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadingIndexes = [];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadingIndexes = [];
        toast.error("Failed to upload images.");
      });
  },
});

// Export actions and reducer
export const { updateField, removeImage } = aboutAdminSlice.actions;
export default aboutAdminSlice.reducer;
