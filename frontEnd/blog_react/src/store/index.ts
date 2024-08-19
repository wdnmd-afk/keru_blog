import React from "react";

import { GlobalStore } from "./global";

const stores = React.createContext({
  GlobalStore: new GlobalStore(),
});

export default stores;
