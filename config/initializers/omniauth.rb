Rails.application.config.middleware.use OmniAuth::Builder do
    provider :github, ENV['60c0adfc797e28838bfe'], ENV['6a0b3d65100850e1a8be4bb8a1e3678566708c56']
  end