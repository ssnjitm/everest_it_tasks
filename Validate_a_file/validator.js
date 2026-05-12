import * as fs from 'fs';

 //Function to validate if a file is a valid JSON
 
function validateJsonFile(filePath) {
    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            return;
        }

        try {
            JSON.parse(data);
            console.log(`SUCCESS: "${filePath}" is a valid JSON file.`);
        } catch (parseError) {
            console.log(`INVALID: "${filePath}" is not valid JSON.`);
            console.log(`Reason: ${parseError.message}`);
        }
    });
}

// --- Testing the script ---
validateJsonFile('test.json');
validateJsonFile('invalid.json');