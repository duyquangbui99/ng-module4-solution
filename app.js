(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];
        ctrl.nothingFound = false;

        // Function to trigger search
        ctrl.narrowItDown = function () {
            if (!ctrl.searchTerm) {
                ctrl.nothingFound = true;
                ctrl.found = [];
                return;
            }

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (result) {
                    ctrl.found = result;
                    ctrl.nothingFound = ctrl.found.length === 0;
                });
        };

        // Function to remove item from the found array
        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json')
                .then(function (response) {
                    var allItems = [];

                    // Loop through each category and collect menu items
                    for (var category in response.data) {
                        if (response.data[category].menu_items) {
                            allItems = allItems.concat(response.data[category].menu_items);
                        }
                    }

                    // Filter based on the search term
                    var foundItems = allItems.filter(function (item) {
                        return item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase());
                    });

                    return foundItems;
                });
        };
    }
    function FoundItemsDirective() {
        return {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'dirCtrl',
            bindToController: true
        };
    }
    function FoundItemsDirectiveController() {
        var dirCtrl = this;
    }

})();
