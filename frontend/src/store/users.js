const SET_USER = "users/SET_USER"

const setUser = (user) => {
    return {
    type:SET_USER,
    payload:user
    }
}

export const getUserByPk = (id) => async dispatch => {
    let res = await fetch(`/api/users/${id}`)
    let user = await res.json()
    dispatch(setUser(user))
}

const usersReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case SET_USER:{
            newState = {...action.payload}
            return newState
        }
        default:
            return state
    }
}

export default usersReducer
