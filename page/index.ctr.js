app.controller('MainController', function($scope, $http, $cookies, $route, $location, $window) {
   
    
  

    
    $scope.googleLogin= false;
    $scope.user = $cookies.get("user");
    
    
    $http.get("/home").success(function(res){
        $scope.allPins = res;
        
    });
    
    $scope.path= function(path){
        if (path == "/login" || path == "/signUp"){
            $location.path(path);
            $scope.googleLogin= true;
        } else {$scope.googleLogin = false}
            $location.path(path);
        };
    
    
    
    
    
    
    /* google Login */
    function onSignIn(googleUser) {
        if (!$cookies.get("user")){
            var profile = googleUser.getBasicProfile();
            $cookies.put("user", profile.getName());
            $cookies.put("userEmail", profile.getEmail());
            //$window.location.reload();
        }
      $http.post("/home", {"user": profile.getName(), "userEmail": profile.getEmail()})
    }
    window.onSignIn = onSignIn;
    
    /* google Logout */
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


