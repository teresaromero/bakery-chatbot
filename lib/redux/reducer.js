const initialStore = {
  daily: null
};

const rootReducer = (store = initialStore, action) => {
  switch (action.type) {
    case "UPDATE":
      store = {
        ...store,
        daily: action.daily
      };
      console.log(store);
      break;

    default:
      return store;
  }

  return store;
};

module.exports = rootReducer;
