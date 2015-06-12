(function() {
    'use strict';

    angular.module('ShoppingListApp', [])

    .service('$shoppingService', ['$http', '$q', function($http, $q) {
        var itemTypes = ['Dairy', 'Meat', 'Beverage', 'Other'];
        var items; 

        var retrieveItems = function() {
            return $http.get('http://demo3374525.mockable.io/shopping-list');
        };
        // mock REST endpoint for listing items
        // http://demo3374525.mockable.io/shopping-list
        var listItems = function() {
            return items;
        };

        var addItem = function(item) {
            items += item;
        };

        var removeItem = function() {

        };

        return {
            retrieveItems: retrieveItems,
            listItems: listItems,
            addItem: addItem,
            removeItem: removeItem,
            itemTypes: itemTypes
        };
    }])

    .controller('ShoppingListCtrl', ['$scope', '$log', '$shoppingService', function($scope, $log, $shoppingService) {
         $scope.listItems = null;
         $scope.sortBy = 'name';
         $scope.reverse = false;

        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };
        
        $scope.init = function() {
            var promise = $shoppingService.retrieveItems();
            
            promise.then(function(payload) {
                $scope.listItems = payload.data;
            }), 
            function(errorPayload) {
                $log.error("failure to load list", errorPayload);
            }
        };

        $scope.listItems = function() {
            // $scope.listItems = $shoppingService.listItems; 
            // console.log($scope.listItems);
        };

        $scope.deleteItem = function(start) {
            $scope.listItems.splice(start, 1);
        };

        $scope.addItem = function() {
            var item = {
                name: $scope.itemName,
                type: $scope.itemType
            }

            $scope.listItems.push(item);
            $scope.itemName = "";
            $scope.itemType = "";

            $shoppingService.addItem(item);
        }

        $scope.init();
    }]);

})();
