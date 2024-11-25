import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import ResponsiveLayout from "./components/Layout";
import { LoadingProvider } from "./components/Loading/loadingProvider";
import LoadingScreen from "./components/Loading/LoaderComponent";
import { AccessDeniedDialogProvider } from "./components/subcomponents/AccessDenied/AccessDeniedProvider";
import AccessDeniedDialog from "./components/subcomponents/AccessDenied/AccessDeniedDialog";

function App() {
  const theme = createTheme();
  return (
    <AccessDeniedDialogProvider>
      <LoadingProvider>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <ResponsiveLayout />
        </ThemeProvider>
        <LoadingScreen />
      </LoadingProvider>
      {/* Include the dialog */}
      <AccessDeniedDialog />
    </AccessDeniedDialogProvider>
  );
}

export default App;
