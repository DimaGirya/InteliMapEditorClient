/**
 * Created by Girya on 31/07/2016.
 */
var borderHeight = 25;
var borderWidth = 25;
var id = 0;
var data = [];
var app = angular.module("editor",[]);
app.controller("editorController",function ($scope,$http) {
    $scope.mapData = [];
   var currentRoom;
    $scope.width = 3;
    $scope.height = 3;
    $scope.roomName = "";
    $scope.selectedClassType="";
    $scope.roomType=["class","office","hallway","other"];

    for(var i = 0; i < borderHeight ; i ++){
        for(var j = 0; j < borderWidth ; j ++){
            while( $scope.mapData[j] === undefined){
                $scope.mapData.push([]);
            }
            $scope.mapData[j][i] = {status:"empty"};
        }
    }
    $scope.change = function () {
        console.log($scope.selectedClassType);
    };
    $scope.createRoom = function ()
    {
        currentRoom = [];
        for(var i = 0; i < borderHeight ; i ++){
            for(var j = 0; j < borderWidth ; j ++){
                if($scope.mapData[j][i].status == "mark"){
                    $scope.mapData[j][i].status = $scope.selectedClassType;
                    currentRoom.push({
                        "x":j,
                        "y":i
                    })
                }
            }
        }
        var room = {
            "id":id,
            "name":$scope.roomName,
            "type":$scope.selectedClassType,
            "status":$scope.selectedClassType,
            "area":currentRoom
        };
        id++;
        console.log(currentRoom);
        data.push(room);
        console.log(data);
    };

$scope.onBoxClicked = function (row,colmn) {
    $scope.addAreaToRoom($scope.width,$scope.height,colmn,row);
};
    $scope.addAreaToRoom = function(width,height,coordX,coordY){
        var room =
            {
                "width": width,
                "height":height,
                "coord_x": coordX,
                "coord_y": coordY,
                "id":id
            };
        $scope.colorRoom(room);
    };

    $scope.colorRoom = function (room){
        var height = room.height;
        var width = room.width;
        for( var i = room.coord_x ; i < room.coord_x + width ; i ++){
            for( var j = room.coord_y; j < room.coord_y+height ; j ++){
                $scope.mapData[j][i] = {status:"mark"};
            }
        }
        console.log(data);
    };

});



