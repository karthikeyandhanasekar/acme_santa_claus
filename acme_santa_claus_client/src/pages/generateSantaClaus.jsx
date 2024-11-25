import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DragAndDropFile from "../components/subcomponents/FileUpload";
import { useLoading } from "../components/Loading/loadingProvider";
import DynamicTable from "../components/subcomponents/DynamicTable";
import {
  getAvailableYearsController,
  getYearlyDataController,
  uploadEmployeeFileController,
} from "../controllers/assignmentControllers";
import { Download as DownloadIcon } from "@mui/icons-material";
import { downloadCSV } from "../utilities";
import { useAccessDeniedDialog } from "../components/subcomponents/AccessDenied/AccessDeniedProvider";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("A file is required")
    .test("fileType", "Only CSV files are allowed", (value) => {
      return value && value.type === "text/csv";
    }),
});

const SecretSanta = () => {
  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const [file, setFile] = useState(null);
  const [apiStatus, setAPIStatus] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [availableYears, setAvailableYears] = useState([]); // Placeholder years
  const [loading, setLoading] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`File uploaded for ${type}:`, file.name);
      // Parse CSV and update state based on `type`
    }
  };
  const { startLoading, stopLoading } = useLoading();
  const [tableData, setTableData] = useState([]);
  const dialog = useAccessDeniedDialog();

  const getYearlyData = useCallback(async (year) => {
    try {
      const response = await getYearlyDataController(year);
      setTableData(response.yearData);
    } catch (error) {
      console.error(error);
      if (error.statusCode === 401) {
        const message = error.isNotLogined
          ? "Kindly login to access the application"
          : "Your session has been expired";
        return dialog.openDialog({
          title: "Access Denied",
          message: message,
        });
      }
    }
  }, []);
  const getAvailableYears = async () => {
    try {
      const response = await getAvailableYearsController();
      setAvailableYears(response.yearList);
      setSelectedYear(response.yearList[0]);
    } catch (error) {
      console.error(error);
      if (error.statusCode === 401) {
        const message = error.isNotLogined
          ? "Kindly login to access the application"
          : "Your session has been expired";
        return dialog.openDialog({
          title: "Access Denied",
          message: message,
        });
      }
    }
  };

  const headersCustomTitle = {
    Employee_Name: "Employee Name",
    Employee_EmailID: "Employee ID",
    Secret_Child_Name: "Secret Child Name",
    Secret_Child_EmailID: "Secret Child ID",
  };

  useEffect(() => {
    getAvailableYears();
  }, []);

  // Effect that runs only when selectedYear changes
  useEffect(() => {
    selectedYear && getYearlyData(selectedYear);
  }, [selectedYear, getYearlyData]); // Trigger the effect only when selectedYear changes

  const onSubmit = async () => {
    try {
      startLoading();

      const response = await uploadEmployeeFileController(file);
      if (response) {
        setAPIStatus({
          success: true,
          message: "Secret child has been assigned.",
        });
        setAvailableYears(response.yearList);
        setSelectedYear(response.yearList[0]);
        setTableData(response.totalAssignment);
      }
    } catch (error) {
      console.log(error);
      if (error.statusCode === 401) {
        return dialog.openDialog({
          title: "Access Denied",
          message:
            "Kindly contact check whether you logined or else contact system administrators",
        });
      }
      setAPIStatus({
        ...error,
        success: false,
      });
    } finally {
      stopLoading();
    }
  };

  const handleDownloadCSV = () => {
    // Add your CSV download logic here
    const fileName = `secret_child_assignment_result_${selectedYear}`;

    tableData.length !== 0 && downloadCSV(tableData, fileName);
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h6" align="center" gutterBottom>
        🎁 Secret Santa Generator 🎄
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {/* Generate Assignments Section */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                ✨ Generate New Assignments
              </Typography>
              <Typography variant="body1" gutterBottom>
                Upload a CSV to orchestrate the intricate crucible of this
                year's Secret Santa assignments.
              </Typography>
              {apiStatus && (
                <Alert
                  severity={apiStatus.success ? "success" : "error"}
                  sx={{ mt: 2 }}
                >
                  {apiStatus?.message || apiStatus?.errorMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="file"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DragAndDropFile
                      file={file}
                      setFile={(uploadedFile) => {
                        setFile(uploadedFile);
                        field.onChange(uploadedFile); // Update React Hook Form's state
                      }}
                      accept=".csv"
                      triggerValidation={trigger}
                      setError={setError}
                    />
                  )}
                />
                {/* Error Message */}
                {errors.file?.message && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginTop: "10px", textAlign: "left" }}
                  >
                    {errors.file?.message}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    marginTop: 2,
                    maxWidth: "500px",
                    minWidth: "100px",
                    right: 0,
                  }}
                >
                  Assign
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Year Selection Section */}
          <Card sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap", // Makes it responsive on smaller screens
                  gap: 2, // Adds space between items
                  marginBottom: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Year's Assignments
                </Typography>

                {/* Tooltip with Download icon */}
                <Tooltip title="Download CSV" arrow>
                  <IconButton
                    disabled={tableData.length === 0}
                    onClick={handleDownloadCSV}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1" gutterBottom>
                Select a year to delve into the enigmatic tapestry of past
                Secret Santa pairings.
              </Typography>
              {availableYears.length !== 0 && (
                <TextField
                  select
                  label="Year"
                  value={selectedYear}
                  InputLabelProps={{
                    shrink: selectedYear !== "", // This forces the label to shrink when there's a value
                  }}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                  }}
                  fullWidth
                  // sx={{ marginBottom: "10px" }}
                  sx={{
                    marginBottom: "10px",
                    "& .MuiInputLabel-root": {
                      marginTop: "10px", // Ensure enough space for the label
                    },
                    "& .MuiInputBase-root": {
                      paddingTop: "10px", // Adjust input padding if needed
                    },
                  }}
                >
                  {availableYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <DynamicTable headers={headersCustomTitle} data={tableData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecretSanta;
