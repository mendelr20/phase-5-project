class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :post_id
end
