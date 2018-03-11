class BooksController < ApplicationController

  def index
    @books = Book.all()
    render :json => @books
  end

  def show
    @book = Book.find(params[:id]) rescue nil

    if @book then
      render :json => @book
    else
      render :json => {status: 404}
    end

  end


end
