app.controller('signUpController', function($scope, $http, $cookies, $location,$window) {
    
    $scope.submit = function(daten, event){
        if (!event || event.key == "Enter" ){
            if (!daten.email){
                $scope.errorMessage = "Email falsch";
            }
            if (daten.name && daten.email && daten.password){
                $http.post("/signUp", daten).success(function(res){
                    if (res != true){
                        $scope.errorMessage = res;
                    } else{
                        $cookies.put("user", daten.name.toLocaleLowerCase());
                        $window.location.reload();
                        $location.path("/userHome");
                        
                    }
                });
            }
        }
    };
})