require 'faker'

# Create 10 users with random data
puts "👥 Creating users..."
10.times do
    avatar_url = Faker::Avatar.image(slug: Faker::Internet.unique.slug, size: '300x300', format: 'png')
    downloaded_image = URI.open(avatar_url)
    user = User.create!(
      username: Faker::Internet.unique.username,
      email: Faker::Internet.unique.email,
      password: 'Password123@$',
      password_confirmation: 'Password123@$',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
    )
    user.profile_pic.attach(io: downloaded_image, filename: 'avatar.png')
    # (io: File.open('/Users/mendelrosenblum/Development/Code/Projects/phase-5-project/Dr.jpeg'), filename: 'Dr.jpeg')
    
end
puts "✅ Users created!\n"

# Create 5 categories
puts "📚 Creating categories..."
categories = []
5.times do
  categories << Category.create!(
    name: Faker::Lorem.unique.word.capitalize
  )
end
puts "✅ Categories created!\n"

# Create 50 posts with random data, and assign them to random users and categories
puts "📝 Creating posts..."
50.times do
  post = Post.create!(
    title: Faker::Lorem.sentence(word_count: 3, random_words_to_add: 7),
    body: Faker::Lorem.paragraph_by_chars(number: 500),
    user_id: User.pluck(:id).sample
  )
  post.categories << categories.sample(rand(1..3))

  # Add random comments to each post by random users
  rand(1..5).times do
    Comment.create!(
      body: Faker::Lorem.sentence(word_count: 10),
      post_id: post.id,
      user_id: User.pluck(:id).sample
    )
  end
end
puts "✅ Posts created!"
