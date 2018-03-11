class TextbookController < ApplicationController

  def index
    @textbooks = Textbook.all().as_json

    @real_textbooks = @textbooks.map do |textbook|
      textbook["textbook_title"] = Book.find(textbook["book_id"]).title
    end

    puts @real_textbooks

    render :json => @textbooks
  end

  def show
    @textbook = Textbook.find(params[:id]).as_json rescue nil

    if @textbook then
      @textbook["textbook_title"] = Book.find(@textbook["book_id"]).title
      render :json => @textbook
    else
      render :json => {status: 404}
    end

  end

end
