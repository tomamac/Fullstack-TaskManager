import { createContext, useContext, useReducer } from "react";

const SnackContext = createContext(null);
const SnackDispatchContext = createContext(null);

export function SnackProvider({ children }) {
  const [snack, dispatch] = useReducer(snackReducer, initialSnack);

  return (
    <SnackContext.Provider value={snack}>
      <SnackDispatchContext.Provider value={dispatch}>
        {children}
      </SnackDispatchContext.Provider>
    </SnackContext.Provider>
  );
}

export function useSnack() {
  return useContext(SnackContext);
}

export function useSnackDispatch() {
  return useContext(SnackDispatchContext);
}

function snackReducer(snack, action) {
  switch (action.type) {
    case "show":
      return { isOpen: true, message: action.message };
    case "hide":
      return { isOpen: false, message: "" };
    default:
      return snack;
  }
}

const initialSnack = {
  isOpen: false,
  message: "",
};
