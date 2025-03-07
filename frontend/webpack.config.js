const path = require('path');

module.exports = {
 entry: './src/index.js', // Entry point of your application
 output: {
   filename: 'main.js', // Output bundle file name
   path: path.resolve(__dirname), // Output directory
 },
 devServer: {
   static: {
     directory: path.join(__dirname), // Serve files from 'dist' directory index.html
   },
   compress: true,
   port: 8080, // Port number for the dev server
   open: true, // Automatically open the browser
 },
};
