(function() {
    'use strict';

    angular.module('ShoppingListApp', ['angularUtils.directives.dirPagination'])

    .service('$shoppingService', ['$http', '$q', function($http, $q) {
        
        var items; 

        var retrieveItems = function() {
            if (typeof(items) === 'undefined') {
                var serviceItems = $http.get('http://demo3374525.mockable.io/shopping-list');
                serviceItems.then(function(response){
                    items = response.data;
                })
                return serviceItems;
            } 
        };
        // mock REST endpoint for listing items
        // http://demo3374525.mockable.io/shopping-list
        var listItems = function() {
            return itemsAsync(items);
        };

        function itemsAsync(value) {
            var deferred = $q.defer(); 
            deferred.resolve(value)
            return deferred.promise
        };

        var addItem = function(item) {
            items.push(item);
        };

        var removeItem = function(item) {
            for(var i=0; i<items.length; i++){
                var tempItem = items[i];
                // console.log(tempItem);
                if(item.name === tempItem.name && item.type === tempItem.type) {
                    items.splice(i, 1);
                }
            }
        };

        return {
            retrieveItems: retrieveItems,
            listItems: listItems,
            addItem: addItem,
            removeItem: removeItem
        };
    }])

    .controller('ShoppingListCtrl', ['$scope', '$log', '$shoppingService', function($scope, $log, $shoppingService) {
         $scope.listItems = null;
         $scope.sortBy = 'name';
         $scope.reverse = false;
         $scope.currentPage = 1;
         $scope.pageSize = 10;

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

        $scope.listAllItems = function() {
            updateScope($shoppingService.listItems); 
        };

        $scope.deleteItem = function(item) {
            $shoppingService.removeItem(item)
            updateScope($shoppingService.listItems)
        };


        $scope.addItem = function() {
            var item = {
                name: $scope.itemName,
                type: $scope.itemType
            }
            
            $shoppingService.addItem(item);
            updateScope($shoppingService.listItems)
        }

        function updateScope(functionName) {
            var promise = functionName();
    
            promise.then(function(payload) {
                $scope.listItems = payload;
            }), 
            function(errorPayload) {
                $log.error("failure to load list", errorPayload);
            }
        }

        $scope.init();
    }]);

})();
