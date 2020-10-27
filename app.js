(function (){
  "use strict";

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService' , MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var cntrl = this;
    cntrl.searchTerm;
    cntrl.found;
    cntrl.finder = function(){
      var finder = MenuSearchService.getMatchedMenuItems(cntrl.searchTerm);
                                      finder.then(function (response) {
                                        cntrl.found = response.data;
                                      })
                                      .catch(function (error) {
                                        console.log("Something went terribly wrong.");
                                      });
    }
  }
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService ($http , ApiBasePath){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm = "l"){
      return $http(
        method: "POST",
        url: (ApiBasePath + "/menu_items.json")
      ).then(function (result) {
          // process result and only keep items that match
          var foundItems;
          angular.forEach(result, function(result) {
            if(description.find(searchTerm) !== -1){
              this.push(result.name + ': ' + result.description);
            }
          }, foundItems);
          // return processed items
          return foundItems;
      });
    }
  }
})();
