var app = angular.module('myApp', ['treeGrid', 'xeditable']);

app.controller('myCtrl', function($scope, $http) {

    $scope.col_defs = [{
            field: "Product id",
            displayName: "Product id"
        },
        {
            field: "Generated forecast",
            displayName: "Generated forecast"
        },
        {
            field: "System forecast",
            displayName: "System forecast"
        },
        {
            field: "A",
            displayName: "A"
        },
        {
            field: "B",
            displayName: "B"
        },
        {
            field: "Stores",
            displayName: "Stores"
        }
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
        $http({
            method: "POST",
            url: "http://localhost:8081/addTreeData",
            data: $scope.tree_data
        }).then(function mySucces(response) {
            initializeData()
            location.reload()
            console.log('success')
            console.log(response.data)
        }, function myError(response) {
            console.log(response.statusText)
        })
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

        $http({
            method: "POST",
            url: "http://localhost:8081/addTreeData",
            data: $scope.tree_data
        }).then(function mySucces(response) {
            initializeData()
            location.reload()
            console.log('success')
            console.log(response.data)
        }, function myError(response) {
            console.log(response.statusText);
        });
    }

    $scope.resetData = function() {
        $scope.tree_data = [{
                "Name": "USA",
                "Product id": 9826675,
                "Generated forecast": 318212000,
                "System forecast": "UTC -5 to -10",
                "A": "1/2",
                "1": 0.56,
                "2": 0.46,
                "3": 0.18,
                "total": 1.50,
                "children": [{
                        "Name": "California",
                        "Product id": 423970,
                        "Generated forecast": 38340000,
                        "System forecast": "Pacific Time",
                        "A": "1/2",
                        "1": "1/2",
                        "2": 0.33,
                        "3": 0.15,
                        "total": 1.29,
                        "children": [{
                                "Name": "San Francisco",
                                "Product id": 231,
                                "Generated forecast": 837442,
                                "System forecast": "PST",
                                "A": 1,
                                "1": 1,
                                "2": 0.76,
                                "3": 0.85,
                                "total": 2.28,
                                "uid": "0.5259034653475307",
                                "parent_uid": "0.19315158825942902",
                                "children": [

                                ],
                                "expanded": false,
                                "level": 3
                            },
                            {
                                "Name": "Los Angeles",
                                "Product id": 503,
                                "Generated forecast": 3904657,
                                "System forecast": "PST",
                                "A": 0.56,
                                "1": "",
                                "2": 0.29,
                                "3": 0.45,
                                "total": 1.05,
                                "uid": "0.9164884504669628",
                                "parent_uid": "0.19315158825942902",
                                "children": [

                                ],
                                "expanded": false,
                                "level": 3
                            }
                        ],
                        "uid": "0.19315158825942902",
                        "parent_uid": "0.6553580416041782",
                        "expanded": true,
                        "level": 2,
                        "selected": false
                    },
                    {
                        "Name": "Illinois",
                        "Product id": 57914,
                        "Generated forecast": 12882135,
                        "System forecast": "Central Time Zone",
                        "A": 1,
                        "1": 1,
                        "2": 0.53,
                        "3": 0.16,
                        "total": 1.40,
                        "children": [{
                            "Name": "Chicago",
                            "Product id": 234,
                            "Generated forecast": 2695598,
                            "System forecast": "CST",
                            "A": 1,
                            "1": 1,
                            "2": 0.90,
                            "3": 0.82,
                            "total": 1.84,
                            "uid": "0.8797474338481657",
                            "parent_uid": "0.6899022709342761",
                            "children": [],
                            "expanded": false,
                            "level": 3
                        }],
                        "uid": "0.6899022709342761",
                        "parent_uid": "0.6553580416041782",
                        "expanded": true,
                        "level": 2,
                        "selected": false
                    }
                ],
                "uid": "0.6553580416041782",
                "expanded": true,
                "level": 1,
                "selected": false
            },

            {
                "Name": "India",
                "Product id": 268581,
                "Generated forecast": 26448193,
                "System forecast": "Mountain",
                "A": 1,
                "1": 1,
                "2": 0.56,
                "3": 0.23,
                "total": 1.22,
                "uid": "0.7220238105378316",
                "children": [

                ],
                "expanded": false,
                "level": 1
            }
        ]



        $http({
            method: "POST",
            url: "http://localhost:8081/addTreeData",
            data: $scope.tree_data
        }).then(function mySucces(response) {
            initializeData()
            location.reload()
            console.log('success')
            console.log(response.data)
        }, function myError(response) {
            console.log(response.statusText);
        });
        

    }

    $scope.deselectRow = function() {
        console.log('In deselectRow')
        $scope.selectedRow = null;
    }



    var init = function() {
        $http({
            method: "GET",
            url: "http://localhost:8081/listTreeData"
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
        for (i = 0; i < $scope.tree_data.length; i++) { //USA & India
            $scope.tree_data[i].selected = false
            if ($scope.tree_data[i].children != null && $scope.tree_data[i].children.length > 0) { //If level 1 has children
                var count = 0; //Count variable to check level 3 nodes that are 0
                console.log($scope.tree_data[i].Name + " has children")
                for (j = 0; j < $scope.tree_data[i].children.length; j++) { //Cali & Illinois
                    $scope.tree_data[i].children[j].selected = false
                    if ($scope.tree_data[i].children[j].children != null && Object.keys($scope.tree_data[i].children[j].children).length > 0) { //If level 2 has children
                        
                        console.log($scope.tree_data[i].children[j].Name + " has children")
                        var completed = 0

                        for (k = 0; k < Object.keys($scope.tree_data[i].children[j].children).length; k++) {
                            $scope.tree_data[i].children[j].children[k].selected = false;
                            if ($scope.tree_data[i].children[j].children[k].A == 1) {
                                completed++
                            }
                        }

                        if (Object.keys($scope.tree_data[i].children[j].children).length == completed) {
                            $scope.tree_data[i].children[j].A = 1
                        } else {
                            $scope.tree_data[i].children[j].A = completed + "/" + Object.keys($scope.tree_data[i].children[j].children).length
                        }
                        console.log($scope.tree_data[i].children[j].Name + " : " + $scope.tree_data[i].children[j].A)

                        console.log($scope.tree_data[i].Name + " > " + $scope.tree_data[i].children[j].Name + ".A : " + $scope.tree_data[i].children[j].A)

                        if ($scope.tree_data[i].children[j].A == 1) {
                            count++
                        }
                    }
                }

                console.log($scope.tree_data[i].Name + "'s count = " + count)

                if ($scope.tree_data[i].length == count) {
                    $scope.tree_data[i].A = count
                } else {
                    $scope.tree_data[i].A = count + "/" + $scope.tree_data[i].children.length
                }
                console.log($scope.tree_data[i].Name + " : " + $scope.tree_data[i].A)
            }
            else {
                $scope.tree_data[i].A = 1
            }
        }
    }

    init();

});