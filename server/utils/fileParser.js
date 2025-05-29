const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');

// Parse CSV file
exports.parseCSV = (buffer) => {
  try {
    const content = buffer.toString();
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    return records;
  } catch (error) {
    throw new Error(`Failed to parse CSV: ${error.message}`);
  }
};

// Parse Excel file
exports.parseExcel = (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  } catch (error) {
    throw new Error(`Failed to parse Excel: ${error.message}`);
  }
};

// Parse JSON file
exports.parseJSON = (buffer) => {
  try {
    const content = buffer.toString();
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
};