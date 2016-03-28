// Recommended filename: Given_I_have_visited_Google.js
module.exports = function() {
  this.Given(/^I have visited Localhost$/, function () {
    // Write the automation code here
    browser.url('http://localhost:3000');
  });
};