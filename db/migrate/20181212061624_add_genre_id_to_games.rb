class AddGenreIdToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :genre_id, :integer
  end
end
