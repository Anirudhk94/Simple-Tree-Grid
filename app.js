var app = angular.module('myApp', ['treeGrid', 'xeditable']);

 app.controller('myCtrl', function($scope, $http) {

     $scope.col_defs = [
        {
            field:"Area",
            displayName:"Area"
        },
        {
            field:"Population",
            displayName:"Population"
        },
        {
            field:"TimeZone",
            displayName:"TimeZone"
        },
        {
            field:"Expandable",
            displayName:"Expandable"
        },
        {
            field:"A",
            displayName:"A",
            cellTemplate: "<div ng-show=\"{{ row.branch[col.field] }} == 1\"><img style=\"width: 16px\" src=\"tick.png\" /></div>"+
                            "<div ng-hide=\"{{ row.branch[col.field] }} == 1\">{{ row.branch[col.field] }}</div>"
        },
     ];

    $scope.tree_data = [];

     $scope.selectedRow = null;

     $scope.my_tree_handler = function(branch) {
         $scope.selectedRow = branch;
         console.log('selected branch :', branch);
         console.log('selected branch level :', branch.level);

     }

     $scope.addRow = function() {
         console.log('In addRow()');
         if($scope.selectedRow != null && $scope.selectedRow.level == 3) {
             alert('Cannot add node to this level');
             return;
         }
         else if($scope.selectedRow != null) {
            $scope.selectedRow.children.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain",
                A:0
            });
          } 
          else {
              $scope.tree_data.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain",
                A:0
            });
          }
          $http({
                method : "POST",
                url : "http://localhost:8081/addTreeData",
                data : $scope.tree_data
            }).then(function mySucces(response) {
                console.log('success')
                console.log(response.data)
            }, function myError(response) {
                console.log(response.statusText)
            })
            initializeData()

     }

     $scope.deleteRow = function() {
         branch = $scope.selectedRow;
         console.log(branch);
         outcome = confirm('Are you sure you want to delete '+branch.Name+' ?');
         if(outcome == false) return;
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

         $http({
                method : "POST",
                url : "http://localhost:8081/addTreeData",
                data : $scope.tree_data
            }).then(function mySucces(response) {
                console.log('success')
                console.log(response.data)
            }, function myError(response) {
                console.log(response.statusText);
            });
            initializeData()
     }

     $scope.resetData = function() {
        $scope.tree_data = [{  
            Name:"USA",
            Area:9826675,
            Population:318212000,
            TimeZone:"UTC -5 to -10",
            A:0,
            children:[  
                {  
                    Name:"California",
                    Area:423970,
                    Population:38340000,
                    TimeZone:"Pacific Time",
                    A:0,
                    children:[  
                        {  
                            Name:"San Francisco",
                            Area:231,
                            Population:837442,
                            TimeZone:"PST",
                            A:1
                        },
                        {  
                            Name:"Los Angeles",
                            Area:503,
                            Population:3904657,
                            TimeZone:"PST",
                            A:0.56
                        }
                    ]
                },
                {  
                    Name:"Illinois",
                    Area:57914,
                    Population:12882135,
                    TimeZone:"Central Time Zone",
                    A:1,
                    children:[  
                        {  
                            Name:"Chicago",
                            Area:234,
                            Population:2695598,
                            TimeZone:"CST",
                            A:1
                        }
                    ]
                }
            ]
            },
            {  
                Name:"India",
                Area:268581,
                Population:26448193,
                TimeZone:"Mountain",
                A:1
            }]
            $http({
                method : "POST",
                url : "http://localhost:8081/addTreeData",
                data : $scope.tree_data
            }).then(function mySucces(response) {
                console.log('success')
                console.log(response.data)
            }, function myError(response) {
                console.log(response.statusText);
            });
            initializeData()

     }

     $scope.deselectRow = function() {
         console.log('In deselectRow')
         $scope.selectedRow = null;
     }

     

     var init = function() {
         $http({
                method : "GET",
                url : "http://localhost:8081/listTreeData"
            }).then(function mySucces(response) {
                console.log('success')
                $scope.tree_data = response.data
                initializeData()
            }, function myError(response) {
                console.log(response.statusText);
            });
        console.log('In init()')
     }

     var initializeData = function() {
        console.log('In initializeData()') 
        for(i = 0 ; i < $scope.tree_data.length ; i++) { //USA & Texas
            if($scope.tree_data[i].children != null && $scope.tree_data[i].children.length > 0) { //If level 1 has children
                var count = 0;                        //Count variable to check level 3 nodes that are 0
                console.log($scope.tree_data[i].Name + " has children")
                 for(j = 0 ; j < $scope.tree_data[i].children.length ; j++) { //Cali & Illinois
                    if($scope.tree_data[i].children[j].children != null && Object.keys($scope.tree_data[i].children[j].children).length > 0) { //If level 2 has children
                        console.log($scope.tree_data[i].children[j].Name + " has children")
                        var completed = 0

                        for(k = 0 ; k < Object.keys($scope.tree_data[i].children[j].children).length ; k++) {
                            if($scope.tree_data[i].children[j].children[k].A == 1) {
                                completed++
                            }
                        }
                        
                        if(Object.keys($scope.tree_data[i].children[j].children).length == completed) {
                            $scope.tree_data[i].children[j].A = 1
                        } else {
                            $scope.tree_data[i].children[j].A = completed+"/"+Object.keys($scope.tree_data[i].children[j].children).length
                        }
                        console.log($scope.tree_data[i].children[j].Name + " : "+ $scope.tree_data[i].children[j].A )

                        console.log($scope.tree_data[i].Name+" > "+$scope.tree_data[i].children[j].Name+".A : "+$scope.tree_data[i].children[j].A)

                        if($scope.tree_data[i].children[j].A == 1) {
                            count++
                        }
                    }
                }

                console.log($scope.tree_data[i].Name+"'s count = "+count)

                if($scope.tree_data[i].length == count) {
                    $scope.tree_data[i].A = count
                } else {
                    $scope.tree_data[i].A = count + "/" + $scope.tree_data[i].children.length
                }
                console.log($scope.tree_data[i].Name + " : "+ $scope.tree_data[i].A )
            }
         }
     }

     init();

 });