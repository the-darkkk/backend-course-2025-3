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

const rawData = fs.readFileSync(options.input, 'utf-8');
const passengers = rawData
  .split('\n')
  .filter(line => line.trim() !== '')
  .map(line => JSON.parse(line));

let result = passengers;
if (options.survived) {
  result = result.filter(p => p.Survived === '1' || p.Survived === 1);
}

const formatted = result.map(p => {
  if (options.age) {
    return `${p.Name} ${p.Age} ${p.Ticket}`;
  } else {
    return `${p.Name} ${p.Ticket}`;
  }
}).join('\n');

if (options.display) {
  console.log(formatted);
}

if (options.output) {
  fs.writeFileSync(options.output, formatted, 'utf-8');
}
