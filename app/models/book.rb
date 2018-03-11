class Book < ApplicationRecord
  belongs_to :manufacturer, optional: true

  has_many :textbooks
  has_many :wishlists

end
