import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    initialState:[
        {
            id:1,
            name:"Ali",
            surname:"Alijonov"
        },
        {
            id:2,
            name:"Alish",
            surname:"Alijonov"
        },
        {
            id:3,
            name:"Alijon",
            surname:"Alijonov"
        },
],
    name:"user",
    reducers:{
        create: (state,action) => {
            return [...state , action.payload]
        },
        removeUser: (state,action) => {
            return state.filter(item => item?.id !== action?.payload)
        },
        update: (state,action) => {
            const user = state.find((item) => item.id === action.payload.id);

            if (user) {
              user.name = action.payload.name;
              user.surname = action.payload.surname;
            }
        }
    }
})

export const {create, removeUser, update} = userSlicer.actions;
export default userSlicer.reducer
