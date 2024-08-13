import AppRoutes from "./routes/index.tsx";
import React from "react";
// import 'virtual:svg-icons-register';

const App: React.FC = () => {
  return (
    <div h-full>
      <AppRoutes></AppRoutes>
    </div>
  );
};

export default App;
