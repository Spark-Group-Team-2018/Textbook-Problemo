class OfferController < ApplicationController

  def show
    @data = File.read("#{Rails.root}/public/data/offers.json")
    render :json => @data
  end

end
