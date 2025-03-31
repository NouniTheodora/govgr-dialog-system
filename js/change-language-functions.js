var languageContent = {
    greek: {
      languageBtn: "EL",
      mainTitle: "Άδεια Ορκωτού Ελεγκτή Λογιστή",
      pageTitle: "Άδεια Ορκωτού Ελεγκτή Λογιστή",
      infoTitle: "Πληροφορίες για την χορήγηση επαγγελματικής άδειας σε Ορκωτούς Ελεγκτές Λογιστές",
      subTitle1: "Αυτό το ερωτηματολόγιο μπορεί να σας βοηθήσει να διαπιστώσετε αν πληροίτε τις προϋποθέσεις για τη χορήγηση άδειας Ορκωτού Ελεγκτή Λογιστή από την Ε.Λ.Τ.Ε.",
      subTitle2: "H συμπλήρωση του ερωτηματολογίου δεν απαιτεί παραπάνω από 10 λεπτά.",
      subTitle3: "Δεν θα αποθηκεύσουμε ούτε θα μοιραστούμε τις απαντήσεις σας.",
      backButton: "Πίσω",
      nextQuestion: "Επόμενη ερώτηση",
      biggerCursor: "Μεγαλύτερος Δρομέας",
      bigFontSize: "Μεγάλο Κείμενο",
      readAloud: "Ανάγνωση",
      changeContrast: "Αντίθεση",
      readingMask: "Μάσκα Ανάγνωσης",
      footerText: "Υλοποίηση για το μάθημα Συστήματα Ηλεκτρονικής Διακυβέρνησης (NG0204), Πανεπιστήμιο Μακεδονίας, 2025, Νούνη Θεοδώρα - mai25040",
      and: "και",
      startBtn:"Ας ξεκινήσουμε",
      chooseAnswer: "Επιλέξτε την απάντησή σας",
      oneAnswer: "Μπορείτε να επιλέξετε μόνο μία επιλογή.",
      errorAn: "Λάθος:",
      choose: "Πρέπει να επιλέξετε μια απάντηση",
    },
    english: {
      languageBtn: "EN",
      mainTitle: "Certified Public Accountant License",
      pageTitle: "Certified Public Accountant License",
      infoTitle: "Information regarding the granting of a professional license to Certified Public Accountants.",
      subTitle1: "This questionnaire can help you determine if you meet the requirements for obtaining a Certified Public Accountant license from the Hellenic Accounting and Auditing Standards Oversight Board (ELTE).",
      subTitle2: "Filling out the questionnaire should take no more than 10 minutes.",
      subTitle3: "We do not store or share your answers.",
      backButton: "Back",
      nextQuestion: "Next question",
      biggerCursor: "Bigger Cursor",
      bigFontSize: "Big Font Size",
      readAloud: "Read Aloud",
      changeContrast: "Change Contrast",
      readingMask: "Reading Mask",
      footerText: "Developed for the course Electronic Governance Systems (NG0204), University of Macedonia, 2025, Nouni Theodora - mai25040",
      and: "and",
      startBtn: "Let's start",
      chooseAnswer: "Choose your answer",
      oneAnswer: "You can select only one option.",
      errorAn: "Error:",
      choose: "You must choose an answer",
    }
};
  
var currentLanguage = localStorage.getItem("preferredLanguage") || "greek";

function toggleLanguage() {
    currentLanguage = currentLanguage === "greek" ? "english" : "greek";
    localStorage.setItem("preferredLanguage", currentLanguage);
    updateContent();
}

function updateContent() {
    var components = document.querySelectorAll(".language-component");
     
    components.forEach(function (component) {
        var componentName = component.dataset.component;
        component.textContent = languageContent[currentLanguage][componentName];
    });
}

updateContent();