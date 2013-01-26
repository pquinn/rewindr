class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :lastfm_username
      t.string :rdio_uid
      t.string :rdio_token
      t.string :rdio_secret

      t.timestamps
    end
  end
end
