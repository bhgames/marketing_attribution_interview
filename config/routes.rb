Rails.application.routes.draw do
  
  root "frontend#index"

  namespace :api, defaults: { format: :json } do
    resources :users do
      member do
        resources :repositories
      end
    end
  end

  get '*path', to: "frontend#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
