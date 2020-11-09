let selectedConcept = null;
let selectedLanguage = "java";
let currentTheme = "dark";
let selectedTopic = null; 
let languages = ["java", "csharp"];
let themes = {
  light: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css",
  dark: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css",
};
let not = {
  java: "csharp",
  csharp: "java"
};
let langText = {
  java: "Java",
  csharp: "C#"
}
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
      heading.classList.add("sidebar-group");
      const p = document.createElement('p');
      p.innerText = concept.title;
      p.classList.add("sidebar-heading");
      heading.appendChild(p);
      const ul = document.createElement('ul');
      ul.classList.add("sidebar-links", "sidegar-group-links");
      ul.style.display = "inline-block";
      
     //Build submenus
      concept.children.forEach((child) => {
        li = document.createElement('li');
        sp = document.createElement('span');
        sp.classList.add("sidebar-link");
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
});
}



document.querySelector(".bottom").addEventListener("click", (e) => {
  selectedTheme = e.target.id;
  
  
    document.querySelector(".theme").classList.remove(currentTheme + "-theme");
    document.querySelector(".theme").classList.add(selectedTheme + "-theme");
    currentTheme = selectedTheme;
    document.getElementById("prismstyle").href = themes[e.target.id];
    localStorage.setItem("themePref", e.target.id);
 
  
});

document.querySelector(".theme-switcher").addEventListener("change", (e) => {
  console.log(e.target);
  console.log(e.target.checked);
    if (e.target.checked) {
      document.querySelector(".theme").classList.remove("dark-theme");
      document.querySelector(".theme").classList.add("light-theme");
      currentTheme="light";
      document.getElementById("prismstyle").href = themes.light;
      localStorage.setItem("themePref", "light");
    } else {
      document.querySelector(".theme").classList.remove("light-theme");
      document.querySelector(".theme").classList.add("dark-theme");
      currentTheme = "dark";
      document.getElementById("prismstyle").href = themes.dark;
      localStorage.setItem("themePref", "dark");
    }

});


function clearSelection() {
  document.querySelectorAll(".selected-concept").forEach( e => {
    e.classList.remove("selected-concept");
  });
  selectedConcept = null;
};




document.querySelectorAll(".lang-btn").forEach(item => {
  item.addEventListener("click", (e) => {
    if(!e.target.classList.contains(selectedLanguage)) {
    selectedLanguage = not[selectedLanguage];
    document.querySelector(".lang-btn.java").classList.toggle("selected");
    document.querySelector(".lang-btn.csharp").classList.toggle("selected");
    document.querySelector(".language-" + not[selectedLanguage]).classList.add("hidden");
    document.querySelector(".language-" + selectedLanguage).classList.remove("hidden");

    }

    
  })
  });


function toggleLanguage(lang) {
  console.log(lang);
  selectedLangage = lang;
  document.querySelector(".lang-butto." + lang).classList.remove("selected");
  document.querySelector(".lang-butto." + not[lang]).classList.add("selected");
  document.querySelector(".language-" + not[selectedLanguage]).classList.add("hidden");
  document.querySelector(".language-" + selectedLanguage).classList.remove("hidden");
  document.querySelector(".sidebar-h1").innerText = langText[selectedLanguage] + " Concepts";
  //document.getElementById("prismstyle").href = themes[localStorage.getItem("themePref")] ?? themes.default;
  
}


document.addEventListener("readystatechange", () => {
  selectedLanguage = localStorage.getItem("languagePref") ?? "csharp";
  document.getElementById("prismstyle").href = themes[localStorage.getItem("themePref")] ?? themes.dark;
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".language-" + not[selectedLanguage]).classList.add("hidden");
  loadConceptList();
});