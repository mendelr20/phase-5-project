class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    
    def create
      user = User.find_by(username: params[:username])
    
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_pic_url: user.profile_pic_url
        }, status: :created
      else
        render json: { errors: ["Invalid username or password"] }, status: :unprocessable_entity
      end
    end
  
    def destroy
      user = User.find_by(id: session[:user_id])
      if user
        session.delete :user_id
        head :no_content
      else
        render json: { errors: ["Not authorized"] }, status: :unprocessable_entity
      end
    end
    
  end
  