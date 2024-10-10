import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAboutContent } from "@/components/Firebase/about";

interface AboutPageState {
  title: string;
  description: string;
  more: string;
  vision: string;
  images: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AboutPageState = {
  title: "",
  description: "",
  more: "",
  vision: "",
  images: [],
  loading: false,
  error: null,
};

export const getAboutPageData = createAsyncThunk(
  "about/getAboutPageData",
  async () => {
    const data = await fetchAboutContent();
    return data;
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAboutPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.more = action.payload.more;
        state.vision = action.payload.vision;
        state.images = action.payload.images;
      })
      .addCase(getAboutPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default aboutSlice.reducer;
