// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngMessages', 'angularMoment', 'intlpnIonic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})






.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'SplashController'
    })

    .state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome.html',
      controller: ''
    })

    .state('verify', {
      url: '/verify',
      templateUrl: 'templates/verify.html',
      controller: ''
    })

     .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: ''
    })

    .state('tabs.home', {
          url: '/home',
          views: {
            'home-tab' : {
              templateUrl: 'templates/home.html',
              controller:  'HomeController'
              
            }
          }
        })


    .state('tabs.contacts', {
          url: '/contacts',
          views: {
            'contacts-tab' : {
              templateUrl: 'templates/contacts.html',
              controller: 'ContactsController'
              
            }
          }
        })


    .state('tabs.dail', {
          url: '/dail',
          views: {
            'dail-tab' : {
              templateUrl: 'templates/dail.html',
              controller: 'DailController'
              
            }
          }
        })


    .state('tabs.settings', {
          url: '/settings',
          views: {
            'settings-tab' : {
              templateUrl: 'templates/settings.html',
              controller: ''
              
            }
          }
        })


    
    


  $urlRouterProvider.otherwise('/splash');

  $ionicConfigProvider.backButton.text('').previousTitleText(false);

})


.controller('SplashController', ['$scope', '$http', '$state', '$timeout',
    function($scope, $http, $state, $timeout) {
      
      $timeout(function(){

        $state.go('welcome');

      }, 3000);

}])

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
}])

.controller('HomeController', ['$scope', '$http', '$state', '$ionicGesture',
    function($scope, $http, $state, $ionicGesture) {
   
   $scope.pc = false;
   $scope.pullCall = function(status){
    $scope.pc = status;
   }

   $scope.whatClass= function(status){
     if(status=="true")
            return "open";
     else if(status=="flase")
         return "close";
    }

}])

.controller('DailController', ['$scope', '$http', '$state', '$ionicGesture',
    function($scope, $http, $state, $ionicGesture) {
   $scope.scale = {
        
        output : [], 
        memory : [],
        config : {},

        entry : function(digit){
          
          if(digit == '.' && $scope.scale.memory.in_array('.')) return false;
          $scope.scale.memory.push(digit);
          
         
          $scope.scale.output = $scope.scale.memory.join("");
        },

         ce : function(){
          
          $scope.scale.memory.pop();
          $scope.scale.output = $scope.scale.memory.join("");
        },
         clear : function(){
          
          $scope.scale.memory = [];
          $scope.scale.output = $scope.scale.memory.join("");
        }
   
      }
}])

 

.controller('ContactsController', function($scope, $cordovaContacts, $ionicPlatform) {
  
    $ionicPlatform.ready(function() {  
  
        $scope.contacts = {};  // We will use it to load contacts  
              
        $scope.contact = {     // We will use it to save a contact
      
            "displayName": "Gajotres",
            "name": {
                "givenName"  : "Dragan",
                "familyName" : "Gaic",
                "formatted"  : "Dragan Gaic"
            },
            "nickname": 'Gajotres',
            "phoneNumbers": [
                {
                    "value": "+385959052082",
                    "type": "mobile"
                },
                {
                    "value": "+385914600731",
                    "type": "phone"
                }              
            ],
            "emails": [
                {
                    "value": "dragan.gaic@gmail.com",
                    "type": "home"
                }
            ],
            "addresses": [
                {
                    "type": "home",
                    "formatted": "Some Address",
                    "streetAddress": "Some Address",
                    "locality":"Zagreb",
                    "region":"Zagreb",
                    "postalCode":"10000",
                    "country":"Croatia"
                }
            ],
            "ims": null,
            "organizations": [
                {
                    "type": "Company",
                    "name": "Generali",
                    "department": "IT",
                    "title":"Senior Java Developer"
                }
            ],
            "birthday": Date("08/01/1980"),
            "note": "",
            "photos": [
                {
                    "value": "https://pbs.twimg.com/profile_images/570169987914924032/pRisI2wr_400x400.jpeg"
                }
            ],
            "categories": null,
            "urls": null
        }          
                  
        $scope.addContact = function() {
            console.log('Dodaj');
            $cordovaContacts.save($scope.contact).then(function(result) {
                console.log('Contact Saved!');
            }, function(err) {
                console.log('An error has occured while saving contact data!');
            });
        };
  
        // This function can take some time  so be patient
        $scope.getAllContacts = function() {
            console.log('Dohvati');           
            $cordovaContacts.find({filter : 'Robert', fields:  [ 'displayName']}).then(function(allContacts) { //replace 'Robert' with '' if you want to return all contacts with .find()
                $scope.contacts = allContacts;
                console.log(JSON.stringify(allContacts));
            });
        };
  
        $scope.removeContact = function() {
              
            $scope.removeContact = {};   // We will use it to save a contact
            $scope.removeContact.displayName = 'Gajotres'; // Contact Display Name         
              
            $cordovaContacts.remove($scope.removeContact).then(function(result) {
                console.log('Contact Deleted!');
                console.log(JSON.stringify(result));
            }, function(error) {
                console.log('An error has occured while deleting contact data!');
                console.log(JSON.stringify(error));
            });
        }
    });
});
/*.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
*/
