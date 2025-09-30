const { program } = require('commander'); 
const fs = require('fs');

program
  .option('-i, --input <type>', 'input file path')  
  .option('-o, --output <type>', 'output file path (optional)') 
  .option('-d, --display', 'print output to console (optional)') 
  .option('-s, --survived', 'show only passengers, who survived') 
  .option('-a, --age', 'show the age of passengers');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error('Error: Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Error: Cannot find input file');
  process.exit(1);
}


