class ApplicationController < ActionController::Base
    def welcome
        if session[:id]
            @user = User.find(session[:id])
        end
    end
end
