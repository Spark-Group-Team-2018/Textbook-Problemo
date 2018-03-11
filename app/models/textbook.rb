class Textbook < ApplicationRecord
  belongs_to :book, optional: true
  belongs_to :user

  has_many :offers

end
