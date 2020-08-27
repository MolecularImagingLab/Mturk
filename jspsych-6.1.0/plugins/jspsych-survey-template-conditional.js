/* jspsych-survey-template.js
 * a jspsych plugin extension for measuring items on a likert scale
 *
 * authors: Sam Zorowitz, Dan Bennett
 *
 */

jsPsych.plugins['survey-template-conditional'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-template',
    description: '',
    parameters: {
      items: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Items',
        decription: 'The polar questions associated with the survey'
      },
      scale: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Scale',
        decription: 'The response options associated with the polar questions'
      },
      conditional_items: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Items',
        decription: 'The conditional questions associated with the survey'
      },
      conditional_scale: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        array: true,
        pretty_name: 'Scale',
        decription: 'The response options associated with the conditional questions'
      },
      reverse: {
        type: jsPsych.plugins.parameterType.BOOL,
        array: true,
        pretty_name: 'Randomize Question Order',
        default: [],
        description: 'If true, the corresponding item will be reverse scored'
      },
      instructions: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Instructions',
        decription: 'The instructions associated with the survey'
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      scale_repeat: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale repeat',
        default: 10,
        description: 'The number of items before the scale repeats'
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
      conditional_item_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Item width',
        default: 30,
        description: 'The percentage of a row occupied by an item text'
      },
      conditional_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Survey width',
        default: 70,
        description: 'The percentage of the viewport occupied by the survey'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define survey HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Define CSS constants
    const n  = trial.scale.length;              // Number of item responses
    const n2 = trial.conditional_scale.length;
    const x1 = trial.item_width;                // Width of item prompt (percentage)
    const x2 = (100 - trial.item_width) / n;    // Width of item response (percentage)
    const c1 = trial.conditional_item_width;
    const c2 = (100 - trial.conditional_item_width) / n2;    // Width of item response (percentage)

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

    .survey-template-container-conditional {
      display: grid;
      grid-template-columns: ${c1}% repeat(${n2}, ${c2}%);
      grid-template-rows: auto;
      width: ${trial.survey_width}vw;
      margin: auto;
      background-color: #F0F8FF;
      border-radius: 8px;
    }

    .survey-template-row {
      display: contents;
    }

    .survey-template-row:hover div {
      background-color: #dee8eb;
    }
    .survey-template-header {
      padding: 18px 12px 0px 0;
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
    .survey-template-prompt-conditional {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response {
      padding: 12px 12px 12px 0;
      font-size: 1.15vw;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-template-response-conditional {
      padding: 12px 12px 12px 0;
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
    .survey-template-response-conditional .pseudo-input-conditional {
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

    .survey-template-response .pseudo-input-conditional:after {
      position: absolute;
      left: 6.5px;
      top: -6px;
      height: 2px;
      width: calc(${trial.survey_width}vw * ${c2 / 100} - 100%);
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
      .survey-template-container .conditional {
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
      .survey-template-response .pseudo-input-conditional:after {
        width: calc(1200px * ${c2 / 100} - 30px);
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
      .survey-template-container .conditional{
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
      .survey-template-response .pseudo-input-conditional:after . {
        width: calc(1600px * ${c2 / 100} - 40px);
      }
      .survey-template-footer {
        width: calc(1600px * ${trial.survey_width} / 100);
      }
    }

    .hidden {
      visibility:hidden
    }

    </style>`;

    // Initialize survey.
    html += '<div class="survey-template-wrap"><form id="survey-template-submit">';

    // Add instructions.
    html += '<div class="survey-template-instructions" id="instructions">';
    html += `<p>${trial.instructions}<p>`;
    html += '</div>';

    // Randomize question order.
    var item_order = [];
    for (var i=0; i < trial.items.length; i++){
       item_order.push(i);
    }
    if(trial.randomize_question_order){
       item_order = jsPsych.randomization.shuffle(item_order);
    }

    // Iteratively add items.

    for (var i = 0; i < trial.items.length; i++) {
      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`);

      html += `<div class="survey-template-container" id="Container_${qid}">`;

      // Define response values.
      var polar_values = [];
      for (var j = 0; j < trial.scale.length; j++){ polar_values.push(j); }
      if (trial.reverse[item_order[i]]) { polar_values = polar_values.reverse(); }

      var conditional_values = [];
      for (var j = 0; j < trial.conditional_scale.length; j++){ conditional_values.push(j); }
      if (trial.reverse[item_order[i]]) { conditional_values = conditional_values.reverse(); }

      // Add response headers .
        html += '<div class="survey-template-header"></div>';
        for (var j = 0; j < trial.scale.length; j++) {
          html += `<div class="survey-template-header">${trial.scale[j]}</div>`;
        }

      // Add row.
      html += '<div class="survey-template-row">';
      html += `<div class='survey-template-prompt'>${trial.items[item_order[i]]}</div>`;
      for (let v of polar_values) {
        html += '<div class="survey-template-response">';
        html += '<div class="pseudo-input"></div>';
        html += `<input type="radio" name="Q${qid}" value="${v}" id="Q${qid}.${v}" required>`;
        html += "</div>";
      }
      html += '</div>';
      html += '</div>';

      // create conditonal questions
      html += `<div class="survey-template-container-conditional hidden" id="Container_${qid}_hidden">`;
      html += '<div class="survey-template-header" ></div>';
      for (var j = 0; j < trial.conditional_scale.length; j++) {
        html += `<div class="survey-template-header">${trial.conditional_scale[j]}</div>`;
      }

      // Add row
      html += '<div class="survey-template-row">';
      html += `<div class='survey-template-prompt-conditional'>${trial.conditional_items[item_order[i]]}</div>`;
      for (let v of conditional_values) {
        html += '<div class="survey-template-response-conditional">';
        html += '<div class="pseudo-input-conditional" ></div>';
        html += `<input type="checkbox" name="C${qid}.${v}" value="${v}">`;
        html += "</div>";
      }
      html += '</div>';
      // finish conditional container
      html += '</div>';
    }

    // Add submit button.
    html += '<div class="survey-template-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    // Visibility etc of the conditional items
    const unhide = function(event){
        const targetId = event.currentTarget.id;
        const val = event.target.value;
        const hidden_target = document.getElementById(targetId.concat('_hidden'))
        const hidden_checkbox = hidden_target.querySelectorAll("[type='checkbox']")
        if (val === "0") {
          hidden_target.style.visibility = 'visible'
          for (let h of hidden_checkbox) { h.required = true}
        } else if (val === "1") {
          hidden_target.style.visibility = 'hidden'
          for (let h of hidden_checkbox) { h.required = false}
        }
    }

    const containers = document.querySelectorAll(".survey-template-container")
    for (let c of containers) {c.addEventListener('click',unhide)}



    // remove required if one of the boxes is checked
    const toggle_required = function(event){
      const hidden_checkboxes = document.getElementById(event.currentTarget.id).querySelectorAll("[type='checkbox']");
      //const hidden_checkbox = targetId.querySelectorAll("[type='checkbox']")
      const checked = []
      for (h of hidden_checkboxes){ if (h.checked) checked.push(h) }
      console.log(checked.length);
      if (checked.length > 0) {
        for (let h of hidden_checkboxes) {
          h.required = false}
      } else {
        for (let h of hidden_checkboxes) { h.required = true}
      }
    }

    // if(display_element.querySelector('#jspsych-survey-multi-select-'+i+' input:checked') == null){
    //   display_element.querySelector('#jspsych-survey-multi-select-'+i+' input').setCustomValidity(trial.required_message);
    // } else {
    //   display_element.querySelector('#jspsych-survey-multi-select-'+i+' input').setCustomValidity('');
    // }

    const hidden_containers = document.querySelectorAll(".survey-template-container-conditional")
    for (let h of hidden_containers) {h.addEventListener('click',toggle_required)}




    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

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
