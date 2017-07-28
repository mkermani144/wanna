const appPropertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RAISE_FAB':
      return {
        ...state,
        fabRaised: true,
      };
    case 'LOWER_FAB':
      return {
        ...state,
        fabRaised: false,
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
