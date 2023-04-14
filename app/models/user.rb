class User < ApplicationRecord
    has_many :created_posts, class_name: 'Post', dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :commented_posts, through: :comments, source: :post
  
    has_secure_password
    has_one_attached :user_picture
  
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    # validates :password, presence: true, length: { minimum: 8 }, format: { with: /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])\z/x, message: "must include at least one lowercase letter, one uppercase letter, one digit, and one special character" }
    validates :first_name, presence: true
    validates :last_name, presence: true
end
