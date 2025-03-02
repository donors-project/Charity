import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import beneficiaryReducer from "./beneficiarySlice";
import donorReducer from "./donorSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    beneficiary: beneficiaryReducer,
    donor: donorReducer,
  },
});

export default store;
