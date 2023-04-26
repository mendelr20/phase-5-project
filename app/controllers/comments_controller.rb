class CommentsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :find_user

  def create
    if @user.id != params[:user_id].to_i
      render json: { error: 'Unauthorized' }, status: :unauthorized and return
    end

      comment = @user.comments.new(comment_params)
      if comment.save
        render json: {
          id: comment.id,
          body: comment.body,
          user: {
            id: @user.id,
            username: @user.username,
            first_name: @user.first_name,
            last_name: @user.last_name,
            profile_pic_url: @user.profile_pic_url,
          },
        }, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

    def destroy
    comment = Comment.find(params[:id])
    if comment.user == @user
      comment.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def update
    @comment = @user.comments.find(params[:id])
      if @comment.update(comment_params)
        render json: {
          id: @comment.id,
          body: @comment.body,
          user: {
            id: @user.id,
            username: @user.username,
            first_name: @user.first_name,
            last_name: @user.last_name,
            profile_pic_url: @user.profile_pic_url,
          },
        }
      else
        render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
  end



    private

    def find_user
      @user = User.find_by!(id: session[:user_id])
    end
  
    def comment_params
      params.permit(:post_id, :user_id, :body).merge(user_id: @user.id)
    end
  
    def render_record_not_found
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  
    def render_unprocessable_entity(exception)
      render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end    
end
