(function () {
    'use strict';

    var app = angular.module('lunchApp', []);

    var LunchCheckController = function ($scope) {
        $scope.message = "Welcome to the Lunch Checker!";
        $scope.messageStyle = {};

        $scope.checkLunch = function () {
            if ($scope.lunchMenu) {
                var items = $scope.lunchMenu.split(',');
                if (items.length > 3) {
                    $scope.message = 'Too much!';
                    $scope.messageStyle = { color: 'green' }
                } else {
                    $scope.message = 'Enjoy!';
                    $scope.messageStyle = { color: 'green' }
                }
            } else {
                $scope.message = 'Please enter data first';
                $scope.messageStyle = { color: 'red' }
            }
        }
    };

    LunchCheckController.$inject = ['$scope'];
    app.controller('LunchCheckController', LunchCheckController)
})();