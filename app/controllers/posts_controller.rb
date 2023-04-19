class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  skip_before_action :authorize, only: [:index]
  def index
    posts = Post.all

    render json: {
      posts: posts.as_json(include: {
        user: {
          only: [:id, :username, :first_name, :last_name],
          methods: [:profile_pic_url]
        },
        comments: {
          include: {
            user: {
              only: [:id, :username, :first_name, :last_name],
              methods: [:profile_pic_url]
            }
          }
        },
        categories: { only: [:id, :name] }
      })
    }
  end
  private

      def find_user
        @user = User.find_by!(id: session[:user_id])
      end
  
    
      def render_record_not_found
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    
      def render_unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
      end  
end
