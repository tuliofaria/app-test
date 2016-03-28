var selectors = {
  search : 'input[name="q"]',
};

widgets.searchPage = {
  search: function(value) {
  	browser.setValue(selectors.search, value);
  	browser.keys(['Enter']);
  }
}