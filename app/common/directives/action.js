/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午9:59
 */
define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzAction', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(data){

                        element.html('<i class="'+ data.icon + ' ' + (attrs.color ? attrs.color : '') + '"></i> ' + data.title);

                        if(data.status == 0){
                            //TODO 需要判断当前用户是否有权限进行该操作
                            //element.remove(); //若无权限，则不显示该链接
                            element.attr('class', element.attr('class') + ' disabled');   //若无权限，则禁用该链接
                        }else{
                            //替换uri中的动态参数
                            if(attrs.args){
                                //把字符串转换成js对象
                                var argObj = (new Function('return ' + attrs.args))();
                                angular.forEach(argObj, function(value, key){
                                    data.uri = data.uri.replace(':'+key, value);
                                });
                            }
                            element.attr('href', '#!' + data.uri);
                        }
                    });
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});