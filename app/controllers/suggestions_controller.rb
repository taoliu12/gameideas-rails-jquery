class SuggestionsController < ApplicationController
    def index
        @games = Game.all
    end

    def new
        @game = Game.new
    end
    
    def create
        @game = Game.find(params[:game_id])
        @suggestion = @game.suggestions.build(suggestion_params)
        if @suggestion.save
            redirect_to game_path(@game)
        else
            render 'games/show'
        end  
    end

    def show
        @game = Game.find(params[:id])
        @suggestion = @game.suggestions.build
    end
    
    def edit
        
    end
    
    def update
        
    end
    
    def destroy
        
    end

    private

    def suggestion_params
        params.require(:suggestion).permit(:content)
    end
end
