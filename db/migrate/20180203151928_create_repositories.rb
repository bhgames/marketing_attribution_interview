class CreateRepositories < ActiveRecord::Migration[5.1]
  def change
    create_table :repositories do |t|
      t.string :name
      t.string :description
      t.integer :user_id

      t.timestamps
    end

    add_foreign_key :repositories, :users
  end
end
