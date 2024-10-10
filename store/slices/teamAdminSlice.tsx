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

interface TeamMember {
  id: string;
  title: string;
  description: string;
  images: string[];
  links: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

interface TeamAdminState {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamAdminState = {
  teamMembers: [],
  loading: false,
  error: null,
};

// Thunk for fetching team members
export const fetchTeamMembers = createAsyncThunk(
  "teamAdmin/fetchTeamMembers",
  async () => {
    const teamCollection = collection(db, "team");
    const teamSnapshot = await getDocs(teamCollection);
    const teamList = teamSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return teamList as TeamMember[];
  }
);

// Thunk for adding a team member
export const addTeamMember = createAsyncThunk(
  "teamAdmin/addTeamMember",
  async (teamMember: Omit<TeamMember, "id">) => {
    const teamCollection = collection(db, "team");
    const docRef = await addDoc(teamCollection, teamMember);
    return { id: docRef.id, ...teamMember };
  }
);

// Thunk for updating a team member
export const updateTeamMember = createAsyncThunk(
  "teamAdmin/updateTeamMember",
  async (teamMember: TeamMember) => {
    const teamDoc = doc(db, "team", teamMember.id);
    await updateDoc(teamDoc, teamMember);
    return teamMember;
  }
);

// Thunk for removing a team member
export const removeTeamMember = createAsyncThunk(
  "teamAdmin/removeTeamMember",
  async (id: string) => {
    const teamDoc = doc(db, "team", id);
    await deleteDoc(teamDoc);
    return id;
  }
);

// Thunk for uploading an image
export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (file: File) => {
    const storageRef = ref(storage, `team/${file.name}`);
    await uploadBytes(storageRef, file);
    const URL = await getDownloadURL(storageRef);
    return URL;
  }
);

const teamAdminSlice = createSlice({
  name: "teamAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch team members.";
      })
      .addCase(addTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers.push(action.payload);
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add team member.";
      })
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teamMembers.findIndex(
          (member) => member.id === action.payload.id
        );
        if (index !== -1) {
          state.teamMembers[index] = action.payload;
        }
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update team member.";
      })
      .addCase(removeTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = state.teamMembers.filter(
          (member) => member.id !== action.payload
        );
        toast.success("Member removed successfully!");
      })
      .addCase(removeTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove team member.";
      });
  },
});

export default teamAdminSlice.reducer;
