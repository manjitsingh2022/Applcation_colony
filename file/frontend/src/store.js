import { configureStore } from '@reduxjs/toolkit'
import messageReducer from "./redux/slices/message";
import authReducer from "./redux/slices/auth";
import houseReducer from "./redux/slices/house"
import maintenanceReducer from "./redux/slices/maintenance"
import noticesReducer from "./redux/slices/notice"
const reducer = {
    message: messageReducer,
    auth: authReducer,
    houses: houseReducer,
    maintenances: maintenanceReducer,
    notices: noticesReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})




export default store;