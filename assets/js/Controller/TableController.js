var smartTable = require('angular-smart-table');
var underscore = require('underscore');

module.exports = function(app,request){
    app.controller('TableController',['$scope','$cookieStore', function(scope,$cookieStore) {

        var
            nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
            familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

        function createRandomItem() {
            var
                firstName = nameList[Math.floor(Math.random() * 4)],
                lastName = familyName[Math.floor(Math.random() * 4)],
                age = Math.floor(Math.random() * 100),
                email = firstName + lastName + '@whatever.com',
                balance = Math.random() * 3000;

            return{
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                balance: balance,
                isSelected:false
            };
        };

        scope.getCheckedRows = function(){
            console.log("row collection");
            scope.filteredList = JSON.stringify(underscore.where(scope.rowCollection,{isSelected: true}));

        };

        scope.clearFilteredList = function(){
            console.log("row collection");
            scope.filteredList = '';

        };

        scope.itemsByPage=15;

        scope.rowCollection = [];
        for (var j = 0; j < 200; j++) {
            scope.rowCollection.push(createRandomItem());
        }

    }]);


    app.directive('csSelect', function () {
        return {
            require: '^stTable',
            template: '<input type="checkbox" ng-model="isSelected"/>',
            scope: {
                row: '=csSelect'
            },
            link: function (scope, element, attr, ctrl) {
                element.bind('change', function (evt) {
                    scope.$apply(function () {
                        ctrl.select(scope.row, 'multiple');
                    });
                });
                scope.$watch('row.isSelected', function (newValue, oldValue) {
                    if (newValue === true) {
                        element.parent().addClass('st-selected');
                    } else {
                        element.parent().removeClass('st-selected');
                    }
                });
            }
        };
    });
};
