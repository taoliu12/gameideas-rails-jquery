class CreateSuggestions < ActiveRecord::Migration[5.2]
  def change
    create_table :suggestions do |t|
      t.string :content
      t.integer :game_id
      
      t.timestamps
    end
  end
end
