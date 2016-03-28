@watch
Feature: Check homepage

  As a human
  I want to check homepage
  So I can find information

  Scenario: Just open the home page
    Given I have visited Localhost
    Then I see "Hello World!"