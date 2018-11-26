class ApplicationController < ActionController::Base
    def welcome
        if session[:user_id].present?
            @user = User.find(session[:user_id])
        else
            redirect_to login_path
        end
    end
end
