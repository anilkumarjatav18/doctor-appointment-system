import {configureStore} from '@reduxjs/toolkit'
import { AlertSlice } from './features/AlertSlice'
import { userSlice } from './features/UserSlice'
export default configureStore({
    reducer:{
       alerts:AlertSlice.reducer,
       user:userSlice.reducer,
    },
})