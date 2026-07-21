const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, 'Gateway_Interface_Specifiation_V0.4_Orange_PG.pdf');
const outputPath = path.join(__dirname, 'pdf_text.txt');

if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found at:', pdfPath);
    process.exit(1);
}

console.log('Reading PDF file...');
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log('PDF parsed successfully! Writing to:', outputPath);
    fs.writeFileSync(outputPath, data.text);
    console.log('Metadata:', data.info);
    console.log('Number of pages:', data.numpages);
}).catch(function(err) {
    console.error('Error parsing PDF:', err);
});
