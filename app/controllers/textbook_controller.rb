class TextbookController < ApplicationController

  def show
    @data = File.read("#{Rails.root}/public/data/textbooks.json")
    render :json => @data
  end

end
