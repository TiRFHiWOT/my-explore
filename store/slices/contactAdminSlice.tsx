import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface ContactInfo {
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

interface LocationInfo {
  address: string;
  city: string;
  country: string;
}

interface ContactState {
  contactInfo: ContactInfo | null;
  locationInfo: LocationInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactInfo: null,
  locationInfo: null,
  loading: false,
  error: null,
};

export const fetchContactInfo = createAsyncThunk(
  "contactAdmin/fetchContactInfo",
  async (_, { rejectWithValue }) => {
    try {
      const contactDoc = await getDoc(doc(db, "contact", "singleContact"));
      if (contactDoc.exists()) {
        return { ...contactDoc.data() } as ContactInfo;
      } else {
        return null;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLocationInfo = createAsyncThunk(
  "contactAdmin/fetchLocationInfo",
  async (_, { rejectWithValue }) => {
    try {
      const locationDoc = await getDoc(doc(db, "location", "singleLocation"));
      if (locationDoc.exists()) {
        return { ...locationDoc.data() } as LocationInfo;
      } else {
        return null;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContactInfo = createAsyncThunk(
  "contactAdmin/updateContactInfo",
  async (contactInfo: ContactInfo, { rejectWithValue }) => {
    try {
      const contactDocRef = doc(db, "contact", "singleContact");
      const contactDoc = await getDoc(contactDocRef);

      if (contactDoc.exists()) {
        await updateDoc(contactDocRef, contactInfo);
      } else {
        await setDoc(contactDocRef, contactInfo);
      }

      return contactInfo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLocationInfo = createAsyncThunk(
  "contactAdmin/updateLocationInfo",
  async (locationInfo: LocationInfo, { rejectWithValue }) => {
    try {
      const locationDocRef = doc(db, "location", "singleLocation");
      const locationDoc = await getDoc(locationDocRef);

      if (locationDoc.exists()) {
        await updateDoc(locationDocRef, locationInfo);
      } else {
        await setDoc(locationDocRef, locationInfo);
      }

      return locationInfo;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const contactAdminSlice = createSlice({
  name: "contactAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.contactInfo = action.payload;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLocationInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.locationInfo = action.payload;
      })
      .addCase(fetchLocationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.contactInfo = action.payload;
      })
      .addCase(updateContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateLocationInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLocationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.locationInfo = action.payload;
      })
      .addCase(updateLocationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactAdminSlice.reducer;
