class CreateGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :genres do |t|
      t.integer :user_id
      t.integer :game_id
      t.string :name
    end
  end
end
