angular.module('app.offer-mgmt').factory('offers', function (offerManagementRestService) {
    'use strict';
    var paginatedSpecials = {};
    
    return {
        loadAllOffers: function () {
            return offerManagementRestService.getAllOffers().then(function (response) {
                return response.data;
            });
        },
        loadAllProducts: function () {
            return offerManagementRestService.getAllProducts().then(function (response) {
                return response.data;
            });
        },
        getPaginatedSpecials: function (pagenumber, pagesize) {
                return offerManagementRestService.findSpecials(pagenumber, pagesize).then(function (response) {
                    angular.copy(response.data, paginatedSpecials);
                    return paginatedSpecials;
            });
        },
        deleteSpecial: function(id){
            return offerManagementRestService.deleteSpecial(id);
        }
    };
});
