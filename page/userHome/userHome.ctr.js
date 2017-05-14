app.controller('userHomeController', function($scope, $http, $cookies, $route, $location) {
    
    $scope.logout = function (){
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          
          $cookies.remove("user")
          $location.path("/")
          $route.reload();
    });
    }
})