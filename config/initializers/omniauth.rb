Rails.application.config.middleware.use OmniAuth::Builder do
    provider :github, 'fb59f06792bc0fa6c5a2', 'a1b3f9230a7fd829db1acf59999b37d32fa6681e'
  end