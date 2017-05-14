app.controller('MainController', function($scope, $http, $cookies, $route, $location, $window) {
   
    
  
    if ($cookies.get("user")){
        $location.path("/userHome")
        
    }
    
    $scope.googleLogin= false
    $scope.user = $cookies.get("user")
    
    $scope.path= function(path){
        if (path == "/login"){
            $scope.googleLogin= true
        } else {$scope.googleLogin = false}
            $location.path(path);
        }
    
    
    
    
    
    
    /* google Login */
    function onSignIn(googleUser) {
        if (!$cookies.get("user")){
            var profile = googleUser.getBasicProfile();
            $cookies.put("user", profile.getName());
            $window.location.reload();
        }
      
    }
    
    window.onSignIn = onSignIn;
    
})


