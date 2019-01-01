class GamesController < ApplicationController
    before_action :authentication_required
    
    def my_games
        @user = current_user
        @games = @user.games
        @genres = @user.genres.uniq
    end

    def index
        @games = Game.all
    end

    def newest_to_oldest
        @games = Game.newest_to_oldest
    end

    def new
        @game = Game.new
    end
    
    def create
        # raise params.inspect
        @game = current_user.games.create(game_params)
        if @game.save
            redirect_to game_path(@game)
        else
            #use render instead of redirect in order to preserve @game.errors
            render :new
        end
    end

    def show
        @game = Game.find(params[:id])
        # @suggestion = @game.suggestions.build
        # raise @game.suggestions.inspect
    end
    
    def edit
        @game = Game.find(params[:id])
    end
    
    def update
        @game = Game.find(params[:id])
        @game.update(game_params)
        redirect_to game_path(@game)
    end
    
    def destroy
        @game = Game.find(params[:id])
        @game.destroy
        redirect_to games_path
    end

    private

    def game_params
        params.require(:game).permit(:title, :summary, :genre_id)
    end
end
