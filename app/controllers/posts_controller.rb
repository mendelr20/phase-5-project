class PostsController < ApplicationController
    # def index
    #   posts = Post.includes(:user, comments: :user, categories: :name).all
  
    #   render json: {
    #     posts: posts.as_json(include: {
    #       user: { only: [:id, :username] },
    #       comments: {
    #         include: { user: { only: [:id, :username] } }
    #       },
    #       categories: { only: [:id, :name] }
    #     })
    #   }
    # end
  end
  