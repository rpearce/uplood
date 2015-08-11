class UsersController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @users = User.all
        render json: @users
      end
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { redirect_to root_path }
        format.json { render json: {}, status: 201 }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: 422 }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :avatar)
  end
end
