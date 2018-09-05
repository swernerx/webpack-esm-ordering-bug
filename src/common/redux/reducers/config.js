import { PLATFORM_CHANGED } from "../../actions";

export default (state = {}, action) => {
    switch(action.type) {
        case PLATFORM_CHANGED:
            return;
        default:
            return state;
    }
}
