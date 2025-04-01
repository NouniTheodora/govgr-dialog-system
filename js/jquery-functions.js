$("document").ready(function () {
  var currentQuestion = 0;
  var totalQuestions = 0;
  var userAnswers = {};
  var all_questions;
  var all_questions_en;
  var all_evidences;
  var all_evidences_en;
  var faq;
  var faq_en;

  function hideFormBtns() {
    $("#nextQuestion").hide();
    $("#backButton").hide();
  }

  async function getQuestions() {
    try {
      const response = await fetch("question-utils/all-questions.json");
      const data = await response.json();
      all_questions = data;
      totalQuestions = data.length;
      try {
        const response_1 = await fetch("question-utils/all-questions-en.json");
        const dataEn = await response_1.json();
        all_questions_en = dataEn;
      } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.textContent =
          "Error: Failed to fetch all-questions-en.json.";
        $(".question-container").html(errorMessage);

        hideFormBtns();
      }
    } catch (error_1) {
      const errorMessage_1 = document.createElement("div");
      errorMessage_1.textContent = "Error: Failed to fetch all-questions.json.";
      $(".question-container").html(errorMessage_1);

      hideFormBtns();
    }
  }

  async function getEvidences() {
    try {
      const response = await fetch("question-utils/cpsv.json");
      const data = await response.json();
      all_evidences = data;
      try {
        const response_1 = await fetch("question-utils/cpsv-en.json");
        const dataEn = await response_1.json();
        all_evidences_en = dataEn;
      } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Failed to fetch cpsv-en.json.";
        $(".question-container").html(errorMessage);

        hideFormBtns();
      }
    } catch (error_1) {
      const errorMessage_1 = document.createElement("div");
      errorMessage_1.textContent = "Error: Failed to fetch cpsv.json.";
      $(".question-container").html(errorMessage_1);

      hideFormBtns();
    }
  }

  async function getFaq() {
    try {
      const response = await fetch("question-utils/faq.json");
      const data = await response.json();
      faq = data;
      try {
        const response_1 = await fetch("question-utils/faq-en.json");
        const dataEn = await response_1.json();
        faq_en = dataEn;
      } catch (error) {
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Failed to fetch faq-en.json.";
        $(".question-container").html(errorMessage);
      }
    } catch (error_1) {
      const errorMessage_1 = document.createElement("div");
      errorMessage_1.textContent = "Error: Failed to fetch faq.json.";
      $(".question-container").html(errorMessage_1);
    }
  }

  function getEvidencesById(id) {
    var selectedEvidence;
    currentLanguage === "greek"
      ? (selectedEvidence = all_evidences)
      : (selectedEvidence = all_evidences_en);
    selectedEvidence = selectedEvidence.PublicService.evidence.find(
      (evidence) => evidence.id === id
    );

    if (selectedEvidence) {
      const evidenceListElement = document.getElementById("evidences");
      selectedEvidence.evs.forEach((evsItem) => {
        const listItem = document.createElement("li");
        listItem.textContent = evsItem.name;
        evidenceListElement.appendChild(listItem);
      });
    } else {
      console.log(`Evidence with ID '${givenEvidenceID}' not found.`);
    }
  }

  function setResult(text) {
    const resultWrapper = document.getElementById("resultWrapper");
    const result = document.createElement("h5");
    result.textContent = text;
    resultWrapper.appendChild(result);
  }

  function loadFaqs() {
    var faqData = currentLanguage === "greek" ? faq : faq_en;
    var faqTitle =
      currentLanguage === "greek"
        ? "Συχνές Ερωτήσεις"
        : "Frequently Asked Questions";

    var faqElement = document.createElement("div");

    faqElement.innerHTML = `
        <div class="govgr-heading-m language-component" data-component="faq" tabIndex="15">
          ${faqTitle}
        </div>
    `;

    var ft = 16;
    faqData.forEach((faqItem) => {
      var faqSection = document.createElement("details");
      faqSection.className = "govgr-accordion__section";
      faqSection.tabIndex = ft;

      faqSection.innerHTML = `
        <summary class="govgr-accordion__section-summary">
          <h2 class="govgr-accordion__section-heading">
            <span class="govgr-accordion__section-button">
              ${faqItem.question}
            </span>
          </h2>
        </summary>
        <div class="govgr-accordion__section-content">
          <p class="govgr-body">
          ${convertURLsToLinks(faqItem.answer)}
          </p>
        </div>
      `;

      faqElement.appendChild(faqSection);
      ft++;
    });

    $(".faqContainer").html(faqElement);
  }

  function convertURLsToLinks(text) {
    return text.replace(
      /https:\/\/www\.gov\.gr\/[\S]+/g,
      '<a href="$&" target="_blank">' + "myKEPlive" + "</a>" + "."
    );
  }

  function loadQuestion(questionId, noError) {
    
    $("#nextQuestion").show();
    if (currentQuestion > 0) {
      $("#backButton").show();
    } 

    currentLanguage === "greek"
      ? (question = all_questions[questionId])
      : (question = all_questions_en[questionId]);
    var questionElement = document.createElement("div");

    if (noError) {
      questionElement.innerHTML = `
                <div class='govgr-field'>
                    <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
                        <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
                            ${question.question}
                        </legend>
                        <div class='govgr-radios' id='radios-${questionId}'>
                            <ul>
                                ${question.options
                                  .map(
                                    (option, index) => `
                                    <div class='govgr-radios__item'>
                                        <label class='govgr-label govgr-radios__label'>
                                            ${option}
                                            <input class='govgr-radios__input' type='radio' name='question-option' value='${option}' />
                                        </label>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    </fieldset>
                </div>
            `;
    } else {
      questionElement.innerHTML = `
            <div class='govgr-field govgr-field__error' id='$id-error'>
            <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
                        ${question.question}
                    </legend>
                <fieldset class='govgr-fieldset' aria-describedby='radio-error'>
                    <legend  class='govgr-fieldset__legend govgr-heading-m language-component' data-component='chooseAnswer'>
                        Επιλέξτε την απάντησή σας
                    </legend>
                    <p class='govgr-hint language-component' data-component='oneAnswer'>Μπορείτε να επιλέξετε μόνο μία επιλογή.</p>
                    <div class='govgr-radios id='radios-${questionId}'>
                        <p class='govgr-error-message'>
                            <span class='govgr-visually-hidden language-component' data-component='errorAn'>Λάθος:</span>
                            <span class='language-component' data-component='choose'>Πρέπει να επιλέξετε μια απάντηση</span>
                        </p>
                        
                            ${question.options
                              .map(
                                (option, index) => `
                                <div class='govgr-radios__item'>
                                    <label class='govgr-label govgr-radios__label'>
                                        ${option}
                                        <input class='govgr-radios__input' type='radio' name='question-option' value='${option}' />
                                    </label>
                                </div>
                            `
                              )
                              .join("")}
                    </div>
                </fieldset>
            </div>
        `;

      if (currentLanguage === "english") {
        var components = Array.from(
          questionElement.querySelectorAll(".language-component")
        );
        components.slice(-4).forEach(function (component) {
          var componentName = component.dataset.component;
          component.textContent =
            languageContent[currentLanguage][componentName];
        });
      }
    }

    $(".question-container").html(questionElement);
  }

  function skipToEnd(reasonMessage) {
    const errorEnd = document.createElement("h5");
    const error =
      currentLanguage === "greek"
        ? "Δυστυχώς δεν πληροίτε τις προϋποθέσεις για να υποβάλετε αίτηση για άδεια Ορκωτού Ελεγκτή Λογιστή."
        : "Unfortunately, you do not meet the requirements to apply for the Certified Public Accountant license.";
    errorEnd.className = "govgr-error-summary";
    errorEnd.textContent = error + " " + reasonMessage;
    $(".question-container").html(errorEnd);
    hideFormBtns();
  }

  const rejectionChecks = [
    { index: 0, value: "3", messageKey: "invalidApplicant" },
    { index: 1, value: "2", messageKey: "noExamEU" },
    { index: 2, value: "7", messageKey: "noDegree" },
    { index: 3, value: "1", mustEqual: true, messageKey: "noPractice" },
    { index: 4, value: "1", mustEqual: true, messageKey: "noHours" },
    { index: 5, value: "1", mustEqual: true, messageKey: "noExam" },
    { index: 6, value: "4", messageKey: "noActivity" },
    { index: 7, value: "1", mustEqual: true, messageKey: "noInsurance" },
    { index: 8, value: "2", messageKey: "convicted" }
  ];

  const messages = {
    greek: {
      invalidApplicant: "Η άδεια μπορεί να χορηγηθεί μόνο σε φυσικά πρόσωπα ή ελεγκτικές εταιρείες.",
      noExamEU: "Για να κάνετε χρήση άδειας άλλου κράτους-μέλους, πρέπει πρώτα να περάσετε τις ειδικές εξετάσεις στην ελληνική γλώσσα.",
      noDegree: "Πρέπει να διαθέτετε αναγνωρισμένο τίτλο σπουδών οικονομικής κατεύθυνσης.",
      noPractice: "Απαιτείται τουλάχιστον πενταετής πρακτική άσκηση μέσω του Σ.Ο.Ε.Λ.",
      noHours: "Απαιτούνται τουλάχιστον 1.000 ώρες ελεγκτικής εμπειρίας ανά έτος.",
      noExam: "Πρέπει να έχετε περάσει τις επαγγελματικές εξετάσεις του Σ.Ο.Ε.Λ.",
      noActivity: "Πρέπει να διατηρείτε επαγγελματική δραστηριότητα σχετική με το αντικείμενο.",
      noInsurance: "Πρέπει να είστε ασφαλισμένος σε κύριο ασφαλιστικό φορέα.",
      convicted: "Δεν μπορείτε να λάβετε άδεια λόγω τελεσίδικης καταδίκης για σοβαρά ποινικά αδικήματα."
    },
    english: {
      invalidApplicant: "The license can only be granted to individuals or approved audit firms.",
      noExamEU: "To use a CPA license from another EU country, you must pass the special exams in Greek.",
      noDegree: "You must hold a recognized degree in economics.",
      noPractice: "At least 5 years of practical training through SOEL is required.",
      noHours: "You must have completed at least 1,000 hours of audit experience per year.",
      noExam: "You must have passed the professional exams conducted by SOEL.",
      noActivity: "You must have an active professional practice related to auditing.",
      noInsurance: "You must have active insurance with a primary social security provider.",
      convicted: "You cannot be licensed due to a final conviction for serious criminal offenses."
    }
  };

  $("#startBtn").click(function () {
    $("#intro").html("");
    $("#languageBtn").hide();
    $("#questions-btns").show();
  });

  function retrieveAnswers() {
    let allAnswers = [];
    for (let i = 0; i < totalQuestions; i++) {
      const answer = sessionStorage.getItem("answer_" + i);
      allAnswers.push(answer);
    }
  
    const lang = currentLanguage === "greek" ? "greek" : "english";
    const foreign = sessionStorage.getItem("foreign_license") === "true";
  
    // Κοινός έλεγχος
    if (allAnswers[0] === "3") return skipToEnd(messages[lang].invalidApplicant); // ούτε φυσικό πρόσωπο ούτε εταιρεία
    if (allAnswers[2] === "7") return skipToEnd(messages[lang].noDegree); // χωρίς πτυχίο
    if (allAnswers[8] === "2") return skipToEnd(messages[lang].convicted); // έχει καταδικαστεί
  
    // Ειδικοί έλεγχοι ΜΟΝΟ αν δεν έχει ξένη άδεια
    if (!foreign) {
      if (allAnswers[1] === "2") return skipToEnd(messages[lang].noExamEU); // ούτε άδεια ΕΕ
      if (allAnswers[3] !== "1") return skipToEnd(messages[lang].noPractice);
      if (allAnswers[4] !== "1") return skipToEnd(messages[lang].noHours);
      if (allAnswers[5] !== "1") return skipToEnd(messages[lang].noExam);
      if (allAnswers[6] === "4") return skipToEnd(messages[lang].noActivity);
      if (allAnswers[7] !== "1") return skipToEnd(messages[lang].noInsurance);
    }
  
    // Αν όλα ΟΚ, προχωράμε
    submitForm();
  }  

  function submitForm() {
    const resultWrapper = document.createElement("div");
    const titleText =
      currentLanguage === "greek"
        ? "Είστε επιλέξιμος!"
        : "You are eligible!";
    resultWrapper.innerHTML = `<h1 class='answer'>${titleText}</h1>`;
    resultWrapper.setAttribute("id", "resultWrapper");
    $(".question-container").html(resultWrapper);
  
    const docIntroText = currentLanguage === "greek"
      ? "Τα δικαιολογητικά που πρέπει να προσκομίσετε για να λάβετε την άδεια Ορκωτού Ελεγκτή Λογιστή είναι τα εξής:"
      : "The documents you need to provide in order to obtain the Certified Public Accountant license are the following:";
  
    $(".question-container").append(`<br /><br /><h5 class='answer'>${docIntroText}</h5><br />`);
  
    const evidenceListElement = document.createElement("ol");
    evidenceListElement.setAttribute("id", "evidences");
    $(".question-container").append(evidenceListElement);

    const evidenceSource =
    currentLanguage === "greek" ? all_evidences : all_evidences_en;
    
    evidenceSource.PublicService.evidence.forEach((group) => {
      group.evs.forEach((evsItem) => {
        const listItem = document.createElement("li");
        listItem.textContent = evsItem.name;
        evidenceListElement.appendChild(listItem);
      });
    });
  
    const followUpText = currentLanguage === "greek"
      ? "Βεβαιωθείτε ότι προσκομίζετε όλα τα παρακάτω δικαιολογητικά στον φορέα Σ.Ο.Ε.Λ."
      : "Make sure you submit all the documents bellow to the SOEL authority.";
    
    setResult(followUpText);

    $("#faqContainer").load("faq.html");
  
    hideFormBtns();
  }  

  $("#nextQuestion").click(function () {
    if ($(".govgr-radios__input").is(":checked")) {
      const selectedIndex = $('input[name="question-option"]:checked').index('input[name="question-option"]') + 1;
      userAnswers[currentQuestion] = selectedIndex;
      sessionStorage.setItem("answer_" + currentQuestion, selectedIndex);

      const lang = currentLanguage === "greek" ? "greek" : "english";
      for (let check of rejectionChecks) {
        if (check.index === currentQuestion) {
          if (
            (check.mustEqual && String(selectedIndex) !== check.value) ||
            (!check.mustEqual && String(selectedIndex) === check.value)
          ) {
            currentQuestion = -1;
            skipToEnd(messages[lang][check.messageKey]);
            return;
          }
        }
      }

      if (currentQuestion === 1) {
        if (selectedIndex === 1) {
          sessionStorage.setItem("foreign_license", "true");
        } else {
          sessionStorage.setItem("foreign_license", "false");
        }
      }

      if (
        sessionStorage.getItem("foreign_license") === "true" &&
        currentQuestion === 2
      ) {
        currentQuestion = 8;
      } else {
        currentQuestion++;
      }

      if (currentQuestion === totalQuestions) {
        retrieveAnswers();
      } else {
        loadQuestion(currentQuestion, true);
        if (currentQuestion + 1 === totalQuestions) {
          currentLanguage === "greek"
            ? $("#nextQuestion").text("Υποβολή")
            : $("#nextQuestion").text("Submit");
        }
      }
    } else {
      loadQuestion(currentQuestion, false);
    }
  });

  $("#backButton").click(function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion, true);

      var answer = userAnswers[currentQuestion];
      if (answer) {
        $('input[name="question-option"][value="' + answer + '"]').prop(
          "checked",
          true
        );
      }
    }
  });

  $("#languageBtn").click(function () {
    toggleLanguage();
    loadFaqs();
    if (currentQuestion >= 0 && currentQuestion < totalQuestions - 1)
      loadQuestion(currentQuestion, true);
  });

  $("#questions-btns").hide();

  getQuestions().then(() => {
    getEvidences().then(() => {
      getFaq().then(() => {
        loadFaqs();
        $("#faqContainer").show();
        loadQuestion(currentQuestion, true);
      });
    });
  });
});
