import { configureStore } from "@reduxjs/toolkit";

import userIdSlice from "./redux/userSlice";

const store = configureStore({
  reducer: {
    UID:userIdSlice
   
  },
});

export default store;
