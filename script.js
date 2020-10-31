let selectedConcept = null;
let selectedLanguage = "csharp";

const concepts = [
  {
    name: "class-block",
    text: "Class",
  },
  {
    name: "namespace-block",
    text: "Namespace",
  },
  {
    name: "constructor",
    text: "Constructor",
  },
  {
    name: "method",
    text: "Method",
  },
  {
    name: "method-name",
    text: "Method Name",
  },
  {
    name: "return-type",
    text: "Return Type",
  },
  {
    name: "parameter-list",
    text: "Parameter List",
  }, 
  {
    name: "getter",
    text: "Getter",
  },
  {
    name: "method-call",
    text: "Method Call",
  },
  {
    name: "variable-declaration",
    text: "Variable Declaration",
  },
  {
    name: "data-type",
    text: "Variable Type",
  },
  {
    name: "variable-init",
    text: "Variable Initialization",
  },
  {
    name: "variable-declare-init",
    text: "Combined declaration and initialization",
  },
  {
    name: "primitive",
    text: "Primitive Type",
  },
  {
    name: "reference",
    text: "Reference Type",
  },
  {
    name: "expression-boolean",
    text: "Boolean Expression",
  }
];
function loadConceptList() {
  let index = 0;
  const div = document.getElementById("concept-list");
  concepts.forEach((concept) => {
    const item = document.createElement('div');
    item.id = "code-concept-" + index;
    item.innerText = concept.text;
    item.classList.add("code-concept", concept.name);
    item.setAttribute("data-index", index);
    div.appendChild(item);
    index ++;
  });
}

  document.getElementById("java").addEventListener("click", () => {
  document.querySelector(".language-csharp").classList.add("hidden");
  document.querySelector(".language-java").classList.remove("hidden");
  selectedLanguage = "java";
  clearSelection();
});

document.getElementById("csharp").addEventListener("click", () => {
  document.querySelector(".language-java").classList.add("hidden");
  document.querySelector(".language-csharp").classList.remove("hidden");
  selectedLanguage = "csharp";
  clearSelection();
}); 

document.getElementById("dark").addEventListener("click", () => {
  document.getElementById("prismstyle").href =
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css";
});

document.getElementById("light").addEventListener("click", () => {
  document.getElementById("prismstyle").href =
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-coy.min.css";
});

document.getElementById("default").addEventListener("click", () => {
  document.getElementById("prismstyle").href =
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css";
});

document.getElementById("concept-list").addEventListener("click", (e) => {
  let choice = concepts[e.target.getAttribute("data-index")].name;

  if(selectedConcept === choice) {
    clearSelection();
  } 
  else {
    clearSelection();
    e.target.classList.add("selected-concept");
    let els = Array.from(document.getElementsByClassName(choice));
    els.forEach( item => {
      item.classList.add("selected-concept");
    });
    selectedConcept = choice;
  }
});

function clearSelection() {
  document.querySelectorAll(".selected-concept").forEach( e => {
    console.log(e);
    e.classList.remove("selected-concept");
  });
  selectedConcept = null;
}

document.addEventListener("DOMContentLoaded", () => {
  loadConceptList();
});