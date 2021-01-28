class ApplicationController < ActionController::Base
    def authentication_required
        if !logged_in?
            redirect_to login_path
        end
    end

    def logged_in?
        session[:user_id]
    end

    def welcome         
        if session[:user_id].present?
            @user = User.find(session[:user_id])
        else
            redirect_to login_path
        end
    end

    def current_user
        return unless session[:user_id]
        @current_user ||= User.find(session[:user_id])
    end

    helper_method :current_user, :logged_in?
end
