angular.module('app.special-mgmt').controller('SpecialDetailsCntl',
    function ($scope, $sce, specials, specialDetails, allOffers, globalSpinner, positionStateNotification) {
        'use strict';
        $scope.special = specialDetails;
        $scope.allOffers = allOffers;
		var allOffersFiltered = allOffers.filter(function(offer) { 
			// TODO also check for id
			return offer.description === $scope.special.specialOffer; 
		});
        $scope.selectedOffer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;
		
        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        // form container to access forms added in parent scopes
        $scope.forms = {};

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
				console.log("Saving special: " +JSON.stringify($scope.special));
                return specials.submitSpecial($scope.special);
            }).then(function () {
                $scope.$close();
            });
        };
		
		$scope.selectOffer = function (item, model) {
			$scope.selectedOffer = item;
			$scope.special.offerId = item.id;
			$scope.special.specialOffer = item.description;
		};
    });
