const { createStore } = require("redux");
const rootReducer = require("./reducer");

const store = createStore(rootReducer);

module.exports = store;
