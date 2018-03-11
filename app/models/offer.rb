class Offer < ApplicationRecord
  belongs_to :textbook

  has_many :pending_offers

end
