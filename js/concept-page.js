// Editor
const exampleEditor = document.getElementById("exampleEditor");
const exampleOutput = document.getElementById("exampleOutput");
const runExampleButton = document.getElementById("runExample");
const resetExampleButton = document.getElementById("resetExample");
const clearExampleOutputButton = document.getElementById("clearExampleOutput");
const defaultExampleCode = `const username = "Rahul"; 
let age = 25; 
console.log("Name:", username);
 console.log("Age:", age);`;

//  RUN JAVASCRIPT SAFELY ENOUGH FOR THIS LEARNING DEMO
function runCode(code, outputElement) {
  const output = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  console.log = (...args) => {
    const message = args.map(formatConsoleValue).join(" ");
    output.push(message);
  };
  console.error = (...args) => {
    const message = args.map(formatConsoleValue).join(" ");
    output.push(`Error: ${message}`);
  };
  console.warn = (...args) => {
    const message = args.map(formatConsoleValue).join(" ");
    output.push(`Warning: ${message}`);
  };

  try {
    /* * This Function constructor is intentionally used here * because this is a local learning playground where the * learner explicitly chooses the code to execute. */
    const execute = new Function(code);
    execute();
    if (output.length === 0) {
      outputElement.textContent =
        "Code executed successfully. No console output.";
    } else {
      outputElement.textContent = output.join("\n");
    }
  } catch (error) {
    outputElement.textContent = `${error.name}: ${error.message}`;
  } finally {
    /* * Always restore the original console methods. */ console.log =
      originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}
/* ========================================================= FORMAT CONSOLE VALUES ========================================================= */ function formatConsoleValue(
  value,
) {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "undefined") {
    return "undefined";
  }
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Object]";
    }
  }
  return String(value);
}
/* ========================================================= RUN EXAMPLE ========================================================= */ runExampleButton.addEventListener(
  "click",
  () => {
    runCode(exampleEditor.value, exampleOutput);
  },
);
/* ========================================================= RESET EXAMPLE ========================================================= */ resetExampleButton.addEventListener(
  "click",
  () => {
    exampleEditor.value = defaultExampleCode;
    exampleOutput.textContent = 'Click "Run Code" to see the output.';
    exampleEditor.focus();
  },
);
/* ========================================================= CLEAR OUTPUT ========================================================= */ clearExampleOutputButton.addEventListener(
  "click",
  () => {
    exampleOutput.textContent = "Output cleared.";
  },
);
/* ========================================================= INTERVIEW CHALLENGE ========================================================= */ const challengeEditor =
  document.getElementById("challengeEditor");
const challengeOutput = document.getElementById("challengeOutput");
const runChallengeButton = document.getElementById("runChallenge");
const showHintButton = document.getElementById("showHint");
const hintBox = document.getElementById("hintBox");
/* ========================================================= RUN CHALLENGE ========================================================= */ runChallengeButton.addEventListener(
  "click",
  () => {
    runCode(challengeEditor.value, challengeOutput);
  },
);
/* ========================================================= SHOW / HIDE HINT ========================================================= */ showHintButton.addEventListener(
  "click",
  () => {
    hintBox.hidden = !hintBox.hidden;
    showHintButton.textContent = 
    hintBox.hidden 
        ? "💡 Hint" : 
        "🙈 Hide Hint";
  },
);
