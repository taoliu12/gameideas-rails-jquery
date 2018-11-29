class SuggestionsController < ApplicationController
    def index
        @game = Game.find(params[:game_id])
        @suggestions = @game.suggestions.all
    end

    def new
        @game = Game.find(params[:game_id])
        @suggestion = @game.suggestions.build
    end
    
    def create
        @game = Game.find(params[:game_id])
        @suggestion = @game.suggestions.build(suggestion_params)
        if @suggestion.save
            redirect_to game_suggestions_path
        else
            render 'suggestions/new'
        end  
    end

    def show
        @game = Game.find(params[:id])
        
    end
    
    def edit
        
    end
    
    def update
         raise params.inspect
        @suggestion = Suggestion.find_by_id(params[:id])
        @suggestion.update(suggestion_params)
    end
    
    def destroy
        
    end

    private

    def suggestion_params
        params.require(:suggestion).permit(:content, :status)
    end
end
