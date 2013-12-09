(function(){var a;a=angular.module("topicaApp",["ngRoute","ngSanitize","ngCookies","restangular","http-auth-interceptor","ui.bootstrap","ngAnimate","monospaced.elastic","angularMoment","ui-gravatar","md5","topicaApp.directives.pluspicker","topicaApp.directives.ngFocus","topicaApp.filters.linebreak"]),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/login",{templateUrl:"views/login.html",controller:"LoginController"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupController"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileController"}).otherwise({redirectTo:"/"})}]),a.config(["RestangularProvider",function(a){return a.setBaseUrl("/api/v1")}]),a.constant("Configs",{apiRoot:"/api/v1"}),a.run(["$rootScope","$location","$http","Configs","authService","UserSession",function(a,b,c,d,e,f){return a.changeView=function(a){return b.path(a)},a.logout=function(){return c.get(d.apiRoot+"/logout"),f.destroySession(),b.path("/login")},a.$on("event:auth-loginRequired",function(){return b.path("/login")}),a.$on("event:auth-loginConfirmed",function(a,c){return f.setSession(c),b.path("/")})}])}).call(this),function(){var a;a=angular.module("topicaApp"),a.controller("MainController",["Restangular","$scope","$http","Configs","$location","$rootScope","UserSession",function(a,b,c,d,e,f,g){var h,i;return b.newComment=[],h=[],i=[],b.user=g.getSession(),a.all("home").getList().then(function(a){return b.posts=a}),b.toggleComments=function(c){return h[c]=!h[c],h[c]?a.one("posts",b.posts[c].id).getList("comments").then(function(a){return b.posts[c].comments=a,b.posts[c].comment_size!==a.length?b.posts[c].comment_size=a.length:void 0}):void 0},b.commentIsOpen=function(a){return!!h[a]},b.toggleNewComment=function(a){return i[a]=!i[a],i[a]?void 0:b.posts[a].newComment=""},b.newCommentIsOpen=function(a){return!!i[a]},b.submitComment=function(c){return a.one("posts",b.posts[c].id).all("comments").post({content:b.posts[c].newComment,user_id:b.user.id}).then(function(a){return b.posts[c].newComment="",a.user=b.user,b.posts[c].comments||(b.posts[c].comments=[]),b.posts[c].comments.push(a),b.posts[c].comment_size+=1})},b.commentLoseFocus=function(){return b.focusComment=!1}}])}.call(this),function(){var a;a=angular.module("topicaApp"),a.controller("LoginController",["Configs","$http","$scope","authService","UserSession",function(a,b,c,d,e){return c.credential={email:"",password:"",rememberMe:!1},c.submit=function(){return e.login(c.credential.email,c.credential.password,c.credential.rememberMe).then(function(a){var b;return b=a.data.user,d.loginConfirmed(b)},function(){return c.message="Invalid username or password."})}}])}.call(this),function(){var a;a=angular.module("topicaApp"),a.controller("SignupController",["Configs","$http","$scope","UserSession","authService",function(a,b,c,d,e){var f;return c.credential={},c.submittable=!1,f=!0,c.checkSubmittable=function(){return c.submittable=c.credential.email&&""!==c.credential.email&&c.credential.username&&""!==c.credential.username&&c.credential.password&&""!==c.credential.password&&c.credential.passwordConfirmation&&""!==c.credential.passwordConfirmaion,f=c.credential.password&&c.credential.passwordConfirmation!==c.credential.password?!1:!0,c.submittable&=f,c.message=f?"":"Password not match."},c.submit=function(){return b.post(a.apiRoot+"/signup",{email:c.credential.email,password:c.credential.password,password_confirmation:c.credential.passwordConfirmation,username:c.credential.username}).then(function(){return d.login(c.credential.email,c.credential.password).then(function(a){var b;return b=a.data.user,e.loginConfirmed(b)},function(){return c.message="Invalid username or password"})},function(a){return console.log(a),c.message=a.data.message})}}])}.call(this),function(){var a;a=angular.module("topicaApp"),a.controller("NavbarController",["$rootScope","UserSession","$scope",function(a,b,c){var d,e,f,g;return c.user=b.getSession(),f=!1,e=!1,g=!1,d=[{name:"user",text:"Users",icon:"user"},{name:"feed",text:"Feeds",icon:"folder"},{name:"topic",text:"Topics",icon:"comment-o"}],c.visibleItems=d,c.arrowClass=function(){return g?"fa-angle-double-left":"fa-angle-double-right"},c.selectMenuItem=function(a){return g?(c.visibleItems=d,g=!1):(c.visibleItems=[c.visibleItems[a]],g=!0)},c.toggleHotcornerMenu=function(){return e=!e},c.showMenuItem=function(a){return""===selectedMenuItem||selectedMenuItem===a},c.hotcornerIconClass=function(){return c.hoverHotcornerMenu||e?"hotcorner-selected":""},c.hotcornerMenuClass=function(){return e?"hotcorner-open-all":c.hoverHotcornerMenu?"hotcorner-open-all":c.hoverHotcornerIcon?"hotcorner-open-part":""}}])}.call(this),function(){var a;a=angular.module("topicaApp"),a.controller("NewPostController",["Restangular","$scope","Configs","UserSession","$http",function(a,b,c,d,e){return b.user=d.getSession(),b.baseUrl=c.apiRoot,b.newPost={},b.itemTemplate={user_id:b.user.id,topic_type:1},b.createNewPost=function(){return b.selectedTopicIds=_.map(_.filter(b.topics,"selected"),function(a){return a.id}),e.post(c.apiRoot+"/posts/",{title:b.newPost.title,content:b.newPost.content,topic_ids:b.selectedTopicIds}).then(function(a){var c;return c=angular.element(document.getElementById("main-view")).scope(),b.newPost=a.data,b.newPost.user=b.user,b.newPost.num_of_comments=0,b.newPost.topics=_.map(_.filter(b.topics,"selected"),function(a){return{id:a.id,name:a.text,topic_type:a.topic_type}}),c.posts.unshift(b.newPost),b.newPost={}}),b.edit=!1},b.addItem=function(a){return console.log(a)}}])}.call(this),function(){var a;a=angular.module("topicaApp"),a.controller("ProfileController",["Restangular","$scope","$http","Configs","$location","$rootScope","UserSession",function(a,b,c,d,e,f,g){return g.currentUser().then(function(a){return f.userSession.user=a.data},function(){return f.userSession.user={username:"user"}}),a.one("users",b.userSession.user.id).all("posts").getList().then(function(a){return b.posts=a}),a.one("users",b.userSession.user.id).all("topics").getList().then(function(a){return b.topics=a})}])}.call(this),function(){var a;a=angular.module("topicaApp.directives.pluspicker",[]),a.directive("pluspicker",["$document","$http",function(a,b){var c,d;return d=null,c=angular.noop,{restrict:"CA",scope:{items:"=",addItem:"&onAdd",remoteUrl:"@",itemTemplate:"&"},template:"<div ng-class=\"{'open': isOpen}\">\n  <div class='pluspicker-toggle pluspicker-box' ng-click=\"openMenu($event)\">\n    <span class='pluspicker-listitem' ng-repeat='item in selectedItems'>\n      <span class='pluspicker-listitem-content'>\n        <span class='pluspicker-listitem-text'>\n          {{item.text}}\n        </span>\n        <div class='pluspicker-close' ng-click='deselectItem({{item.id}}, $event)'>\n          <i class='fa fa-times-circle'></i>\n        </div>\n      </span>\n    </span>\n    <span class='pluspicker-input-area'>\n      <input type='text' class='pluspicker-input-area' placeholder='+ add topic' ng-model=\"input\">\n      </input>\n    </span>\n  </div>\n  <ul class='pluspicker-menu'>\n    <li class='pluspicker-menu-item' ng-repeat='item in items | filter: {selected: false} | filter: input' ng-click='selectItem({{item.id}}, $event)'>\n      <a>\n        {{item.text}}\n      </a>\n    </li>\n    <li class='pluspicker-menu-item pluspicker-menu-add' ng-click='newItem()' ng-show='!!input && isNew()'>\n      <a>\n        Add \"{{input}}\"\n      </a>\n    </li>\n  </ul>\n</div>",link:function(c){return b.get(c.remoteUrl).then(function(a){var b;return c.items=function(){var c,d,e,f;for(e=a.data,f=[],c=0,d=e.length;d>c;c++)b=e[c],f.push({id:b.id,text:b.name,selected:!1});return f}()}),c.selectedItems=[],c.isNew=function(){return!_.contains(_.map(c.items,function(a){return a.text}),c.input)},c.newItem=function(){var a;return a=c.itemTemplate(),a.name=c.input,b.post(c.remoteUrl,a).then(function(b){var d;return d={id:b.data.id,text:a.name,selected:!0},c.selectedItems.push(d),c.items.unshift(d)}),c.input="",c.addItem({item:c.input})},c.selectItem=function(a,b){var d;return d=_.find(c.items,function(b){return b.id===a}),d.selected=!0,c.selectedItems.push(d),b.preventDefault(),b.stopPropagation()},c.deselectItem=function(a,b){return _.find(c.items,function(b){return b.id===a}).selected=!1,c.selectedItems=c.selectedItems.filter(function(b){return b.id!==a}),b.preventDefault(),b.stopPropagation()},a.bind("click",function(){return c.$apply("isOpen = false"),c.$apply("input = ''")}),c.openMenu=function(a){return a.preventDefault(),a.stopPropagation(),c.isOpen=!0},c.$watch("$location.path",function(){return c.isOpen=!1,c.input=""})}}}])}.call(this),function(){var a;a=angular.module("topicaApp.directives.ngFocus",[]),a.directive("ngFocus",["$timeout",function(a){return{link:function(b,c,d){return b.$watch(d.ngFocus,function(b){return angular.isDefined(b)&&b?a(function(){return c[0].focus()}):void 0},!0),c.bind("blur",function(){return angular.isDefined(d.ngFocusLost)?b.$apply(d.ngFocusLost):void 0})}}}])}.call(this),function(){var a;a=angular.module("topicaApp.filters.linebreak",[]),a.filter("linebreak",function(){return function(a){return a.replace(/\n/g,"<br/>")}})}.call(this),function(){var a;a=angular.module("topicaApp"),a.service("UserSession",["$http","Configs","authService","$cookies","$location",function(a,b,c,d,e){var f;return f=void 0,this.login=function(c,d,e){return a.post(b.apiRoot+"/login",{email:c,password:d,remember:e})},this.setSession=function(a){return f={},f.id=a.id,f.username=a.username,f.email=a.email,console.log(f.id),d.id=""+f.id,d.username=f.username,d.email=f.email},this.destroySession=function(){return f=void 0,delete d.uid,delete d.email,delete d.username},this.getSession=function(){return null!=f?f:null!=d.id?(f={},f.id=parseInt(d.id),f.username=d.username,f.email=d.email,f):(this.destroySession(),e.path("/login"),void 0)}}])}.call(this);