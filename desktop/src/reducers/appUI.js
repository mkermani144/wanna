const appPropertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RAISE_FAB':
      return {
        fabRaised: true,
      };
    case 'LOWER_FAB':
      return {
        fabRaised: false,
      };
    default:
      return state;
  }
};


export default appPropertiesReducer;
