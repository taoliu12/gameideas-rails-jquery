class SessionsController < ApplicationController
    def new
    end
  
    def create
      if auth_hash = request.env['omniauth.auth'] #omniauth
        raise auth_hash.inspect
      else
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
