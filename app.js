var app = angular.module('myApp', ['treeGrid', 'xeditable']);

app.controller('myCtrl', function($scope, $http) {

    $scope.col_defs = [{
            field: "Product id",
            displayName: "Product id"
        }
    ];

    $scope.tree_data = [  
   {  
      "Name":"USA",
      "Product id":"",
      "Mean1":123,
      "SD1":318,
      "Mean2":234,
      "SD2":123,
      "stores":6,
      "Berg":"5/10",
      "Karl":"6/10",
      "HH34":"3/10",
      "Average":41,
      "Average2":39,
      "children":[  
         {  
            "Name":"store1",
            "Product id":"",
            "Mean1":323,
            "SD1":3545,
            "Mean2":32,
            "SD2":1,
            "stores":5,
            "Berg":"1/3",
            "Karl":"2/3",
            "HH34":1,
            "Average":2,
            "Average2":1,
            "children":[  
               {  
                  "Name":"store1.1",
                  "Product id":985327,
                  "Mean1":312,
                  "SD1":35,
                  "Mean2":635,
                  "SD2":12,
                  "stores":5,
                  "Berg":1,
                  "Karl":1,
                  "HH34":1,
                  "Average":1,
                  "Average2":1
               },
               {  
                  "Name":"store1.2",
                  "Product id":65425,
                  "Mean1":543,
                  "SD1":21,
                  "Mean2":123,
                  "SD2":45,
                  "stores":3,
                  "Berg":"",
                  "Karl":1,
                  "HH34":1,
                  "Average":0.6,
                  "Average2":0.5
               },
               {  
                  "Name":"store1.3",
                  "Product id":453268,
                  "Mean1":325,
                  "SD1":21,
                  "Mean2":986,
                  "SD2":25,
                  "stores":1,
                  "Berg":"",
                  "Karl":"",
                  "HH34":1,
                  "Average":0.3,
                  "Average2":""
               }
            ]
         },
         {  
            "Name":"store2",
            "Product id":"",
            "Mean1":442,
            "SD1":543,
            "Mean2":2412,
            "SD2":2424,
            "stores":2,
            "Berg":"1/2",
            "Karl":1,
            "HH34":"1/2",
            "Average":1.33,
            "Average2":1.5,
            "children":[  
               {  
                  "Name":"store2.1",
                  "Product id":96542,
                  "Mean1":1001,
                  "SD1":23,
                  "Mean2":6035,
                  "SD2":62,
                  "stores":3,
                  "Berg":"",
                  "Karl":1,
                  "HH34":1,
                  "Average":0.6,
                  "Average2":0.5
               },
               {  
                  "Name":"store2.2",
                  "Product id":703541,
                  "Mean1":5020,
                  "SD1":13,
                  "Mean2":3650,
                  "SD2":24,
                  "stores":4,
                  "Berg":1,
                  "Karl":1,
                  "HH34":"",
                  "Average":0.6,
                  "Average2":1
               }
            ]
         },
         {  
            "Name":"hello",
            "Product id":"",
            "Mean1":234,
            "SD1":455,
            "Mean2":643,
            "SD2":4265,
            "stores":5,
            "Berg":1,
            "Karl":"4/5",
            "HH34":1,
            "Average":4.66,
            "Average2":4.5,
            "children":[  
               {  
                  "Name":"eclipse",
                  "Product id":89241,
                  "Mean1":124,
                  "SD1":24553,
                  "Mean2":5124,
                  "SD2":214,
                  "stores":3,
                  "Berg":1,
                  "Karl":"",
                  "HH34":1,
                  "Average":0.6,
                  "Average2":0.5
               },
               {  
                  "Name":"circle",
                  "Product id":122321,
                  "Mean1":1256,
                  "SD1":643,
                  "Mean2":667,
                  "SD2":86,
                  "stores":5,
                  "Berg":1,
                  "Karl":1,
                  "HH34":1,
                  "Average":1,
                  "Average2":1
               },
               {  
                  "Name":"square",
                  "Product id":8653,
                  "Mean1":65,
                  "SD1":86,
                  "Mean2":643,
                  "SD2":733,
                  "stores":5,
                  "Berg":1,
                  "Karl":1,
                  "HH34":1,
                  "Average":1,
                  "Average2":1
               },
               {  
                  "Name":"rhombus",
                  "Product id":75368,
                  "Mean1":456,
                  "SD1":46,
                  "Mean2":6245,
                  "SD2":72,
                  "stores":5,
                  "Berg":1,
                  "Karl":1,
                  "HH34":1,
                  "Average":1,
                  "Average2":1
               },
               {  
                  "Name":"parallel",
                  "Product id":094217,
                  "Mean1":7644,
                  "SD1":62,
                  "Mean2":51,
                  "SD2":53,
                  "stores":5,
                  "Berg":1,
                  "Karl":1,
                  "HH34":1,
                  "Average":1,
                  "Average2":1
               }
            ]
         }
      ]
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
        if ($scope.selectedRow != null && $scope.selectedRow.level == 3) {
            alert('Cannot add node to this level');
            return;
        } else if ($scope.selectedRow != null) {
            $scope.selectedRow.children.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain",
                A: 0
            });
        } else {
            $scope.tree_data.push({
                Name: "New_Node",
                Area: 268581,
                Population: 26448193,
                TimeZone: "Mountain",
                A: 0
            });
        }
    }

    $scope.deleteRow = function() {
        branch = $scope.selectedRow;
        console.log(branch);
        outcome = confirm('Are you sure you want to delete ' + branch.Name + ' ?');
        if (outcome == false) return;
        console.log($scope.tree_data.indexOf(branch));
        if (branch.level == 1) {
            $scope.tree_data.splice($scope.tree_data.indexOf(branch), 1)
        } else if (branch.level == 2) {
            for (i = 0; i < $scope.tree_data.length; i++) {
                if ($scope.tree_data[i].children.indexOf(branch) > -1) {
                    $scope.tree_data[i].children.splice($scope.tree_data[i].children.indexOf(branch), 1);
                    break;
                }
            }
        } else if (branch.level == 3) {
            for (i = 0; i < $scope.tree_data.length; i++) { //level1
                if ($scope.tree_data[i].children.length > 0) { //check if children exist
                    for (j = 0; j < $scope.tree_data[i].children.length; j++) { // if children exist loop though it
                        if ($scope.tree_data[i].children[j].uid == branch.parent_uid) {
                            $scope.tree_data[i].children[j].children.splice($scope.tree_data[i].children[j].children.indexOf(branch), 1);
                            break;
                        }
                    }
                }
            }
        }
    }

    $scope.deselectRow = function() {
        console.log('In deselectRow')
        $scope.selectedRow = null;
    }



    var init = function() {
        initializeData()
        console.log('In init()')
    }

    var initializeData = function() {
        console.log('In initializeData()')
        for (i = 0; i < $scope.tree_data.length; i++) { //USA & India
            $scope.tree_data[i].expanded = true
            var temp = 0
            if ($scope.tree_data[i].children != null && $scope.tree_data[i].children.length > 0) { //If level 1 has children
                var count = 0; //Count variable to check level 3 nodes that are 0
                console.log($scope.tree_data[i].Name + " has children")
                for (j = 0; j < $scope.tree_data[i].children.length; j++) { //Cali & Illinois
                    $scope.tree_data[i].children[j].expanded = true
                    if ($scope.tree_data[i].children[j].children != null && Object.keys($scope.tree_data[i].children[j].children).length > 0) { //If level 2 has children
                        
                        console.log($scope.tree_data[i].children[j].Name + " has children")
                        count = 0
                        for (k = 0; k < Object.keys($scope.tree_data[i].children[j].children).length; k++) {
                            $scope.tree_data[i].children[j].children[k].expanded = true;
                            completed = 0
                            if ($scope.tree_data[i].children[j].children[k].Berg == 1) {
                                completed += 2
                            }
                            if ($scope.tree_data[i].children[j].children[k].Karl == 1) {
                                completed += 2
                            }
                            if ($scope.tree_data[i].children[j].children[k].HH34 == 1) {
                                completed += 1
                            }
                            count += completed
                            $scope.tree_data[i].children[j].children[k].stores = completed
                        }

                        $scope.tree_data[i].children[j].stores = Math.floor(count / Object.keys($scope.tree_data[i].children[j].children).length)
                        console.log(count)
                        temp += $scope.tree_data[i].children[j].stores
                    }
                }
                console.log("temp : "+ temp)
                $scope.tree_data[i].stores = Math.floor(temp / $scope.tree_data[i].children.length)
            }

        }
    }

    init();

});