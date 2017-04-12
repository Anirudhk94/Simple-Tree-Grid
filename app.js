var app = angular.module('myApp', ['treeGrid', 'xeditable']);

 app.controller('myCtrl', function($scope) {
     $scope.tree_data = [{
             Name: "USA",
             Area: 9826675,
             Population: 318212000,
             TimeZone: "UTC -5 to -10",
             children: [{
                     Name: "California",
                     Area: 423970,
                     Population: 38340000,
                     TimeZone: "Pacific Time",
                     children: [{
                             Name: "San Francisco",
                             Area: 231,
                             Population: 837442,
                             TimeZone: "PST"                         },
                         {
                             Name: "Los Angeles",
                             Area: 503,
                             Population: 3904657,
                             TimeZone: "PST"
                         }
                     ]
                 },
                 {
                     Name: "Illinois",
                     Area: 57914,
                     Population: 12882135,
                     TimeZone: "Central Time Zone",
                     children: [{
                         Name: "Chicago",
                         Area: 234,
                         Population: 2695598,
                         TimeZone: "CST"
                     }]
                 }
             ]
         },
         {
             Name: "Texas",
             Area: 268581,
             Population: 26448193,
             TimeZone: "Mountain"
         }
     ];

     $scope.col_defs = [{
             field: "Description"
         },
         {
             field: "DemographicId",
             displayName: "Demographic Id",
             sortable: true,
             filterable: true
         },
         {
             field: "ParentId",
             displayName: "Parent Id"
         },
         {
             field: "Area",
             sortable: true,
             sortingType: "number",
             filterable: true
         },
         {
             field: "Population"
         },
         {
             field: "image",
             displayName: "Image",
             cellTemplate: "<img ng-click='cellTemplateScope.click(\'example\')' ng-src='{{ row.branch[col.field] }}' />",
             cellTemplateScope: {
                 click: function(data) {
                     console.log(data);
                 }
             }
         }
     ];

     $scope.selectedRow = null;

     $scope.my_tree_handler = function(branch) {
         $scope.selectedRow = branch;
         console.log('selected branch :', branch);
         console.log('selected branch level :', branch.level);
     }

     $scope.addRow = function() {
         console.log('In addRow()');
         if($scope.selectedRow != null) {
            $scope.selectedRow.children.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain"
            });
          } 
          else {
              $scope.tree_data.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain"
            });
          }
     }

     $scope.deleteRow = function() {
         branch = $scope.selectedRow;
         console.log(branch);
         console.log($scope.tree_data.indexOf(branch));
         if (branch.level == 1) {
             $scope.tree_data.splice($scope.tree_data.indexOf(branch), 1)
         } 
         else if(branch.level == 2){
             for(i = 0 ; i < $scope.tree_data.length ; i++) {
                if($scope.tree_data[i].children.indexOf(branch) > -1) {
                    $scope.tree_data[i].children.splice($scope.tree_data[i].children.indexOf(branch),1);
                    break;
                }
             }
         } else if(branch.level == 3) {
             for(i = 0 ; i < $scope.tree_data.length ; i++) { //level1
                if($scope.tree_data[i].children.length > 0) { //check if children exist
                    for(j = 0 ; j < $scope.tree_data[i].children.length ; j++) { // if children exist loop though it
                        if($scope.tree_data[i].children[j].uid == branch.parent_uid) { 
                            $scope.tree_data[i].children[j].children.splice($scope.tree_data[i].children[j].children.indexOf(branch),1);
                            break;
                        }
                    }
                }
             }
         }         
     }


 });