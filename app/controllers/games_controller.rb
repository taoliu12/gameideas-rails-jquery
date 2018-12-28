class GamesController < ApplicationController
    before_action :authentication_required

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
        @suggestion = @game.suggestions.build
        respond_to do |format| 
            format.html 
            format.json { render json: @game }
        end
    end
    
    def edit
        
    end
    
    def update
        
    end
    
    def destroy
        
    end

    private

    def game_params
        params.require(:game).permit(:title, :summary, :genre_id)
    end
end
