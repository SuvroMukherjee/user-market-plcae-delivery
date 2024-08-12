import { useState } from "react";
import { OrderFilterContext } from "./context";

export const ContextProvider = ({ children }) => {
  const [filterState, setFilterState] = useState({
    statusFilter: [],
    timeFilter: "",
  });
  const isChecked = (value) => {
    return filterState.statusFilter.includes(value);
  };

  return (
    <>
      <OrderFilterContext.Provider
        value={{ filterState, setFilterState, isChecked }}
      >
        {children}
      </OrderFilterContext.Provider>
    </>
  );
};
