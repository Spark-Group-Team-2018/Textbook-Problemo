class User < ApplicationRecord

  has_many :pending_offers
  has_many :wishlists

end
