class User < ApplicationRecord
    ActiveStorage::Current.host = "http://localhost:3000"
    has_many :created_posts, class_name: 'Post', dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :commented_posts, through: :comments, source: :post
  
    has_secure_password
    has_one_attached :profile_pic
  
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true, length: { minimum: 8 }, format: { with: /\A(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])/x, message: "must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." }
    validates :first_name, presence: true
    validates :last_name, presence: true

    def profile_pic_url
        Rails.application.routes.url_helpers.rails_blob_url(profile_pic, only_path: true) if profile_pic.attached?
    end
end
