json.extract! repository, :id, :name, :description, :user_id, :created_at, :updated_at
json.url api_repository_url(repository, format: :json)
