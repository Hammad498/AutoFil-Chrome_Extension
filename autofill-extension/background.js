chrome.action.onClicked.addListener(async (tab) => {
  // Detect when a user is on an Eightfold AI job application page (PTC)
  if (!tab.url) {
    console.log(" No URL detected");
    return;
  }

  // Check if URL matches Eightfold AI PTC patterns
  const isEightfoldAI = tab.url.includes("eightfold.ai");
  const isPTCCareers = tab.url.includes("ptc.eightfold.ai") || tab.url.includes("ptc/");
  const isApplicationPage = tab.url.includes("/careers/apply") || tab.url.includes("apply?pid");

  if (!isEightfoldAI || !isApplicationPage) {
    console.log(" Not a PTC Eightfold application page");
    console.log("   URL must contain: eightfold.ai AND /careers/apply");
    console.log("   Current URL: " + tab.url);
    alert(" Please open a PTC Eightfold job application page.\n\nExample: https://ptc.eightfold.ai/careers/apply?pid=137477695724");
    return;
  }

  console.log(" Detected PTC Eightfold application page");
  console.log("   URL: " + tab.url);

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["data.js", "content.js"]
    });

    console.log(" Autofill script injected successfully");
  } catch (error) {
    console.error(" Injection failed:", error);
    alert(" Error: Failed to inject autofill script");
  }
});
