class AddGreenlitToSuggestion < ActiveRecord::Migration[5.2]
  def change
    add_column :suggestions, :status, :integer, default: 0
  end
end
