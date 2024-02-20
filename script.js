const LAMBDA_ENDPOINT = "https://zg72s39v3b.execute-api.us-east-2.amazonaws.com/demo-stage/";

var XMLHttpRequest = XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest;

function submitClicked() {
  console.log("submit clicked");


  // collect data from fields and forms
  dataInsertionBody = {
    "FirstName": document.getElementById("text-field-FirstName").value,
    "LastName": document.getElementById("text-field-LastName").value,
    "EmailAddress": document.getElementById("text-field-EmailAddress").value,
    "Zipcode": document.getElementById("text-field-ZipCode").value,
    "DateOfBirth": document.getElementById("text-field-DateOfBirth").value,
    "AboutYourself": getAboutRadioValue(),
    "Interest": getInterestRadioValue(),
    "OptIn": document.getElementById("checkbox-optIn").checked,

    // still need to figure out exactly what each of these values should be
    "Form Name": "sunosi_form",
    "Product Name": "sunosi",
    "Tactic Description": "tactic_description",
    "Link Url": "link_url",
    "BU": "bu",
    "Patient_HCP_Target_Type": "patient_hcp_target_type",
  }

  console.log("Collected data to send to SFMC:")
  console.log(dataInsertionBody);


  // submit data to SFMC
  console.log("Inserting data to SFMC");
  // call DATA_ENDPOINT api. Include dataInsertionBody as the API body
  callLambdaEndpoint(dataInsertionBody);

}

async function callLambdaEndpoint(dataInsertionBody) {
  const body = JSON.stringify(dataInsertionBody);
  
  // Make a request
  fetch(LAMBDA_ENDPOINT)
  .then(response => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.'); 
    }
  })
  .then(data => {
    // Work with JSON data here
    console.log(data); 
  })
  .catch(error => {
    console.log('There was a problem with the request:', error);
  });

}



/*        Utility functions           */

/* get radio values */
function getAboutRadioValue() {
  const aboutRadios = document.querySelectorAll('input[type="radio"].radio-about');
  for (var i = 0; i < aboutRadios.length; i++) {
    if (aboutRadios[i].checked) {
      return aboutRadios[i].value;
    }
  }
}

function getInterestRadioValue() {
  const interestRadios = document.querySelectorAll('input[type="radio"].radio-interest');
  for (var i = 0; i < interestRadios.length; i++) {
    if (interestRadios[i].checked) {
      return interestRadios[i].value;
    }
  }
}
