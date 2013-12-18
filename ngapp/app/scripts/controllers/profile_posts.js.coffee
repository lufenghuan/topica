###*
* @doc overview
* @id profile_posts_controller
* @name topicaApp.controllers:ProfilePostsController
* @description This is the profile_postscontroller.
*
###

app = angular.module('topicaApp')
app.controller "ProfilePostsController", [
  "Restangular",
  "UserSession",
  "$scope",
  "Configs",
  "$routeParams",
  (Restangular, UserSession, $scope, Configs, $routeParams) ->
    $scope.baseUrl = Configs.apiRoot
    $scope.user = UserSession.getSession()
    $scope.profileId = $routeParams.profileId
    Restangular.one("users", $scope.user.id).all("posts").getList().then (posts) ->
      console.log(posts)
      $scope.posts = posts
    Restangular.one("users", $scope.user.id).all("detailed_topics").getList().then (topics) ->
      $scope.topics = topics

    $scope.showPosts = (topicId) ->
      if topicId == $scope.openningPostTopic
        $scope.openningPostTopic = undefined
      else
        $scope.openningPostTopic = topicId
      Restangular.one("topics", topicId).all("posts").getList().then (posts) ->
        _.find($scope.topics, (topic) ->
          topic.id is topicId
        ).posts = posts
]
