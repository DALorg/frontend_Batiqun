import {
    ADD_PROFILE,
    EDIT_PROFILE,
    DELETE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR
} from ".types";

const initialState = {
    profiles: [],
    profile: {},
    loading: true, 
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            };
        
        case ADD_PROFILE:
            return {
                ...state,
                profiles: state.profiles.concat(action.payload),
                loading: false,
            };

        case EDIT_PROFILE:
            return {
                ...state,
                profiles: state.profiles.map((profile) =>
                    Number(profile.id) === Number(action.payload.id)
                        ? (profile = action.payload)
                        : profile
                ),
                loading: false,
            };

        case DELETE_PROFILE:
            const filteredState = state.profiles.filter(
                (profile) => Number(profile.id) !== Number(action.payload.id)
            );
            return {
                ...state,
                profiles: filteredState
            };
        
        case PROFILE_ERROR:
            return {
                loading:false,
                error: action.payload,
            };
        
            default:
                return state;
    }
}