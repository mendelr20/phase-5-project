class PostsController < ApplicationController
    def index
      posts = Post.includes(user: [:profile_pic], categories: {}, comments: [user: [:profile_pic]]).all
  
      render json: {
        posts: posts.as_json(include: {
          user: { only: [:id, :username, :first_name, :last_name], include: { profile_pic: { only: [:url] } } },
          comments: {
            include: { user: { only: [:id, :username, :first_name, :last_name], include: { profile_pic: { only: [:url] } } } }
          },
          categories: { only: [:id, :name] }
        })
      }
    end
  end
  