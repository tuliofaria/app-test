// Recommended filename: Then_I_see_#.js
module.exports = function() {
  this.Then(/^I see "([^"]*)"$/, function (link) {
    // Write the automation code here
    //browser.waitForExist('a=' + link);
    browser.waitForExist('p=' + link);
  });
};