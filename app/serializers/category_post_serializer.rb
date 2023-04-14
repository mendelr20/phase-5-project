class CategoryPostSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :post_id
end
