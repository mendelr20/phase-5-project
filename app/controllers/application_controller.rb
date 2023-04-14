class ApplicationController < ActionController::API
  include ActionController::Cookies
  # before_action :set_active_storage_host
  
  # def set_active_storage_host
  #   ActiveStorage::Current.host = 'http://localhost:3000' if ActiveStorage::Current.host.blank?
  #   true
  # end
end
