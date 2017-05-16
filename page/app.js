var app = angular.module('app', ["ngRoute", "ngCookies"]);

app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when("/", {
        templateUrl: '/home/home.html',
        controller: "homeController"
    })
    .when("/signUp", {
        templateUrl: "/signUp/signUp.html",
        controller: "signUpController"
    })
    .when("/login", {
        templateUrl: "/login/login.html",
        controller: "loginController"
    })
    .when("/userHome", {
        templateUrl: "/userHome/userHome.html",
        controller: "userHomeController"
    })
    .when("/myPins",{
        templateUrl: "/myPins/myPins.html",
        controller: "myPinsController"
    })

})

.directive("showAllPins", function(){
    return{
        restrict: "E"
    }
})
            
     .directive('checkLast', function () {
        return function (scope, element, attrs) {
            //console.log(scope.$position);
            if (scope.$last=== true) {
                element.ready(function () {
                    $('#container').masonry({ columnWidth: 60});
                    
                })
            }
        }
    });