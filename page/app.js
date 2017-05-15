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

});    