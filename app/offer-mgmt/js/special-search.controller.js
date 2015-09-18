angular.module('app.offer-mgmt')
    .controller('SpecialSearchCntl', function ($scope, $modal, globalSpinner,paginatedSpecialList,offers) {
        
       var selectedSpecial = function () {
            return $scope.selectedItems && $scope.selectedItems.length ? $scope.selectedItems[0] : undefined;
        };
        
        $scope.selectedItems = [];
        $scope.maxSize = 5;
        $scope.totalItems = paginatedSpecialList.pagination.total;
        $scope.numPerPage = paginatedSpecialList.pagination.size;
        $scope.currentPage = paginatedSpecialList.pagination.page;

        $scope.gridOptions = {
            data: paginatedSpecialList.result
        };

     $scope.reloadTables = function () {
            // calling service tables.getPaginatedTables function
            // The function fetches data from server (it creates http.get request).
            // The response handling (in case of success) is placed in the function wrapped in the 'then' object - the lines of code placed in there
            // will be executed when the successful response from server comes back.
            // The response is passed as a parameter of this function ('res' object).
            // For more info regarding running functions asynchronously please check: https://docs.angularjs.org/api/ng/service/$q
            offers.getPaginatedSpecials($scope.currentPage, $scope.numPerPage).then(function (res) {
                // These lines are executed only after successful server response.
                paginatedSpecialList = res;
                $scope.gridOptions.data = paginatedSpecialList.result;
            });
        };

     $scope.buttonDefs = [
         {
             label:'Create'
         },
         {
             label:'Update'
         },
         {
             label:'Delete',
             onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return offers.deleteSpecial(selectedSpecial().id).then($scope.reloadTables);
                    });
                },
                isActive: function () {
                    // makes button active when there is a FREE table selected
                    return selectedSpecial();
                }
         }
     ];
});