'use strict';

angular.module('app')
    .controller('createHomeworkCtrl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.ID = "";        
        $scope.Title = "";
        $scope.CourseTitle = "";
        $scope.showQuestion = false;
        $scope.teachingCode = $stateParams.entity.teachingCode;
        $scope.SchoolID = $stateParams.entity.schoolID;;
        $scope.homeworkID = $stateParams.entity.homeworkID;
        $scope.Type = $stateParams.entity.Type;
        $scope.TypeName = "";
        $scope.wxSchool = enume.wxSchool;

        if ($scope.Type == "0") {
            $scope.TypeName = "作业";
        }
        else {
            $scope.TypeName = "问卷调查";
        }

        $scope.data = {
            current: "1" // 1代表作业基本信息，2代表作业完成信息
        };

        $scope.actions =
            {
                setCurrent: function (param) {
                    $scope.data.current = param;
                }
            }

        function getInfoByCode() {
            var id = $stateParams.entity.homeworkID;
            enume.getData(srvDomain + "/Homework/Update?ID=" + id, function (item) {
                $scope.ID = item.ID;
                $scope.SchoolID = item.SchoolID;
                $scope.Title = item.Title;
                if (item.FinishTime != null && item.FinishTime != "") {
                    $scope.FinishTime = new Date(Date.parse(item.FinishTime.replace(/-/g, "/")));
                }
                $scope.CreateBy = item.CreateBy;
                $scope.CreateTime = item.CreateTime;
                $scope.ModifyBy = item.ModifyBy;
                $scope.ModifyTime = item.ModifyTime;

            })
        }

        $scope.showButton = true;
        if ($stateParams.entity.tag == "edit") {
            $scope.t_title = "修改" +$scope.TypeName;
            getInfoByCode();
            $scope.showButton = true;
            $scope.showQuestion = true;

        }
        else if ($stateParams.entity.tag == "detail") {
            $scope.t_title =  $scope.TypeName+"详情";
            getInfoByCode();
            $scope.showButton = false;
            $scope.showQuestion = true;
        }
        else {
            $scope.t_title = "添加" + $scope.TypeName;
            $scope.showButton = true;
        }

        $scope.backToHomeworkList = function () {
            $state.go("safeRoom.homeworkList", { entity: { Type: $scope.Type } });
        }

        $scope.createHomework = function () {

            var tmp = {
                SchoolID: $scope.SchoolID,
                TeachingCode:$scope.teachingCode,
                Title: $scope.Title,
                Type: $scope.Type,
                FinishTime: $scope.FinishTime,
                Remark: $scope.Remark
            };

            //var e = jsCoreMethod.validateEmail($scope.email,"请输入正常的的邮箱!");
            //if(e.bl == false){
            //    alert(e.msg);
            //    return;
            //}

            //if($scope.key != "" && $scope.key.length != 8){
            //    alert("加密密匙必须为8为数字字符或者符号组成!");
            //    return;
            //}

            var url = "";
            if ($stateParams.entity.tag == "edit") {
                var id = $stateParams.entity.homeworkID;
                url = srvDomain + "/Homework/Update";
                tmp.id = id;
            } else {
                url = srvDomain + "/Homework/Add";
            }
            enume.postData(url, tmp, function (d) {
                if ($stateParams.entity.tag == "add") {
                    $state.go("safeRoom.homeworkCreate", { entity: { tag: "edit", homeworkID: d } });
                }
                else {
                    alert("保存成功！");
                }

            })
        }
    })

    .controller('homeworkListCtrl', function ($http, $scope, enume, $state, $stateParams) {
        $scope.Type = $stateParams.entity.Type;
        $scope.TypeName = "";

        if ($scope.Type == "0") {
            $scope.TypeName = "作业";
        }
        else {
            $scope.TypeName = "问卷调查";
        }
    })



  

