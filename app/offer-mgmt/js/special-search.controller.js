angular.module('app.offer-mgmt')
    .controller('SpecialSearchCntl', function ($scope, $modal, globalSpinner,paginatedSpecialList) {
        
        $scope.selectedItems = [];
        $scope.maxSize = 5;
        $scope.totalItems = paginatedSpecialList.pagination.total;
        $scope.numPerPage = paginatedSpecialList.pagination.size;
        $scope.currentPage = paginatedSpecialList.pagination.page;

        $scope.gridOptions = {
            data: paginatedSpecialList.result
        };

});