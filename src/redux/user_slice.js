import { createSlice } from '@reduxjs/toolkit'
import Cookies from "universal-cookie";

const cookies = new Cookies()
const initialState = {
    token: '',
}

function getInitialState() {
    try {
        const user = cookies.get("token")
        if (user) return user
        else return initialState
    } catch {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    cookies.set("token", state.token, { path: "/", maxAge: 60 * 60 * 24 * 7 });

}

const emptyStorages = () => {
    cookies.remove("token", { path: "/" });
    sessionStorage.clear()
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser(state, action) {
            for (const key in action.payload) {
                if (key === 'profile_image' && action.payload[key])
                    state[key] = `https://api.fereste.ir${action.payload[key]}`
                else state[key] = action.payload[key]
            }
            saveStateToLocalStorage(state)
            return state
        },
        logout(state) {
            state = initialState
            emptyStorages()
            return state
        },
    },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
