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
      title: "The Importance of Emergency Medicine and EMS",
      body: "Emergency medicine and EMS (Emergency Medical Services) play a vital role in healthcare systems all around the world. They are responsible for providing urgent medical care to individuals in critical and life-threatening situations. The work of these professionals is essential for saving lives and preventing long-term disability. Emergency medicine is a medical specialty that focuses on the diagnosis and treatment of acute illnesses and injuries that require immediate medical attention. Emergency physicians are trained to handle a wide range of medical emergencies, from heart attacks and strokes to severe injuries and illnesses. EMS, on the other hand, is a system of trained professionals who respond to medical emergencies in the field. They are often the first medical professionals to arrive at the scene of an emergency and provide initial treatment and stabilization. EMS professionals work in a variety of settings, including ambulances, helicopters, and even on the scene of major disasters. The importance of emergency medicine and EMS cannot be overstated. They are often the difference between life and death for individuals in critical situations. Without their quick and expert care, many individuals would not survive their medical emergencies or would suffer from long-term disability. It's crucial that emergency medicine and EMS are well-supported and equipped with the resources they need to provide the highest quality care. This includes everything from training and education to state-of-the-art medical equipment and facilities. In conclusion, emergency medicine and EMS are critical components of healthcare systems worldwide. Their work is essential for saving lives and preventing long-term disability, and it's crucial that they are well-supported and equipped to provide the best possible care.",
      user_id: User.pluck(:id).sample
    )
    p1.categories << c1 << c2 << c3

  p2 = Post.create!(
    title: "The Challenges of Working in Emergency Medicine and EMS",
    body: "Working in emergency medicine and EMS can be incredibly rewarding, but it also comes with its own set of challenges. These professionals work in high-pressure environments where split-second decisions can mean the difference between life and death. The following are some of the most significant challenges faced by emergency medicine and EMS professionals: Emotional Stress: Emergency medicine and EMS professionals often encounter traumatic and emotionally charged situations. They may witness the suffering and death of patients, which can be incredibly challenging to cope with. The constant exposure to high-stress situations can also lead to burnout and mental health issues. Physical Demands: Emergency medicine and EMS work can be physically demanding, requiring long hours of standing, lifting and carrying heavy equipment, and working in cramped and uncomfortable spaces. These physical demands can lead to back pain, joint problems, and other health issues. Risk of Infection: Emergency medicine and EMS professionals are at increased risk of exposure to infectious diseases, such as COVID-19, hepatitis, and HIV. They must take extra precautions to protect themselves and their patients from the spread of infection. Lack of Resources: Emergency medicine and EMS professionals often work with limited resources, such as staff shortages, inadequate equipment, and outdated facilities. This can make their work even more challenging and stressful. Despite these challenges, emergency medicine and EMS professionals continue to provide critical care to those in need. It's important to recognize the sacrifices they make and to support them in their work. This includes providing access to resources for coping with emotional stress, improving working conditions, and investing in training and education. In conclusion, working in emergency medicine and EMS can be incredibly rewarding, but it also comes with significant challenges. These professionals must navigate emotional stress, physical demands, and risk of infection while working with limited resources. It's crucial that we recognize their sacrifices and support them in their work.",
    user_id: User.pluck(:id).sample
  )
  p2.categories << c2 << c3 << c6

  p3 = Post.create!(
    title: "Emergency Medicine and the Vital Role of the ER",
    body: "Emergency medicine is a critical field of medicine that deals with the diagnosis and treatment of medical conditions that require immediate attention. The emergency room (ER) is the primary location for emergency medicine, and it plays a vital role in saving lives and preventing long-term health problems. The ER is staffed by a team of medical professionals who are trained to quickly assess and diagnose patients in critical condition. These professionals include emergency physicians, nurses, and technicians, among others. They work together to provide urgent care to patients with a wide range of medical conditions, from heart attacks and strokes to severe injuries and infections. In addition to providing medical care, the ER also serves as a safety net for patients who may not have access to regular medical care. Patients who are uninsured or underinsured can seek care at the ER, regardless of their ability to pay. This makes the ER an essential part of the healthcare system, as it ensures that everyone has access to emergency medical care when they need it most. Despite its importance, the ER is often overcrowded and understaffed, which can lead to long wait times and delayed care for patients. To address this issue, healthcare providers and policymakers need to invest in emergency medicine and increase the resources available to the ER. In conclusion, emergency medicine and the ER play a vital role in our healthcare system. They provide urgent care to patients with critical medical conditions and serve as a safety net for those who may not have access to regular medical care. To ensure that everyone has access to emergency medical care, we need to invest in emergency medicine and increase the resources available to the ER.",
    user_id: User.pluck(:id).sample
  )
  p3.categories << c3 << c4 << c5


  p4 = Post.create!(
    title: "The Importance of Paramedics in Emergency Medicine",
    body: "Paramedics play a crucial role in emergency medicine. They are often the first healthcare providers to arrive at the scene of an emergency, and their quick response and expert medical care can mean the difference between life and death. Paramedics are trained to provide advanced life support to patients in emergency situations. They are skilled in managing cardiac arrests, trauma, and other life-threatening conditions. They also have the ability to administer medications, interpret electrocardiograms, and perform other medical procedures in the field. In addition to their medical skills, paramedics also have strong communication and interpersonal skills. They must be able to effectively communicate with patients, their families, and other healthcare providers in high-pressure situations. They must also be able to make quick decisions and adapt to rapidly changing conditions. The importance of paramedics in emergency medicine cannot be overstated. They are often the first line of defense in emergency situations, and their quick response and expert care can save lives. If you ever find yourself in an emergency situation, rest assured that paramedics are there to help you.",
    user_id: User.pluck(:id).sample
  )
  p4.categories << c2 << c6 << c3

  p5 = Post.create!(
    title: "The Life-Saving Role of Paramedics in Emergency Medicine",
    body: "Emergency medicine is a critical field of medicine that deals with the diagnosis and treatment of medical conditions that require immediate attention. The emergency room (ER) is the primary location for emergency medicine, and it plays a vital role in saving lives and preventing long-term health problems. The ER is staffed by a team of medical professionals who are trained to quickly assess and diagnose patients in critical condition. These professionals include emergency physicians, nurses, and technicians, among others. They work together to provide urgent care to patients with a wide range of medical conditions, from heart attacks and strokes to severe injuries and infections. In addition to providing medical care, the ER also serves as a safety net for patients who may not have access to regular medical care. Patients who are uninsured or underinsured can seek care at the ER, regardless of their ability to pay. This makes the ER an essential part of the healthcare system, as it ensures that everyone has access to emergency medical care when they need it most. Despite its importance, the ER is often overcrowded and understaffed, which can lead to long wait times and delayed care for patients. To address this issue, healthcare providers and policymakers need to invest in emergency medicine and increase the resources available to the ER. In conclusion, emergency medicine and the ER play a vital role in our healthcare system. They provide urgent care to patients with critical medical conditions and serve as a safety net for those who may not have access to regular medical care. To ensure that everyone has access to emergency medical care, we need to invest in emergency medicine and increase the resources available to the ER.",
    user_id: User.pluck(:id).sample
  )
  p5.categories << c1 << c3 << c5


  p6 = Post.create!(
    title: "The Importance of Communication Skills in Paramedicine",
    body: "Paramedics play a crucial role in emergency medicine. They are often the first healthcare providers to arrive at the scene of an emergency, and their quick response and expert medical care can mean the difference between life and death. Paramedics are trained to provide advanced life support to patients in emergency situations. They are skilled in managing cardiac arrests, trauma, and other life-threatening conditions. They also have the ability to administer medications, interpret electrocardiograms, and perform other medical procedures in the field. In addition to their medical skills, paramedics also have strong communication and interpersonal skills. They must be able to effectively communicate with patients, their families, and other healthcare providers in high-pressure situations. They must also be able to make quick decisions and adapt to rapidly changing conditions. The importance of paramedics in emergency medicine cannot be overstated. They are often the first line of defense in emergency situations, and their quick response and expert care can save lives. If you ever find yourself in an emergency situation, rest assured that paramedics are there to help you.",
    user_id: User.pluck(:id).sample
  )
  p6.categories << c3 << c4 << c5

puts "✅ Posts created!"

puts "📝 Creating comments..."

    Comment.create!(
      body: "As someone who has had to call on EMS multiple times for myself and loved ones, I can attest to the importance of their work. Their quick response and expert care made all the difference in our outcomes. Thank you to all the emergency medicine and EMS professionals out there!",
      post_id: p1.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body:"I work in healthcare and have seen firsthand the incredible work that emergency physicians and EMS professionals do every day. They truly are heroes, and I have the utmost respect for them and their work.",
      post_id: p1.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body:"I think it's also important to recognize the mental and emotional toll that emergency medicine and EMS work can take on these professionals. They are often exposed to traumatic and stressful situations, and it's essential that they have access to support and resources to help them cope with the challenges of their work.",
      post_id: p1.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "As someone who has had to call on EMS multiple times for myself and loved ones, I can attest to the importance of their work. Their quick response and expert care made all the difference in our outcomes. Thank you to all the emergency medicine and EMS professionals out there!",
      post_id: p2.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "As someone who has had to call on EMS multiple times for myself and loved ones, I can attest to the importance of their work. Their quick response and expert care made all the difference in our outcomes. Thank you to all the emergency medicine and EMS professionals out there!",
      post_id: p2.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "As someone who has worked in emergency medicine for years, I can attest to the challenges outlined in this post. It's important that we support our colleagues in the field by advocating for better working conditions, resources, and mental health support.",
      post_id: p2.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I can't stress enough how important emergency medicine and the ER are. As someone who has had to use the ER multiple times, I am grateful for the care I received. However, I do agree that more resources need to be allocated to the ER to improve wait times and ensure that patients receive timely care.",
      post_id: p3.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body:"I have worked in emergency medicine for over a decade, and I can attest to the incredible work that ER staff do every day. It's a challenging and fast-paced environment, but it's also incredibly rewarding to know that you are helping people in their time of need.",
      post_id: p3.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "Emergency medicine is truly a critical field, and we need to do more to support it. I think it's important to educate the public on when it's appropriate to go to the ER versus urgent care or a primary care doctor. This could help alleviate some of the overcrowding in the ER and ensure that patients receive the appropriate level of care.",
      post_id: p3.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "As someone who has had to call 911 in an emergency, I can attest to the incredible work that paramedics do. They were so skilled and professional, and I am so grateful for their care.",
      post_id: p4.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I have a lot of respect for paramedics. They are truly heroes who put their lives on the line to save others. Thank you for all that you do!",
      post_id: p4.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I recently had a health scare and had to be taken to the hospital by paramedics. They were so compassionate and reassuring during a really scary time. I don't know what I would have done without them.",
      post_id: p4.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I can't stress enough how important emergency medicine and the ER are. As someone who has had to use the ER multiple times, I am grateful for the care I received. However, I do agree that more resources need to be allocated to the ER to improve wait times and ensure that patients receive timely care.",
      post_id: p5.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body:"I have worked in emergency medicine for over a decade, and I can attest to the incredible work that ER staff do every day. It's a challenging and fast-paced environment, but it's also incredibly rewarding to know that you are helping people in their time of need.",
      post_id: p5.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "Emergency medicine is truly a critical field, and we need to do more to support it. I think it's important to educate the public on when it's appropriate to go to the ER versus urgent care or a primary care doctor. This could help alleviate some of the overcrowding in the ER and ensure that patients receive the appropriate level of care.",
      post_id: p5.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "As someone who has had to call 911 in an emergency, I can attest to the incredible work that paramedics do. They were so skilled and professional, and I am so grateful for their care.",
      post_id: p6.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I have a lot of respect for paramedics. They are truly heroes who put their lives on the line to save others. Thank you for all that you do!",
      post_id: p6.id,
      user_id: User.pluck(:id).sample,
    )
    Comment.create!(
      body: "I recently had a health scare and had to be taken to the hospital by paramedics. They were so compassionate and reassuring during a really scary time. I don't know what I would have done without them.",
      post_id: p6.id,
      user_id: User.pluck(:id).sample,
    )


puts "✅ Comments created!"
