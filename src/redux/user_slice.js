import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: '',
}
function getInitialState() {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) return user
        else return initialState
    } catch {
        return initialState
    }
}

const saveStateToLocalStorage = (state) => {
    localStorage.setItem('user', JSON.stringify(state))
}

const emptyStorages = () => {
    localStorage.clear()
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

export const {setUser, logout} = userSlice.actions

export default userSlice.reducer
