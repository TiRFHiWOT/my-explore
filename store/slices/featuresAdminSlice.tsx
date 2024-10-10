import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Feature {
  id: string;
  name: string;
  icon: string;
  description?: string; // Add description if needed
}

interface FeaturesAdminState {
  features: Feature[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturesAdminState = {
  features: [],
  loading: false,
  error: null,
};

// Fetch features from Firestore
export const fetchFeatures = createAsyncThunk(
  "featuresAdmin/fetchFeatures",
  async () => {
    const featuresCollection = collection(db, "features");
    const featuresSnapshot = await getDocs(featuresCollection);
    const featuresList = featuresSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return featuresList as Feature[];
  }
);

// Add a new feature to Firestore
export const addFeature = createAsyncThunk(
  "featuresAdmin/addFeature",
  async (feature: Omit<Feature, "id">) => {
    const featuresCollection = collection(db, "features");
    const docRef = await addDoc(featuresCollection, feature);
    return { id: docRef.id, ...feature };
  }
);

// Update an existing feature in Firestore
export const updateFeature = createAsyncThunk(
  "featuresAdmin/updateFeature",
  async (feature: Feature) => {
    const featureRef = doc(db, "features", feature.id);
    await updateDoc(featureRef, {
      name: feature.name,
      icon: feature.icon,
      description: feature.description, // Ensure description is updated if necessary
    });
    return feature;
  }
);

// Remove a feature from Firestore
export const removeFeature = createAsyncThunk(
  "featuresAdmin/removeFeature",
  async (featureId: string) => {
    const featureRef = doc(db, "features", featureId);
    await deleteDoc(featureRef);
    return featureId;
  }
);

const featuresAdminSlice = createSlice({
  name: "featuresAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
        state.error = null;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch features";
      })
      .addCase(addFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.features.push(action.payload);
        state.error = null;
      })
      .addCase(addFeature.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add feature";
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        const index = state.features.findIndex(
          (f) => f.id === action.payload.id
        );
        if (index !== -1) {
          state.features[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update feature";
      })
      .addCase(removeFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.features = state.features.filter((f) => f.id !== action.payload);
        state.error = null;
      })
      .addCase(removeFeature.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove feature";
      });
  },
});

export default featuresAdminSlice.reducer;
