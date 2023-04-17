class PostsController < ApplicationController
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
end
