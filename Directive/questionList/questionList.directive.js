/**
 * Created by wupeng5 on 2016/3/5.
 */


angular.module("app").directive("questionList",function(){
    return {
        templateUrl: "./Directive/questionList/questionList.html?v=1310",
        restrict:"EA",
        scope:{
            "chooseCallback":"=",
            "showAddBtn":"=",
            "showCk":"=",
            "from":"="
        },
        link:function(){},
        controller: function ($http, $scope, enume, $state, $rootScope, $stateParams) {

            //初始化下拉框数据  模板分类,模板类型
            $scope.homeworkID = $stateParams.entity.homeworkID;
            $scope.Title = "";
            $scope.CourseTitle = "";
            $scope.statusID = -1;
            $scope.Type = $stateParams.entity.Type;
            $scope.wxStatus = enume.wxStatus;
            $scope.List = [];

            $scope.getUrl = function () {
                return srvDomain + "/Question/Index?homeworkID=" + $scope.homeworkID;
            }
            //查询作业题目列表          
            $scope.$broadcast("searchByFilter");
            

            $scope.createQuestion = function () {
                $state.go("safeRoom.questionCreate", { entity: { tag: "add", from: "safe", homeworkID: $scope.homeworkID ,Type:$scope.Type } });
            }


            $scope.edit = function (item) {
                $scope.showButton = true;
                $state.go("safeRoom.questionCreate", { entity: { tag: "edit", questionID: item.ID, homeworkID: item.HomeworkID, Type: $scope.Type } });
            }

            $scope.detail = function (item) {
                $scope.showButton = false;
                $state.go("safeRoom.questionCreate", { entity: { tag: "detail", questionID: item.ID, homeworkID: item.HomeworkID, Type: $scope.Type } });
            }

            $scope.delete = function (item) {
                if (confirm("确定要删除此项目吗？")) {
                    var tmp = {                        
                    };
                    var url = "";

                    var id = item.ID;
                    url = srvDomain + "/Question/Delete";
                    tmp.id = id;

                    enume.postData(url, tmp, function (d) {
                        alert("删除成功!");
                        $scope.$broadcast("searchByFilter");
                    })
                }
            };

            

            $scope.directiveCallBack = function(d){
                $scope.List = d;
            }

           

            $scope.getRemark = function(item){
                return jsCoreMethod.cutString(item.remark,5);
            }

            $scope.$on("getCkQeustions",function(e,d){
                var d = $scope.questionList;

                var res = [];
                for(var i=0;i< d.length;i++){
                    if(d[i].ck){
                        res.push(d[i]);
                    }
                }
                $scope.chooseCallback(res);
            })
        }
    }
})