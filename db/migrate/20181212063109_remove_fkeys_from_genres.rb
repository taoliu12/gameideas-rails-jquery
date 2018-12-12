class RemoveFkeysFromGenres < ActiveRecord::Migration[5.2]
  def change
    remove_column :genres, :game_id
    remove_column :genres, :user_id
  end
end
