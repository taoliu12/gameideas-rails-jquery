class GamesController < ApplicationController


    def index
        @games = Game.all
    end

    def new
        @game = Game.new
    end
    
    def create
        @game = Game.create(game_params)
        redirect_to game_path(@game)
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
