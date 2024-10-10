import { configureStore } from "@reduxjs/toolkit";
import aboutAdminReducer from "./slices/aboutAdminSlice";
import aboutReducer from "./slices/aboutSlice";
import featuresAdminReducer from "./slices/featuresAdminSlice";
import timelineAdminReducer from "@/store/slices/timelineAdminSlice";
import teamAdminReducer from "./slices/teamAdminSlice";
import testimonialAdminReducer from "./slices/testimonialsAdminSlice";
import contactAdminReducer from "./slices/contactAdminSlice";

const store = configureStore({
  reducer: {
    aboutAdmin: aboutAdminReducer,
    about: aboutReducer,
    featuresAdmin: featuresAdminReducer,
    timelineAdmin: timelineAdminReducer,
    teamAdmin: teamAdminReducer,
    testimonialAdmin: testimonialAdminReducer,
    contactAdmin: contactAdminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
