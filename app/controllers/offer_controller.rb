class OfferController < ApplicationController

  def index
    @offers = Offer.all()
    render :json => @offers
  end

  def show
    @offer = Offer.find(params[:id]) rescue nil

    if @offer then
      render :json => @offer
    else
      render :json => {status: 404}
    end

  end

end
