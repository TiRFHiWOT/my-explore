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

// Define the interface for a Timeline Item
interface TimelineItem {
  id: string;
  year: string;
  description: string;
}

// Define the state structure for the slice
interface TimelineAdminState {
  timelineItems: TimelineItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TimelineAdminState = {
  timelineItems: [],
  loading: false,
  error: null,
};

// Fetch timeline items from Firestore
export const fetchTimelineItems = createAsyncThunk(
  "timelineAdmin/fetchTimelineItems",
  async () => {
    const timelineCollection = collection(db, "timeline");
    const timelineSnapshot = await getDocs(timelineCollection);
    const timelineList = timelineSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return timelineList as TimelineItem[];
  }
);

// Add a new timeline item to Firestore
export const addTimelineItem = createAsyncThunk(
  "timelineAdmin/addTimelineItem",
  async (item: Omit<TimelineItem, "id">) => {
    const timelineCollection = collection(db, "timeline");
    const docRef = await addDoc(timelineCollection, item);
    return { id: docRef.id, ...item };
  }
);

// Update an existing timeline item in Firestore
export const updateTimelineItem = createAsyncThunk(
  "timelineAdmin/updateTimelineItem",
  async (item: TimelineItem) => {
    const itemRef = doc(db, "timeline", item.id);
    await updateDoc(itemRef, {
      year: item.year,
      description: item.description,
    });
    return item;
  }
);

// Remove a timeline item from Firestore
export const removeTimelineItem = createAsyncThunk(
  "timelineAdmin/removeTimelineItem",
  async (itemId: string) => {
    const itemRef = doc(db, "timeline", itemId);
    await deleteDoc(itemRef);
    return itemId;
  }
);

// Create the slice
const timelineAdminSlice = createSlice({
  name: "timelineAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelineItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimelineItems.fulfilled, (state, action) => {
        state.loading = false;
        state.timelineItems = action.payload;
        state.error = null;
      })
      .addCase(fetchTimelineItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch timeline items";
      })
      .addCase(addTimelineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTimelineItem.fulfilled, (state, action) => {
        state.loading = false;
        state.timelineItems.push(action.payload);
        state.error = null;
      })
      .addCase(addTimelineItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add timeline item";
      })
      .addCase(updateTimelineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTimelineItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timelineItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.timelineItems[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTimelineItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update timeline item";
      })
      .addCase(removeTimelineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTimelineItem.fulfilled, (state, action) => {
        state.loading = false;
        state.timelineItems = state.timelineItems.filter(
          (item) => item.id !== action.payload
        );
        state.error = null;
      })
      .addCase(removeTimelineItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove timeline item";
      });
  },
});

export default timelineAdminSlice.reducer;
