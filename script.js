let selectedConcept = null;
let selectedLanguage = "java";
let selectedTopic = null;
let languages = ["java", "csharp"];
let themes = {
  default: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css",
  dark: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css",
  light: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-coy.min.css" 
};
let not = {
  java: "csharp",
  csharp: "java"
};

const concepts = [
  {
    title: "Data Types",
    collapsible: true,
    children: [
      ["data-type", "Data Type"],
      ["primitive", "Primitive Type"],
      ["reference", "Reference Type"]
    ]
  },
  {
    title: "Variables",
    collapsible: true,
    children: [
      ["variable-declaration", "Variable Declaration"],
      ["variable-init", "Variable Initialization"],
      ["variable-declare-init", "Declaration & Initialization"]
    ]
  },
  {
    title: "Conditionals",
    collapsible: true,
    children: [
      ["expression-boolean", "Boolean Expression"]
    ]
  },
  {
    title: "Loops",
    collapsible: true,
    children: [
      ["for-loop", "For Loop"],
      ["loop-init", "Loop Initialization"],
      ["loop-condition", "Loop Condition"],
      ["loop-iterator", "Loop Iterator"]
    ]
  },
  {
    title: "Methods",
    collapsable: true,
    children: [
      ["method", "Method"],
      ["method-name", "Method Name"],
      ["return-type", "Return Type"],
      ["parameter-list", "Parameter List"]
    ]
  },
  {
    title: "Classes and Objects",
    collabsible: true,
    children: [
      ["class-block", "Class"],
      ["constructor", "Constructor"],
      ["class-property", "Properties"],
      ["getter", "Getters"]
    ]
  }
];

function toggleSidebarLink(el) {
  el.classList.toggle("active");
  if(el.style.display === "none") {
    el.style.display = "inline-block";
  } else {
    el.style.display = "none";
  }
}
// Fix This
function loadConceptList() {
  let index = 0;
  concepts.forEach((concept) => {
      const parent = document.getElementById("sidebar-groups");
      
      // Build Sidebar Headings
      const heading = document.createElement('section');
      heading.classList.add("sidebar-group", "collapsible");
      const p = document.createElement('p');
      p.innerText = concept.title;
      p.classList.add("sidebar-heading");
      heading.appendChild(p);
      const ul = document.createElement('ul');
      ul.classList.add("sidebar-links", "sidegar-group-links");
      ul.style.display = "none";
      
     //Build submenus
      concept.children.forEach((child) => {
        li = document.createElement('li');
        sp = document.createElement('span');
        
        sp.innerText = child[1];
        sp.setAttribute("concept-name", child[0]);
        li.appendChild(sp);
        
        sp.addEventListener("click", (e) => {
          let choice = child[0];
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
        ul.appendChild(li);
      })
      heading.appendChild(ul);
      parent.appendChild(heading);

      p.addEventListener("click", (e) => {
        clearSelection();
        let item = e.target.nextElementSibling;
        if(item.classList.contains("active")) {
          toggleSidebarLink(item);
        } else {
          let clear = document.querySelector(".active");
          if(clear !== null) {
            toggleSidebarLink(clear);
          }
          toggleSidebarLink(item);
        }
      })
});
}

  document.getElementById("java").addEventListener("click", () => {
  document.querySelector(".language-csharp").classList.add("hidden");
  document.querySelector(".language-java").classList.remove("hidden");
  selectedLanguage = "java";
  localStorage.setItem("languagePref", "java");
  clearSelection();
});

document.getElementById("csharp").addEventListener("click", () => {
  document.querySelector(".language-java").classList.add("hidden");
  document.querySelector(".language-csharp").classList.remove("hidden");
  selectedLanguage = "csharp";
  localStorage.setItem("languagePref", "csharp");
  clearSelection();
}); 

document.querySelector(".bottom").addEventListener("click", (e) => {
  document.getElementById("prismstyle").href = themes[e.target.id];
  localStorage.setItem("themePref", e.target.id);
});


function clearSelection() {
  document.querySelectorAll(".selected-concept").forEach( e => {
    e.classList.remove("selected-concept");
  });
  selectedConcept = null;
};


document.addEventListener("readystatechange", () => {
  selectedLanguage = localStorage.getItem("languagePref") ?? "csharp";
  document.getElementById("prismstyle").href = themes[localStorage.getItem("themePref")] ?? themes.default;
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".language-" + not[selectedLanguage]).classList.add("hidden");
  loadConceptList();
});