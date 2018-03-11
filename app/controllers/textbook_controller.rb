class TextbookController < ApplicationController

  def index
    @textbooks = Textbook.all()
    render :json => @textbooks
  end

  def show
    @textbook = Textbook.find(params[:id]) rescue nil

    if @textbook then
      render :json => @textbook
    else
      render :json => {status: 404}
    end

  end

end
