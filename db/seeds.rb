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
end
puts "✅ Users created!\n"


puts "📚 Creating categories..."
c1 = Category.create(name: 'Medical')
c2 = Category.create(name: "EMS")
c3 = Category.create(name: 'EMT')
c4 = Category.create(name: "Paramedic")
c5 = Category.create(name: 'Ambulance')
c6 = Category.create(name: "Hopital")
c7 = Category.create(name: 'Emergency')
c8 = Category.create(name: "Nurse")
c9 = Category.create(name: "911")
c10 = Category.create(name: "NYC911")
puts "✅ Categories created!\n"

# Create 50 posts with random data, and assign them to random users and categories
puts "📝 Creating posts..."

p1 = Post.create!(
    title: "Common EMS Procedures: What to Expect in an Emergency",
    body: Faker::Lorem.paragraph_by_chars(number: 500),
    user_id: User.pluck(:id).sample
  )
  post.categories << categories.sample(rand(1..3))

puts "✅ Posts created!"

puts "📝 Creating comments..."
  # Add random comments to each post by random users
  rand(1..5).times do
    Comment.create!(
      body: Faker::Lorem.sentence(word_count: 10),
      post_id: post.id,
      user_id: User.pluck(:id).sample
    )
  end

puts "✅ Comments created!"
