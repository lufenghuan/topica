Topica::Application.routes.draw do
  # The namespace for the APIs
  namespace :api do
    # The namespace for API v1 
    namespace :v1 do
      post "login" => "user_sessions#create"
      post "signup" => "users#create"
      get "logout" => "user_sessions#destroy"
      root :to => "application#ping"
      get "ping" => "application#ping"
      
      resources :comments, :only => [:destroy, :update, :show]

      resources :posts, :only => [:destroy, :update, :show] do
        resources :comments, :only => [:index, :create]
        get "/favors" => "favors#all_favorers"
        get "/topics" => "categories#all_topics"
        post "/topics/delete" => "categories#destroy"
        post "/topics" => "categories#create"
      end
      
      resources :topics, :only => [:destroy, :update, :show] do
        get "/followers" => "followships#all_following_users"
        get "/posts" => "categories#all_posts"
        resources :posts, :only => [] do
          resources :comments, :only => [:index]
        end
      end
      resources :feeds, :only => [:update, :destroy, :show] do
        get "/topics" => "feeds#all_topics"
      end
      resources :users, :only => [:create, :update, :destroy, :index, :show] do
        
        # favors
        get "/favors/:post_id" => "favors#create"
        post "/favors" => "favors#create"
        delete "/favors/:post_id" => "favors#destroy"
        get "/favors" => "favors#index" 

        resources :comments, :only => [:index]

        resources :posts, :only => [:create, :index]

        get "/follows" => "followships#all_following_topics" # following topics

        resources :topics, :only => [:index, :create]

        resources :feeds, :only => [:index, :create]
      end
    end
  end
  match "*path", :to => "api/v1/errors#routing_error", :via => [:get, :post, :put, :delete, :patch]
end
