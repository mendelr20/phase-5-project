Rails.application.routes.draw do
  
  resources :category_posts
  resources :categories
  resources :comments
  resources :posts
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
