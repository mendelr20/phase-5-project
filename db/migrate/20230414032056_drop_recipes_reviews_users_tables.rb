class DropRecipesReviewsUsersTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :recipes
    drop_table :reviews
    drop_table :users
  end
end
