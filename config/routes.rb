Rails.application.routes.draw do

  devise_for :users
  root "groops#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update]
end

