import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

interface Testimonial {
  id: string;
  name: string;
  comment: string;
  image: string;
}

interface TestimonialAdminState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialAdminState = {
  testimonials: [],
  loading: false,
  error: null,
};

// Thunk for fetching testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonialAdmin/fetchTestimonials",
  async () => {
    const testimonialsCollection = collection(db, "testimonials");
    const testimonialsSnapshot = await getDocs(testimonialsCollection);
    const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return testimonialsList as Testimonial[];
  }
);

// Thunk for adding a testimonial
export const addTestimonial = createAsyncThunk(
  "testimonialAdmin/addTestimonial",
  async (testimonial: Omit<Testimonial, "id">) => {
    const testimonialsCollection = collection(db, "testimonials");
    const docRef = await addDoc(testimonialsCollection, testimonial);
    return { id: docRef.id, ...testimonial } as Testimonial;
  }
);

// Thunk for updating a testimonial
export const updateTestimonial = createAsyncThunk(
  "testimonialAdmin/updateTestimonial",
  async (testimonial: Testimonial) => {
    const docRef = doc(db, "testimonials", testimonial.id);
    await updateDoc(docRef, testimonial);
    return testimonial;
  }
);

// Thunk for removing a testimonial
export const removeTestimonial = createAsyncThunk(
  "testimonialAdmin/removeTestimonial",
  async (id: string) => {
    const docRef = doc(db, "testimonials", id);
    await deleteDoc(docRef);
    return id;
  }
);

// Thunk for uploading an image
export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (file: File) => {
    const storageRef = ref(storage, `testimonials/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
);

const testimonialsAdminSlice = createSlice({
  name: "testimonialAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      })
      .addCase(addTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.push(action.payload);
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add testimonial";
      })
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.testimonials.findIndex(
          (testimonial) => testimonial.id === action.payload.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update testimonial";
      })
      .addCase(removeTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== action.payload
        );
        toast.success("Testimonial removed successfully!");
      })
      .addCase(removeTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove testimonial";
      });
  },
});

export default testimonialsAdminSlice.reducer;
