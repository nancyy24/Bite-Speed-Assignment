import { Switch, Route } from "wouter";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlowBuilder from "./pages/flow-builder";
import NotFound from "./pages/not-found";

// Inline Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider;

function Router() {
  return (
    <Switch>
      <Route path="/" component={FlowBuilder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </TooltipProvider>
  );
}

export default App;