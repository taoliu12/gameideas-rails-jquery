class SuggestionsController < ApplicationController
    before_action :set_game

    def index
        @suggestions = @game.suggestions.all
        # respond_to do |f| 
        #     f.html {redirect_to @game}
        #     f.json {render :json => @suggestions }
        # end
        render :json => @suggestions 
    end

    def new
        @suggestion = @game.suggestions.build
    end
    
    def create
        @suggestion = @game.suggestions.build(suggestion_params)
        @suggestion.user = current_user
        if @suggestion.save
            respond_to do |f| 
                f.html {redirect_to @game}
                f.json {render :json => @suggestion }
            end
            # render  :json => @suggestion 
        else
            render 'games/show'
        end  
    end

    def show        
    end
    
    def edit
        
    end
    
    def update
        @suggestion = Suggestion.find_by_id(params[:id])
        @suggestion.update(suggestion_params)
        redirect_back(fallback_location: game_path(@game)) #goes to the previous page, or on error, falls back to game show page
    end
    
    def destroy
        
    end

    private
        def set_game
            @game = Game.find(params[:game_id])
        end

        def suggestion_params
            params.require(:suggestion).permit(:content, :status)
        end
end
