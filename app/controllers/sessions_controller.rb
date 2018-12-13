class SessionsController < ApplicationController
  def new

  end

  def create
    # raise omniauth_email.inspect
    if request.env['omniauth.auth'] #omniauth login
      omniauth_hash = request.env['omniauth.auth'][:info]
      user = User.find_or_create_by_omniauth(omniauth_hash) #custom omniauth helper in User model
      # raise user.errors.inspect
      session[:user_id] = user.id 
      redirect_to root_path 
    else #native login
      @user = User.find_by(username: params[:user][:username])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        redirect_to root_path
      else
        # redirect_to '/login'
        error_message
        render :new
      end
    end
  end

  def destroy
    session.clear
    redirect_to '/login'
  end

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
