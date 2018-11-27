class GamesController < ApplicationController


    def index
        @games = Game.all
    end

    def new
        @game = Game.new
    end
    
    def create
        #current_user.games.create(game_params)
        @game = Game.create(game_params)
        if @game.save
            redirect_to game_path(@game)
        else
            redirect_to new_game_path
        end
        
    end

    def show
        @game = Game.find(params[:id])

    end
    
    def edit
        
    end
    
    def update
        
    end
    
    def destroy
        
    end

    private

    def game_params
        params.require(:game).permit(:title, :summary)
    end
end
