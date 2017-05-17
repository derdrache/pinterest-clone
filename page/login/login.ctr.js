app.controller('loginController', function($scope, $http, $cookies, $location,$window) {
 
    
    $scope.submit = function(data, event){
      if (!event || event.key == "Enter"){
          $http.post("/login", data).success(function(res){
              if (res !== true){
                  $scope.errorMessage = res;
              } else{
                  $cookies.put("user", data.name.toLocaleLowerCase());
                  $window.location.reload();
                  $location.path("/userHome");
                  
              }
              
          });
      }  
    };
    
    
    
})