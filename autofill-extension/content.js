(async function () {
  console.log(" AUTOFILL - Filling ALL fields including files...");
  
  const data = window.formData;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function fillById(id, value, label) {
    const el = document.getElementById(id);
    if (!el) {
      console.log(` Field not found: ${label}`);
      return false;
    }
    console.log(` Filling ${label}: ${value}`);
    el.focus();
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  function fillByIdSelector(selector, value, label) {
    const el = document.querySelector(selector);
    if (!el) {
      console.log(` Field not found: ${label}`);
      return false;
    }
    console.log(`Filling ${label}: ${value}`);
    el.focus();
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  function handleFileUpload(fileInputId, fileUrl, label) {
    const fileInput = document.getElementById(fileInputId);
    if (!fileInput) {
      console.log(`  FILE UPLOAD: ${label} field not found`);
      console.log(`   📎 File URL for manual upload: ${fileUrl}`);
      return false;
    }
    
    // Note: Direct file upload via JavaScript is restricted for security reasons
    // Browser won't allow setting file path directly
    console.log(`  FILE UPLOAD: ${label}`);
    console.log(`    File URL: ${fileUrl}`);
    console.log(`    NOTE: Please manually upload this file (security restriction)`);
    return false;
  }

  // STEP 1: RESUME UPLOAD
  console.log("\n STEP 1: RESUME UPLOAD");
  handleFileUpload("resume-upload", data.resumeUrl, "Resume");
  await sleep(500);

  // STEP 2: CONTACT INFORMATION
  console.log("\n STEP 2: CONTACT INFORMATION");
  fillById("Contact_Information_firstname", data.firstName, "First Name");
  await sleep(300);
  fillById("Contact_Information_lastname", data.lastName, "Last Name");
  await sleep(300);
  fillById("Contact_Information_email", data.email, "Email");
  await sleep(300);
  
  // Fill country code (input-4)
  fillById("input-4", data.phoneType || "US", "Phone Type/Country Code");
  await sleep(300);
  
  fillById("Contact_Information_phone", data.phoneNumber, "Phone Number");
  await sleep(300);

  // STEP 3: SOURCE - HOW DID YOU HEAR?
  console.log("\n STEP 3: SOURCE");
  fillById("input-7", data.commonQuestions.howDidYouHear, "How did you hear?");
  await sleep(500);

  // STEP 4: DISABILITY INFORMATION
  console.log("\n STEP 4: DISABILITY INFORMATION");
  fillById("Voluntary_Self_Identification_of_Disability_CC305_Name", data.fullName, "Full Name");
  await sleep(300);
  fillById("Voluntary_Self_Identification_of_Disability_CC305_Date", data.lastUpdated, "Date");
  await sleep(300);
  fillById("input-10", data.disabilityStatus, "Disability Status");
  await sleep(500);

  // STEP 5: VETERAN STATUS
  console.log("\n STEP 5: VETERAN STATUS");
  fillById("input-13", data.veteranStatus, "Veteran Status");
  await sleep(500);

  // STEP 6: WILLING TO RELOCATE
  console.log("\n STEP 6: RELOCATION");
  fillById("input-16", data.willingToRelocate ? "Yes" : "No", "Willing to Relocate");
  await sleep(500);

  // STEP 7: COVER LETTER UPLOAD
  console.log("\n STEP 7: COVER LETTER UPLOAD");
  handleFileUpload("cover-letter-upload", data.coverLetterUrl, "Cover Letter");
  await sleep(500);

  // STEP 8: ADDRESS INFORMATION
  console.log("\n STEP 8: ADDRESS INFORMATION");
  fillById("Address_Address_Line_1", data.currentAddress.street, "Street Address");
  await sleep(300);
  fillById("Address_City", data.currentAddress.city, "City");
  await sleep(300);
  fillById("Address_State", data.currentAddress.state, "State");
  await sleep(300);
  fillById("Address_Postal_Code", data.currentAddress.zipCode, "Postal Code");
  await sleep(300);
  fillByIdSelector('input[placeholder*="country"]', data.currentAddress.country, "Country");
  await sleep(500);

  // STEP 9: APPLICATION QUESTIONS
  console.log("\n STEP 9: APPLICATION QUESTIONS");
  fillById("Application_questions_us_annual_salary", data.desiredSalary, "Desired Salary");
  await sleep(300);
  fillById("input-22", data.remoteWorkPreference, "Remote Work Preference");
  await sleep(500);

  // STEP 10: POSITION SPECIFIC QUESTIONS
  console.log("\n STEP 10: POSITION SPECIFIC QUESTIONS");
  fillById("Position_Specific_Questions_Question_Setup_1", "Yes", "Position Question 1");
  await sleep(300);

  // STEP 11: LEGAL QUESTIONS
  console.log("\n STEP 11: LEGAL QUESTIONS");
  fillById("input-25", data.authorizedToWork ? "Yes" : "No", "Authorized to Work");
  await sleep(300);
  fillById("input-28", data.requireSponsorship ? "Yes" : "No", "Require Sponsorship");
  await sleep(300);

  console.log("\n========================================");
  console.log(" COMPLETE AUTOFILL FINISHED!");
  console.log("========================================");
  console.log(" AUTO-FILLED FIELDS (16 fields):");
  console.log("   First Name: " + data.firstName);
  console.log("   Last Name: " + data.lastName);
  console.log("   Email: " + data.email);
  console.log("   Phone: " + data.phoneNumber);
  console.log("   How did you hear: " + data.commonQuestions.howDidYouHear);
  console.log("   Full Name: " + data.fullName);
  console.log("   Date: " + data.lastUpdated);
  console.log("   Disability Status: " + data.disabilityStatus);
  console.log("   Veteran Status: " + data.veteranStatus);
  console.log("   Willing to Relocate: " + (data.willingToRelocate ? "Yes" : "No"));
  console.log("   Address: " + data.currentAddress.street + ", " + data.currentAddress.city + ", " + data.currentAddress.state + " " + data.currentAddress.zipCode);
  console.log("   Country: " + data.currentAddress.country);
  console.log("   Desired Salary: " + data.desiredSalary);
  console.log("   Remote Work: " + data.remoteWorkPreference);
  console.log("   Authorized to Work: " + (data.authorizedToWork ? "Yes" : "No"));
  console.log("   Require Sponsorship: " + (data.requireSponsorship ? "Yes" : "No"));
  console.log("\n📎 FILES (MANUAL UPLOAD REQUIRED):");
  console.log("  📄 Resume: " + data.resumeUrl);
  console.log("  📄 Cover Letter: " + data.coverLetterUrl);
  console.log("\n Security Note:");
  console.log("  Browser security prevents auto-uploading files.");
  console.log("  Please manually upload resume and cover letter.");
  console.log("========================================");
})();
