class UsersController < ApplicationController
    # ActiveStorage::Current.host = "http://localhost:3000"
    def user_params
        params.require(:username, :email, :password_digest, :first_name, :last_name, :user_picture)
    end

end
