class SessionsController < ApplicationController
  def new       
    redirect_to games_path if current_user
  end

  def create
    if request.env['omniauth.auth'] 
      ### omniauth login
      omniauth_hash = request.env['omniauth.auth'][:info]
      user = User.find_or_create_by_omniauth(omniauth_hash) 
      session[:user_id] = user.id 
      redirect_to root_path 
    else 
      ### regular login
      @user = User.find_by(username: params[:user][:username])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        redirect_to root_path
      else
        error_message 
        render :new
      end
    end
  end

  def destroy
    session.clear
    redirect_to '/login'
  end

  private

  def error_message
    if params[:user][:username] ==''
      @error = 'Username cannot be blank.'
    elsif params[:user][:password] ==''
      @error = 'Password cannot be blank.'
    elsif @user == nil
      @error = 'Invalid username.'
    else
      @error = 'Invalid password.'
    end
  end
end
