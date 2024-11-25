import React, { createContext, useContext, useState } from "react";

const AccessDeniedDialogContext = createContext();

export const AccessDeniedDialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    message: "",
    IconComponent: null,
  });

  const openDialog = ({ title, message, IconComponent }) =>
    setDialogState({ open: true, title, message, IconComponent });

  const closeDialog = () =>
    setDialogState({
      open: false,
      title: "",
      message: "",
      IconComponent: null,
    });

  return (
    <AccessDeniedDialogContext.Provider
      value={{ dialogState, openDialog, closeDialog }}
    >
      {children}
    </AccessDeniedDialogContext.Provider>
  );
};

export const useAccessDeniedDialog = () => {
  return useContext(AccessDeniedDialogContext);
};
