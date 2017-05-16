app.controller('myPinsController', function($scope, $http, $cookies, $route, $location, $window) {
    
    $http.post("/myPins", {"user": $cookies.get("user")}).success(function(res){
        $scope.myPins = res;
    });
    
    $scope.myPinDelete= function(pin){
        pin.user = $cookies.get("user");
     $http.post("/myPins", {"pin": pin}).success(function(res){
         $window.location.reload();
     })
    }
})