var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/hero-entry', {
    templateUrl: '/views/templates/hero-entry.html',
    controller: 'HeroEntryController',
    controllerAs: 'heroEntry'
  })
  .when('/hero-listing', {
    templateUrl: '/views/templates/hero-listing.html',
    controller: 'HeroListingController',
    controllerAs: 'heroListing'
  })
  .otherwise({
    redirectTo: 'hero-entry'
  });
}]);


app.controller('HeroEntryController', ["$http", function($http) {
  console.log("Hero Entry Controller");
  var self = this;
  self.superpowers = {};
  self.newHero = {};
  getSuperPowers();
  function getSuperPowers() {
    $http.get('/powers')
    .then(function (response){
      console.log(response.data);
      self.superpowers = response.data;
    })
  }

  self.postHero = function(index) {
    console.log("new hero: ", self.newHero.power_id);
    if (self.newHero.power_id !== "10 Fire Control") {
      self.newHero.power_id = self.newHero.power_id.slice(0,1);
    } else {
      self.newHero.power_id = self.newHero.power_id.slice(0,2);
    }
    console.log(self.newHero.power_id);
    $http.post('/heroes', self.newHero)
    .then(function (response){
      console.log('POST finished.');
      self.newHero = {};
    })
  }

}]);


app.controller('HeroListingController', ["$http", function($http) {
  console.log("Hero Listing Controller");
  var self = this;
  self.heroes = [];
  getHeroes();
  function getHeroes() {
    $http.get('/heroes')
    .then(function (response){
      console.log(response.data);
      self.heroes = response.data;
    })
  }

  self.delete = function(index) {
    var id = self.heroes[index].id;
    $http.delete('/heroes/' + id)
      .then(function(response) {
        console.log('Delete finished. Hero deleted.');
        getHeroes();
      });
  }
}]);
