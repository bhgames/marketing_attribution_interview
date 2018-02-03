class Api::RepositoriesController < ApplicationController
  before_action :set_repository, only: [:show, :update, :destroy]

  # GET /repositories
  # GET /repositories.json
  def index
    @repositories = User.find(params[:id]).repositories
  end

  # GET /repositories/1
  # GET /repositories/1.json
  def show
  end

  # POST /repositories
  # POST /repositories.json
  def create
    @repository = Repository.new(repository_params)

    if @repository.save
      render :show, status: :created
    else
      render json: @repository.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /repositories/1
  # PATCH/PUT /repositories/1.json
  def update
    if @repository.update(repository_params)
      render :show, status: :ok
    else
      render json: @repository.errors, status: :unprocessable_entity
    end
  end

  # DELETE /repositories/1
  # DELETE /repositories/1.json
  def destroy
    @repository.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_repository
      @repository = Repository.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def repository_params
      params.require(:repository).permit(:name, :description, :user_id)
    end
end
