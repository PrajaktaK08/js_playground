// Concepts Data
const concepts = [
  {
    id: 1,
    title: "Variables",
    description:
      "Learn var, let and const, declaration, reassignment, scope and hoisting.",
    level: "Beginner",
    slug: "variables",
  },
  {
    id: 2,
    title: "Data Types",
    description:
      "Understand primitive and non-primitive data types in JavaScript.",
    level: "Beginner",
    slug: "data-types",
  },
  {
    id: 3,
    title: "Type Coercion & Conversion",
    description:
      "Learn how JavaScript converts values between different data types.",
    level: "Beginner",
    slug: "type-coercion",
  },
  {
    id: 4,
    title: "Operators",
    description:
      "Explore arithmetic, comparison, logical, assignment and other operators.",
    level: "Beginner",
    slug: "operators",
  },
  {
    id: 5,
    title: "Conditional Statements",
    description:
      "Use if, else, else if and switch to control program decisions.",
    level: "Beginner",
    slug: "conditional-statements",
  },
  {
    id: 6,
    title: "Loops",
    description: "Learn for, while, do while, for...of and for...in loops.",
    level: "Beginner",
    slug: "loops",
  },
  {
    id: 7,
    title: "Functions",
    description:
      "Understand function declarations, expressions, parameters, return values and more.",
    level: "Beginner",
    slug: "functions",
  },
  {
    id: 8,
    title: "Scope",
    description: "Understand global, function and block scope in JavaScript.",
    level: "Intermediate",
    slug: "scope",
  },
  {
    id: 9,
    title: "Hoisting",
    description:
      "Learn how JavaScript handles declarations before code execution.",
    level: "Intermediate",
    slug: "hoisting",
  },
  {
    id: 10,
    title: "Closures",
    description:
      "Understand how functions remember variables from their outer scope.",
    level: "Advanced",
    slug: "closures",
  },
  {
    id: 11,
    title: "this Keyword",
    description:
      "Learn how JavaScript determines the value of this in different contexts.",
    level: "Intermediate",
    slug: "this-keyword",
  },
  {
    id: 12,
    title: "Call, Apply & Bind",
    description:
      "Control function execution context using call, apply and bind.",
    level: "Advanced",
    slug: "call-apply-bind",
  },
  {
    id: 13,
    title: "Objects",
    description: "Create, access, update and work with JavaScript objects.",
    level: "Beginner",
    slug: "objects",
  },
  {
    id: 14,
    title: "Object Destructuring",
    description: "Extract values from objects using modern JavaScript syntax.",
    level: "Intermediate",
    slug: "object-destructuring",
  },
  {
    id: 15,
    title: "Arrays",
    description: "Learn how to create, access, update and work with arrays.",
    level: "Beginner",
    slug: "arrays",
  },
  {
    id: 16,
    title: "Array Methods",
    description:
      "Master map, filter, reduce, find, some, every and other array methods.",
    level: "Intermediate",
    slug: "array-methods",
  },
  {
    id: 17,
    title: "Strings & String Methods",
    description:
      "Work with strings and commonly used string manipulation methods.",
    level: "Beginner",
    slug: "strings",
  },
  {
    id: 18,
    title: "DOM Manipulation",
    description:
      "Select, create, modify and remove HTML elements using JavaScript.",
    level: "Intermediate",
    slug: "dom-manipulation",
  },
  {
    id: 19,
    title: "Events & Event Handling",
    description: "Understand browser events and respond to user interactions.",
    level: "Intermediate",
    slug: "events",
  },
  {
    id: 20,
    title: "Event Bubbling & Delegation",
    description:
      "Understand event propagation, capturing, bubbling and delegation.",
    level: "Advanced",
    slug: "event-delegation",
  },
  {
    id: 21,
    title: "Asynchronous JavaScript",
    description:
      "Understand synchronous and asynchronous execution in JavaScript.",
    level: "Intermediate",
    slug: "async-javascript",
  },
  {
    id: 22,
    title: "Callbacks",
    description: "Learn how functions can be passed and executed as callbacks.",
    level: "Intermediate",
    slug: "callbacks",
  },
  {
    id: 23,
    title: "Promises",
    description: "Handle asynchronous operations using JavaScript promises.",
    level: "Intermediate",
    slug: "promises",
  },
  {
    id: 24,
    title: "async / await",
    description: "Write cleaner asynchronous JavaScript using async and await.",
    level: "Intermediate",
    slug: "async-await",
  },
  {
    id: 25,
    title: "Event Loop",
    description:
      "Understand the call stack, task queue, microtasks and JavaScript execution.",
    level: "Advanced",
    slug: "event-loop",
  },
  {
    id: 26,
    title: "Fetch API & HTTP Requests",
    description:
      "Make network requests and work with API responses using fetch.",
    level: "Intermediate",
    slug: "fetch-api",
  },
  {
    id: 27,
    title: "Error Handling",
    description: "Handle runtime errors using try, catch, finally and throw.",
    level: "Intermediate",
    slug: "error-handling",
  },
  {
    id: 28,
    title: "ES6+ Features",
    description: "Explore modern JavaScript features introduced after ES5.",
    level: "Intermediate",
    slug: "es6-features",
  },
  {
    id: 29,
    title: "Prototypes & Prototype Chain",
    description:
      "Understand inheritance and JavaScript's prototype-based object model.",
    level: "Advanced",
    slug: "prototypes",
  },
  {
    id: 30,
    title: "Modules & JavaScript Architecture",
    description:
      "Organize JavaScript applications using modules and clean architecture.",
    level: "Advanced",
    slug: "modules",
  },
];

// Dom elements
const conceptGrid = document.getElementById("conceptGrid");
const conceptSearch = document.getElementById("conceptSearch");
const conceptCount = document.getElementById("conceptCount");
const noResults = document.getElementById("noResults");

// Create concept card
function createConceptCard(concept) {
  const card = document.createElement("a");
  card.className = "concept-card";
  card.href = `concepts/${concept.slug}.html`;
  card.setAttribute(
    "aria-label", 
    `Learn ${concept.title}`);
   
    card.innerHTML=
    `
    <span class="concept-number"> 
        ${String(concept.id).padStart(2, "0")} 
    </span>

        <h2>${concept.title}</h2> 
        <p>${concept.description}</p>
    <div class="concept-card-footer">
    <span class="concept-level">
        ${concept.level} 
     </span>
     <span
      class="concept-arrow" 
      aria-hidden="true" 
      >
       → 
       </span>
      </div> 
    `;
    return card;

}
// Render concepts
function renderConcepts(list){
    conceptGrid.innerHTML = "";
    if (list.length === 0) 
        { 
            noResults.hidden = false; 
            conceptCount.textContent = "0"; 
            return; 
        }
    noResults.hidden = true;
    const fragment = document.createDocumentFragment();
    list.forEach((concept)=>{
        const card = createConceptCard(concept);
        fragment.appendChild(card);
    })
    conceptGrid.appendChild(fragment);
    conceptCount.textContent=list.length;
}
// Search concepts
function searchConcepts(searchTerm){
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) { 
        renderConcepts(concepts); 
        return; 
    }
    const filteredConcepts = concepts.filter((concept)=>{
        return(
            concept.title
                .toLowerCase()
                .includes(normalizedSearchTerm)
            ||
            concept.description 
                .toLowerCase() 
                .includes(normalizedSearchTerm)
            ||
            concept.level 
                .toLowerCase() 
                .includes(normalizedSearchTerm)
        )
    })
    renderConcepts(filteredConcepts);

};
// Search Event
conceptSearch.addEventListener("input",(event)=>{
    searchConcepts(event.target.value);
})
// Initial render
renderConcepts(concepts);
