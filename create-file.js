// create-file.js
const fs = require('fs');

// The content of the new JS file
const newFileContent = `
        console.log("Hello from the generated file!");
    `;

fs.writeFile('generated.js', newFileContent, (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("generated.js has been created!");
});