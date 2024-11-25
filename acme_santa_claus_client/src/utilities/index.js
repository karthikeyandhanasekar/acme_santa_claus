export const downloadCSV = (data, fileName) => {
  // Convert the JSON data to CSV format
  const headers = Object.keys(data[0]); // Get the headers from the first object
  const rows = data.map(
    (row) => headers.map((header) => row[header]).join(",") // Map row values to headers
  );

  // Create the CSV content by joining headers and rows
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create a Blob object to store the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`; // Specify the filename for download
  link.click(); // Trigger the download
  link.remove();
};
