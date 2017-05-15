app.controller('userHomeController', function($scope, $http, $cookies, $route, $location) {
    
    $scope.pinBox= false;
    
    $scope.openPinCreateBox = function(){
        var action = $scope.pinBox;
        action == false ? action=true : action=false;
        
        $scope.pinBox = action;
        $scope.verdecken = {"opacity": action == true ? 0.2 : 1};
    };
    
    $scope.createNewPin = function(newPin,event){
        if (!event||event.key=="Enter"){
            newPin.user = $cookies.get("user");
        
            console.log(newPin)
        }
    }
    
    
})