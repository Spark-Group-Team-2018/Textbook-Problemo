# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180311194114) do

  create_table "books", force: :cascade do |t|
    t.integer "ISBN", limit: 13
    t.string "title"
    t.string "description"
    t.integer "manufacturer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["manufacturer_id"], name: "index_books_on_manufacturer_id"
  end

  create_table "manufacturers", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "offers", force: :cascade do |t|
    t.float "lat"
    t.float "lon"
    t.decimal "price"
    t.boolean "is_public"
    t.integer "textbook_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["textbook_id"], name: "index_offers_on_textbook_id"
  end

  create_table "pending_offers", force: :cascade do |t|
    t.integer "offer_id"
    t.integer "buyer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["offer_id"], name: "index_pending_offers_on_offer_id"
  end

  create_table "textbooks", force: :cascade do |t|
    t.integer "book_id"
    t.integer "user_id"
    t.string "status"
    t.string "owner_description"
    t.boolean "is_public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_textbooks_on_book_id"
    t.index ["user_id"], name: "index_textbooks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index [nil], name: "index_users_on_buyer_id"
  end

  create_table "wishlists", force: :cascade do |t|
    t.integer "user_id"
    t.integer "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_wishlists_on_book_id"
    t.index ["user_id"], name: "index_wishlists_on_user_id"
  end

end
