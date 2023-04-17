class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    user_id = session[:user_id]
    @user = User.find(user_id)
    render json: {
      id: @user.id,
      email: @user.email,
      profile_pic: @user.profile_pic_url
    }
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user.as_json(methods: [:profile_pic_url], except: [:password_digest, :created_at, :updated_at]), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user.as_json(methods: [:profile_pic_url], except: [:password_digest, :created_at, :updated_at])
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :username, :first_name, :last_name, :profile_pic)
  end
end
