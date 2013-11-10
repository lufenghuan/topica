class Api::V1::HomeController < Api::V1::ApplicationController
  def index
    render :json => User.find(current_user.id).posts
  end
end