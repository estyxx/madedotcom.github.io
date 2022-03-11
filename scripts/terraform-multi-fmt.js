const execSync = require("child_process").execSync;
const paths = process.argv.slice(2); // the command to be run is "node terraform-multi-fmt.js <path1> <path2> ...", so slice(2) creates an array of ["path1", "path2", ...]

for (const path of paths) {
  if (!path.includes("terraform-common")) {
    execSync(`terraform fmt ${path}`, { stdio: "inherit" });
  }
}
