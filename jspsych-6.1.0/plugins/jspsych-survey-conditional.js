

jsPsych.plugins['survey-conditional'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-conditional',
    description: '',
    parameters: {
      query: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Items',
        decription: 'The questions associated with the survey'
      },
      conditional_query: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Conditional Items',
        decription: 'The questions associated with the survey',
        default: 'hidden'
      },
      scale: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Scale',
        decription: 'The response options associated with the survey'
      },
      conditional_scale: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Conditional Scale',
        decription: 'The response options associated with the survey'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
      survey_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Survey width',
        default: 80,
        description: 'The percentage of the viewport occupied by the survey'
      },
      item_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Item width',
        default: 50,
        description: 'The percentage of a row occupied by an item text'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '';

    // Define CSS constants
    const n  = trial.conditional_query.length;  // Number of item responses
    const x1 = trial.item_width;                // Width of item prompt (percentage)
    const x2 = (100 - trial.item_width) / n;    // Width of item response (percentage)

    // Insert CSS
    html += `<style>
    .survey-template-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-template-instructions {
      width: ${trial.survey_width}vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-template-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: ${trial.survey_width}vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-template-row {
      display: contents;
    }
    .survey-template-row:hover div {
      background-color: #dee8eb;
    }
    .survey-template-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-template-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response {
      padding: 12px 0 12px 0;
      font-size: 1.15vw;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response input[type='radio'] {
      position: relative;
      width: 13px;
      height: 13px;
    }
    .survey-template-response .pseudo-input {
      position: relative;
      height: 0px;
      width: 0px;
      display: inline-block;
    }
    .survey-template-response .pseudo-input:after {
      position: absolute;
      left: 6.5px;
      top: -6px;
      height: 2px;
      width: calc(${trial.survey_width}vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-template-response:last-child .pseudo-input:after {
      display: none;
    }
    .survey-template-footer {
      margin: auto;
      width: ${trial.survey_width}vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-template-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 1vw;
      color: black;
    }
    @media screen and (max-width: 1200px) {
      .survey-template-instructions {
        width: calc(1200px * ${trial.survey_width} / 100);
        font-size: calc(1200px * 0.0125);
      }
      .survey-template-container {
        width: calc(1200px * ${trial.survey_width} / 100);
      }
      .survey-template-header {
        font-size: calc(1200px * 0.0100);
      }
      .survey-template-prompt {
        font-size: calc(1200px * 0.0115);
      }
      .survey-template-response .pseudo-input:after {
        width: calc(1200px * ${x2 / 100} - 30px);
      }
      .survey-template-footer {
        width: calc(1200px * ${trial.survey_width} / 100);
      }
    }
    @media screen and (min-width: 1600px) {
      .survey-template-instructions {
        width: calc(1600px * ${trial.survey_width} / 100);
        font-size: calc(1600px * 0.0125);
      }
      .survey-template-container {
        width: calc(1600px * ${trial.survey_width} / 100);
      }
      .survey-template-header {
        font-size: calc(1600px * 0.0100);
      }
      .survey-template-prompt {
        font-size: calc(1600px * 0.0115);
      }
      .survey-template-response .pseudo-input:after {
        width: calc(1600px * ${x2 / 100} - 40px);
      }
      .survey-template-footer {
        width: calc(1600px * ${trial.survey_width} / 100);
      }
    }
    </style>`;


    html += '<div class="survey-template-wrap"><form id="survey-template-submit">';

    var values = [];
    for (var j = 0; j < trial.scale.length; j++){ values.push(j); }

    // Add response headers (every N items).
    html += '<div class="survey-template-header"></div>';
    for (var j = 0; j < trial.scale.length; j++) {
      html += `<div class="survey-template-header">${trial.scale[j]}</div>`;
    }

    // Add row.
    html += '<div class="survey-template-row">';
    html += `<div class='survey-template-prompt'>${trial.query}</div>`;

    for (let v of values) {
      html += '<div class="survey-template-response">';
      html += '<div class="pseudo-input"></div>';
      html += `<input type="radio" name="Query" value="${v}" required>`;
      html += "</div>";
    }
    html += '</div>';

    //
    // conditional
    //

    var values = [];
    for (var j = 0; j < trial.conditional_scale.length; j++){ values.push(j); }

    // Add response headers (every N items).
    html += '<div class="survey-template-header" id="conditional" style="visibility:hidden" ></div>';
    for (var j = 0; j < trial.conditional_scale.length; j++) {
      html += `<div class="survey-template-header" style="visibility:visible">${trial.conditional_scale[j]}</div>`;
    }

    // Add row.
    html += '<div class="survey-template-row">';
    html += `<div class='survey-template-prompt' style="visibility:visible" >${trial.conditional_query}</div>`;

    for (let v of values) {
      html += '<div class="survey-template-response">';
      html += '<div class="pseudo-input"></div>';
      html += `<input type="radio" name="Conditioal_query" value="${v}" style="visibility:visible" required>`;
      html += "</div>";
    }
    html += '</div>';

///
////
///



    // Add submit button.
    html += '<div class="survey-template-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

  //  display_element.getElementById("condtional").style.visibility = "hidden"

    display_element.innerHTML = html;


    var listen = document.querySelector("#pseudo-input ")

    const input = document.querySelector('input');
    const log = document.getElementById('values');

    input.addEventListener('input', updateValue);

    function updateValue(e) {
      log.textContent = e.target.value;
    }

    .addEventListener('input', function() {

    var a=document.getElementById("conditional")
    alert(a)
    })


    display_element.querySelector('#survey-template-submit').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "responses": question_data,
          "rt": response_time
        };

        // Update screen
        display_element.innerHTML = '';

        // Move onto next trial
        jsPsych.finishTrial(trialdata);

    });

    var startTime = performance.now();
  };

  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;
})();
