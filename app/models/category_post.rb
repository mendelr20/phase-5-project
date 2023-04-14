class CategoryPost < ApplicationRecord
    belongs_to :category
    belongs_to :post
    
    validates :category_id, presence: true
    validates :post_id, presence: true
end
