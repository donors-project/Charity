import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import beneficiaryReducer from "./beneficiarySlice";
import donorReducer from "./donorSlice";
import userIdSlice from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    beneficiary: beneficiaryReducer,
    donor: donorReducer,
    UID: userIdSlice,
  },
});

export default store;
