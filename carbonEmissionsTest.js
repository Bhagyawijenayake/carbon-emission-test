#!/usr/bin/env node
const execSync = require("child_process").execSync;

const ports = [8080, 8081, 8082,8083];
let runs = 0;
const runLimit = 10; // Number of performance tests to run

for (let run = 0; run < runLimit * ports.length; run++) {
  const port = ports[run % ports.length]; // Use modulo to cycle through ports
  let framework;

  if (port === 8080) {
    framework = "js";
  } else if (port === 8081) {
    framework = "react";
  } else if (port === 8082) {
    framework = "angular";
  }else if (port === 8083) {
    framework = "vue";
  }

  console.log(`Running test for app on port ${port} with ${framework}`);

  // Ensure the run is a valid number
  const runNumber = Math.floor(run / ports.length) + 1;

  // Include both framework and run information in the filename
  const path = `${framework}_${runNumber}_${port}`;

  try {
    execSync(`greenframe analyze http://localhost:${port} | tee ${path}.txt`);
  } catch (err) {
    console.log(`Test for app on port ${port} with ${framework} failed`);
    break;
  }

  console.log(`Finished running test for app on port ${port} with ${framework}`);
  runs++;
}

console.log("All finished");
