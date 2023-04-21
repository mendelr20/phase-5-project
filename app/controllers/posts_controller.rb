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
    category_ids = params[:post][:category_ids].map(&:to_i)
    categories = Category.where(id: category_ids)
    post_params[:categories] = categories
    if post.save
      new_categories = category_ids - post.category_ids
      post.category_posts.create(category: categories) if new_categories.any?

      
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

  def update
    @user = User.find_by(id: session[:user_id])
    post = Post.find(params[:id])
    category_ids = params[:post][:category_ids].map(&:to_i)
    categories = Category.where(id: category_ids)
    post_params[:categories] = categories
    if post.update(post_params)
      new_categories = category_ids - post.category_ids
      post.category_posts.create(category: categories) if new_categories.any?
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
      }
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  private

  def post_params
    params.require(:post).permit(:title, :body, :user_id, category_ids: [])
  end

  def render_record_not_found
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
