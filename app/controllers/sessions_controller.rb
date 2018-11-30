class SessionsController < ApplicationController
    def new
    end
  
    def create
      omniauth_email = request.env['omniauth.auth'][:info][:email] 
      # raise omniauth_email.inspect
      if omniauth_email #omniauth login
        user = User.find_or_create_by_omniauth(omniauth_email) #custom omniauth helper
        session[:user_id] = user.id 
        redirect_to root_path 
      else #native login
        @user = User.find_by(username: params[:user][:username])
    
        if @user && @user.authenticate(params[:user][:password])
          session[:user_id] = @user.id
          redirect_to root_path
        else
          redirect_to '/login'
        end
      end
    end

    def destroy
      session.clear
      redirect_to '/login'
    end
end
