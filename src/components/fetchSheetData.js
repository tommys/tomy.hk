import axios from 'axios';

export async function fetchLastEntry(sheetId, apiKey, columnLetter) {
  try {
    // First, get the total number of rows in the sheet
    const sheetMetadataResponse = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.gridProperties.rowCount&key=${apiKey}`
    );
    const totalRows = sheetMetadataResponse.data.sheets[0].properties.gridProperties.rowCount;

    // Then, fetch the values of the entire specified column
    const columnDataResponse = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${columnLetter}1:${columnLetter}${totalRows}?alt=json&key=${apiKey}`
    );
    const columnValues = columnDataResponse.data.values.map(row => row[0]);

    // Finally, find the last entry in the column
    const lastEntry = columnValues.reverse().find(value => value !== undefined);

    return lastEntry;
  } catch (error) {
    console.error(error);
    return null;
  }
}