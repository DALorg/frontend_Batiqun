import { ADD_USERS, DELETE_USERS, GET_USERS, USERS_ERROR, EDIT_USERS } from "./types";

const initialState = {
  users: [],
  user: {},
  bitSuccessEdit: null,
  loading: true,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        user: action.payload.objData,
        bitSuccessEdit: null,
        loading: false,
      };
    case ADD_USERS:
      return {
        ...state,
        users: state.users.concat(action.payload),
        loading: false,
      };
    case EDIT_USERS:
      return {
        ...state,
        users: state.users.map((user) => 
          Number(user.id) === Number(action.payload.id)
          ? (user = action.payload)
          : user
        ),
        bitSuccessEdit: action.payload.bitSuccess,
        loading: false,
      };

    case DELETE_USERS:
      const filteredState = state.users.filter(
        (user) => Number(user.id) !== Number(action.payload.id)
      );
      return { ...state, users: filteredState };

    case USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
