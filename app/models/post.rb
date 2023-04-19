class Post < ApplicationRecord
    belongs_to :user, class_name: 'User'

    has_many :comments, dependent: :destroy
    has_many :category_posts, dependent: :destroy
    has_many :categories, through: :category_posts
    
  
    validates :title, presence: true
    validates :body, presence: true, length: { minimum: 25 }
end

  