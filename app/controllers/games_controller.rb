class GamesController < ApplicationController
    before_action :authentication_required
    
    def my_games
        @user = current_user
        @games = @user.games
        @genres = @user.genres.uniq
    end

    def index
        @genres = Genre.all
        if params[:genre_id]
            @genre = Genre.find_by(id: params[:genre_id])
            @games = @genre.games
        else 
            @games = Game.all
        end

        @games_list_order = 'Oldest to Newest'
        
        respond_to do |f| 
            f.json {render :json => @games }
            f.html { }
        end
    end

    def newest_to_oldest
        @genres = Genre.all
        if params[:genre_id]
            @genre = Genre.find_by(id: params[:genre_id])
            @games = @genre.games
        else 
            @games = Game.newest_to_oldest
        end
        
        respond_to do |f| 
            f.json { render :json => @games }
            f.html { render :index }
        end
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
        flash[:message] = "Game was successfully deleted."
        redirect_to games_path
    end

    private

    def game_params
        params.require(:game).permit(:title, :summary, :genre_id)
    end
end
