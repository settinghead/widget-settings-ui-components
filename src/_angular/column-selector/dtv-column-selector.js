(function () {
  "use strict";

  angular.module("risevision.widget.common.column-selector", ["risevision.widget.common.column-setting",
          "risevision.widget.common.translate"])
    .directive("columnSelector", ["$templateCache", function ($templateCache) {
      return {
        restrict: "E",
        scope: {
          columns: "=",
          columnNames: "="
        },
        template: $templateCache.get("_angular/column-selector/column-selector.html"),
        transclude: false,
        link: function($scope) {

          var watcher = $scope.$watch("columns", function() {
            if ($scope.columns && $scope.columnNames) {
              for (var i = 0; i < $scope.columns.length; i++) {
                for (var j = 0; j < $scope.columnNames.length; j++) {
                  if ($scope.columns[i].name === $scope.columnNames[j].name) {
                    $scope.columns[i].type = $scope.columnNames[j].type;
                    $scope.columnNames[i].show = true;
                  }
                }
              }

              // Destroy watch
              watcher();
            }
          });

          $scope.add = function(column) {
            column.show = true;
            $scope.columns.push(column);
          };

          $scope.remove = function (column) {
            if (column) {
              removeColumn($scope.columns, column.name);

              for (var i = 0; i < $scope.columnNames.length; i++) {
                if (column.name === $scope.columnNames[i].name) {
                  $scope.columnNames[i].show = false;
                  break;
                }
              }
            }
          };

          function removeColumn(columnsList, name) {
            for(var i = 0; i < columnsList.length; i++) {
              if (columnsList[i].name === name) {
                columnsList.splice(i, 1);
                break;
              }
            }
          }

        }
      };
    }]);
}());
