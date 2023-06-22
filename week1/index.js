const path = require("path");
const printContentOfRandomFile = require("./printContentOfRandomFile");
const printFileList = require("./printFileList");
const { checkPositiveInteger, isPrime } = require("./utils");

// Chay chuong trinh
if (checkPositiveInteger(+process.argv[2])) {
  if (isPrime(+process.argv[2])) {
    printFileList(process.cwd());
  } else {
    printContentOfRandomFile(path.dirname(process.cwd()));
  }
} else {
  console.log("Please check input number");
  process.exit(1);
}
