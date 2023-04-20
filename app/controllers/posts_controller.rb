class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def index
    posts = Post.all

    render json: {
      posts: posts.as_json(include: {
        user: {
          only: [:id, :username, :first_name, :last_name],
          methods: [:profile_pic_url]
        },
        comments: {
          only: [:id, :body],
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

  def create
    @user = User.find_by(id: session[:user_id])
    post = Post.new(post_params)

    if post.save
      render json: {
        post: post.as_json(include: {
          user: {
            only: [:id, :username, :first_name, :last_name],
            methods: [:profile_pic_url]
          },
          comments: {
            only: [:id, :body],
            include: {
              user: {
                only: [:id, :username, :first_name, :last_name],
                methods: [:profile_pic_url]
              }
            }
          },
          categories: { only: [:id, :name] }
        })
      }, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(id: session[:user_id])
    post = Post.find(params[:id])
    if post.user == @user
      post.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :user_id)
  end

  def render_record_not_found
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
