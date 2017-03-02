Rails.application.routes.draw do
  devise_for :users
  resources :expenses
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "expenses#index"
  
  namespace :api do
    namespace :v1 do
      resources :expenses, only: [:index, :create, :destroy, :update]
    end
  end
  
end
