const appPropertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RAISE_FAB':
      return {
        ...state,
        FABRaised: true,
      };
    case 'LOWER_FAB':
      return {
        ...state,
        FABRaised: false,
      };
    case 'CHANGE_TAB':
      return {
        ...state,
        currentTab: action.tab,
      };
    default:
      return state;
  }
};


export default appPropertiesReducer;
