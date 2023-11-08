"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
  
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Exercises", [
      {
        name: "External rotation",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/_UvmPNGtlPM",
        tips: "Start by holding a light dumbbell or resistance band in one hand with your elbow bent and your upper arm close to your body. Keeping your elbow stationary, rotate your forearm outward, away from your body, while maintaining control and a slow and controlled movement.",
        description:
          "Shoulder external rotation with a resistive band is a great way to help strengthen your shoulders after an injury or surgery. Hold a resistive band in front of you with your thumbs up. Bend your elbows to about a 90 degree angle, and keep your elbows by your side. Keeping your wrists in a neutral position, pull the band outwards while keeping your elbows by your side. Slowly come back in.",
        musclesWorked: "Infraspinatus, teres minor, posterior deltoid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pendulum",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/L4QrSkoXpIw",
        tips: "Do not round your back or lock your knees.",
        description:
          "Lean forward and place one hand on a counter or table for support. Let your other arm hang freely at your side. Gently swing your arm forward and back. Repeat the exercise moving your arm side-to-side, and repeat again in a circular motion. Repeat the entire sequence with the other arm.",
        musclesWorked: "Deltoids, supraspinatus, infraspinatus, subscapularis",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crossover Arm Stretch",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/ATusl0jg4SU",
        tips: "Do not pull or put pressure on your elbow.",
        description:
          "Relax your shoulders and gently pull one arm across your chest as far as possible, holding at your upper arm. Hold the stretch for 30 seconds and then relax for 30 seconds. Repeat with the other arm. You should feel this stretch at the back of your shoulder",
        musclesWorked: "Posterior deltoid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Passive Internal Rotation",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/RNaMFoh1k64",
        tips: "Do not lean over or twist to side while pulling the stick.",
        description:
          "Hold a stick behind your back with one hand, and lightly grasp the other end of the stick with your other hand.Pull the stick horizontally as shown so that your shoulder is passively stretched to the point of feeling a pull without pain.Hold for 30 seconds and then relax for 30 seconds.Repeat on the other side. You should feel this stretch at the front of your shoulder",
        musclesWorked: "Supraspinatus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Passive External Rotation",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/ZbUoLkxYVMY",
        tips: "Keep your hips facing forward and do not twist.",
        description:
          "Grasp the stick with one hand and cup the other end of the stick with the other hand. Keep the elbow of the shoulder you are stretching against the side of your body and push the stick horizontally, as shown, to the point of feeling a pull without pain. Hold for 30 seconds and then relax for 30 seconds. Repeat on the other side. You should feel this stretch in the back of your shoulder.",
        musclesWorked: "Infraspinatus, teres minor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sleeper Stretch",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/OX6GtqNsHjE",
        tips: "Do not bend your wrist or press down on your wrist.",
        description:
          "Lie on your side on a firm, flat surface with the affected shoulder under you and your arm bent, as shown. You can place your head on a pillow for comfort, if needed. Use your unaffected arm to push your other arm down. Stop pressing down when you feel a stretch in the back of your affected shoulder. Hold this position for 30 seconds, then relax your arm for 30 seconds. You should feel this stretch in your outer upper back, behind your shoulder",
        musclesWorked: "Infraspinatus, teres minor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Standing Row",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/a7hcEMgr198",
        tips: "Squeeze your shoulder blades together as you pull.",
        description:
          "Make a 3-foot-long loop with the elastic band and tie the ends together. Attach the loop to a doorknob or other stable object.Stand holding the band with your elbow bent and at your side, as shown in the start position. Keep your arm close to your side and slowly pull your elbow straight back. Slowly return to the start position and repeat.",
        musclesWorked: "Middle and lower trapezius",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Internal Rotation",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/QFnXM2ueUIE",
        tips: "Keep your elbow pressed into your side.",
        description:
          "Make a 3-foot-long loop with the elastic band and tie the ends together. Attach the loop to a doorknob or other stable object.Stand holding the band with your elbow bent and at your side, as shown in the start position. Keep your elbow close to your side and bring your arm across your body. Slowly return to the start position and repeat.",
        musclesWorked: "Pectoralis, subscapularis",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Scapula Setting",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/WklUZWulQao",
        tips: "Do not tense up in your neck.",
        description:
          "Keeping your feet on the floor, and your hands gripped to the side of the chair (with the arms straight), pull up against the bottom of the chair (i.e. upwards). You should feel a muscular contraction at the bottom of your shoulder blades. Lie on your stomach with your arms by your sides. Place a pillow under your forehead for comfort, if required. Gently draw your shoulder blades together and down your back as far as possible. Ease about halfway off from this position and hold for 10 seconds. Relax and repeat 10 times.",
        musclesWorked: "Middle trapezius, serratus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Scapular Retraction/Protraction",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/gdiZFeaOQk0",
        tips: "Do not shrug your shoulder toward your ear.",
        description:
          "Access more range of motion and control of your scapula through this protraction and retraction  to separate your scapula from your ribcage and spine.",
        musclesWorked: "Middle trapezius, serratus",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bent-Over Horizontal Abduction",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/ncQ5kMwV7nY",
        tips: "Control the movement as you lower the weight.",
        description:
          "Begin bent over so your torso is about parallel to the floor. Palm should face forward and thumb will point upward. Raise the arm out to a “T” thinking about squeezing shoulder blade back. Be sure to keep shoulders square to the floor and only lift to the height of the torso, no further. Modify based on provider’s recommendations.",
        musclesWorked:
          "Middle and lower trapezius, Infraspinatus, teres minor, posterior deltoid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lateral Raises",
        injuryId: 1,
        videoLink: "https://www.youtube.com/embed/wZnsZsMywrY",
        tips: "Focus on maintaining proper form throughout the movement. Avoid using momentum or swinging the weights, and instead, lift the weights in a controlled manner, emphasizing the contraction in the lateral deltoids",
        description:
          "Lateral raises, also known as lateral deltoid raises or side raises, are a shoulder exercise that primarily targets the lateral deltoid muscle, located on the outer side of the shoulder. The exercise involves lifting the arms out to the sides while keeping them straight or slightly bent at the elbows.",
        musclesWorked: "deltoids",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bird Dog",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/b6zcIxFkuN4",
        tips: "Maintain a neutral spine throughout the movement and avoid arching or rounding your back. Focus on stability and control.",
        description:
          "The bird dog exercise is a core-strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable and neutral spine position. It resembles the posture of a bird dog pointing its prey.",
        musclesWorked: "transverse abdominis, erector spinae, glutes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bridge",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/I6vxggX_1KM",
        musclesWorked:
          "Targets the glutes (especially the gluteus maximus), hamstrings, and core muscles.",
        tips: "Lie on your back with your knees bent and feet flat on the ground. Lift your hips off the ground, pushing through your heels and engaging your glutes and hamstrings. Hold the position for a few seconds, then lower your hips back down. Repeat for the desired number of repetitions.",
        description:
          "The Bridge exercise is a classic bodyweight exercise that targets the glutes (especially the gluteus maximus), hamstrings, and core muscles. It helps strengthen and tone the posterior chain, improve hip stability, and enhance overall lower body strength. The exercise can be modified or progressed by adding resistance or performing single-leg variations.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pelvic Tilts",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/xOdfBCql6rw",
        musclesWorked:
          "Engages the deep core muscles, including the transverse abdominis and pelvic floor muscles.",
        tips: "Focus on initiating the movement from the lower abdomen while keeping the rest of your body relaxed. Avoid excessive arching or rounding of the spine.",
        description:
          "Pelvic tilts are a foundational core exercise that helps improve pelvic stability, strengthen the deep abdominal muscles, and promote proper alignment of the spine and pelvis.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Side-to-Side",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/-7XWweC0ivs",
        musclesWorked:
          "Targets the obliques (side abdominal muscles) and engages the deep core muscles.",
        tips: "Maintain a stable and engaged core throughout the movement. Control the side-to-side motion and avoid excessive twisting or leaning.",
        description:
          "The side-to-side exercise targets the oblique muscles, promoting lateral core strength and stability, which is beneficial for activities that involve twisting or bending sideways.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hamstring Stretch",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/C-wiOqYcxoI",
        musclesWorked:
          "Stretches the hamstrings (muscles at the back of the thigh).",
        tips: "Keep your back straight and avoid rounding your spine. Gently lean forward until you feel a stretch in the back of your thigh.",
        description:
          "The hamstring stretch helps improve hamstring flexibility and is beneficial for activities that require bending or extending the knees.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Piriformis Stretch",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/iL19XaxMmP4",
        musclesWorked:
          "Stretches the piriformis muscle located deep in the buttocks.",
        tips: "Keep your back straight and avoid excessive twisting of the spine. Gradually increase the stretch without causing pain or discomfort.",
        description:
          "The piriformis stretch targets the piriformis muscle, which can become tight and contribute to buttock and sciatic nerve pain. Stretching this muscle can help alleviate tension and improve hip flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "1/2 Kneeling Hip Flexor Stretch",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/Q4Ko275cluo",
        musclesWorked:
          "Stretches the hip flexor muscles, including the iliopsoas and rectus femoris.",
        tips: "Maintain an upright posture and avoid arching your lower back. Engage your glutes to deepen the stretch.",
        description:
          "The 1/2 kneeling hip flexor stretch targets the muscles at the front of the hip, helping to improve hip flexibility and alleviate tightness caused by prolonged sitting or activities that involve repetitive hip flexion.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Knee to Chest",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/8kzfXDNq_P8",
        musclesWorked: "Stretches the glutes and lower back muscles.",
        tips: "Pull your knee gently toward your chest and hold the stretch without bouncing. Keep your opposite leg relaxed and your back flat on the ground.",
        description:
          "The knee to chest stretch helps release tension in the glutes and lower back, promoting flexibility and relieving discomfort.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Knee Rotation",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/ENIEUp78CqY",
        musclesWorked: "Engages the hip and glute muscles.",
        tips: "Perform the movement in a slow and controlled manner. Avoid excessive pressure or strain on the knee joint.",
        description:
          "The knee rotation exercise targets the hip and glute muscles, promoting mobility and stability in the hip joint.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cobra Stretch",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/JDcdhTuycOI",
        musclesWorked:
          "Stretches the muscles of the lower back, chest, and shoulders.",
        tips: "Extend your arms fully, lift your chest off the ground, and elongate your spine. Avoid straining your neck by keeping it aligned with your spine.",
        description:
          "The cobra stretch is a gentle backbend that helps alleviate tension in the lower back, stretch the chest and shoulders, and improve overall spinal flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cat/Cow",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/u5TglXNBrtE",
        musclesWorked:
          "Engages the muscles of the spine, including the back extensors and abdominal muscles.",
        tips: "Move between cat and cow positions smoothly, coordinating your breath with the movement. Focus on creating a fluid motion in your spine.",
        description:
          "The cat/cow exercise is a gentle spinal mobilization exercise that promotes flexibility, relieves back tension, and enhances core stability.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Child’s Pose",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/2vJKSlfLX10",
        musclesWorked: "Stretches the muscles of the back, hips, and thighs.",
        tips: "Sink your hips back toward your heels, reach your arms forward, and relax your forehead on the ground. Breathe deeply and allow your body to relax into the pose.",
        description:
          "Child's pose is a restorative yoga position that stretches the back, hips, and thighs, promoting relaxation and releasing tension in the body.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Foam rolling",
        injuryId: 2,
        videoLink: "https://www.youtube.com/embed/aQ565ee0DrE",
        musclesWorked:
          "Targets tight or knotted muscles and fascia, aiding in muscle recovery and mobility.",
        tips: "Roll slowly over the target area, pausing on any tender spots or areas of tightness. Use your body weight to adjust the pressure and intensity.",
        description:
          "Foam rolling, also known as self-myofascial release, involves using a foam roller to apply pressure to tight or sore muscles, promoting muscle relaxation, increasing blood flow, and improving mobility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Straight Leg Raises",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/drEiYK2li9Q",
        musclesWorked:
          "Targets the muscles of the thighs, particularly the quadriceps.",
        tips: "Keep your leg straight and engage your core to stabilize your body. Avoid swinging or using momentum to lift your leg.",
        description:
          "Straight leg raises are an effective exercise for strengthening the quadriceps muscles, improving leg stability, and enhancing overall lower body strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Quad Stretch",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/l83s6t8VWsE",
        musclesWorked:
          "Stretches the muscles at the front of the thigh (quadriceps).",
        tips: "Hold onto a stable support for balance, and gently pull your heel toward your glutes to increase the stretch. Keep your knees close together and avoid excessive arching of the lower back.",
        description:
          "The quad stretch targets the muscles at the front of the thigh, helping to improve flexibility, reduce muscle tightness, and alleviate knee and hip discomfort.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hamstring Curls",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/oWu8RxtWdGE",
        musclesWorked:
          "Engages the hamstring muscles at the back of the thigh.",
        tips: "Maintain proper form throughout the movement, focusing on the mind-muscle connection with your hamstrings. Avoid using momentum or swinging your legs.",
        description:
          "Hamstring curls are an effective exercise for strengthening the hamstrings, improving leg stability, and enhancing overall lower body strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Squats",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/WbKT5b8ydmM",
        musclesWorked:
          "Targets the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Keep your feet shoulder-width apart, lower your hips back and down as if sitting into a chair, and maintain a neutral spine. Engage your core and push through your heels to rise back up.",
        description:
          "Squats are a fundamental compound exercise that targets multiple muscles in the lower body, promoting strength, stability, and functional movement.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Prone Straight Leg Raises",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/7WkAPLOaxmk",
        musclesWorked:
          "Engages the muscles of the glutes, hamstrings, and lower back.",
        tips: "Keep your core engaged and maintain control throughout the movement. Avoid lifting your legs too high or arching your lower back excessively.",
        description:
          "Prone straight leg raises are an effective exercise for targeting the glutes, hamstrings, and lower back muscles, promoting strength, stability, and improved posture.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wall Squats",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/aKBxiKs9n8A",
        musclesWorked:
          "Targets the quadriceps, hamstrings, glutes, and calves.",
        tips: "Lean against the wall with your feet hip-width apart and slowly slide down the wall, keeping your knees aligned with your ankles. Hold the position for the desired duration and then push through your heels to rise back up.",
        description:
          "Wall squats are a variation of squats that provide support and stability, targeting the muscles of the lower body and promoting leg strength, stability, and endurance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Calf Raises",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/C7qnbmpLNGI",
        musclesWorked:
          "Targets the muscles of the calves (gastrocnemius and soleus).",
        tips: "Push through the balls of your feet and rise onto your toes, lifting your heels as high as possible. Pause briefly at the top and then lower your heels back down.",
        description:
          "Calf raises are an effective exercise for strengthening the calf muscles, improving ankle stability, and enhancing lower leg strength and power.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Step-Ups",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/ACY7U8fOEdU",
        musclesWorked:
          "Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Step onto a stable elevated surface, leading with one foot at a time. Focus on maintaining proper form and control throughout the movement. Avoid pushing off with your back foot.",
        description:
          "Step-ups are a compound exercise that targets the muscles of the lower body, helping to improve strength, power, and stability in the legs and hips.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Side Leg Raises",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/izV5th7AQHM",
        musclesWorked:
          "Targets the muscles of the hips and outer thighs (abductors).",
        tips: "Keep your core engaged and maintain proper alignment throughout the movement. Avoid leaning or tilting your upper body excessively.",
        description:
          "Side leg raises are a great exercise for targeting the hip abductor muscles, improving hip stability, and enhancing overall lower body strength and balance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Presses",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/8nQteJqlBF8",
        musclesWorked:
          "Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Adjust the seat and foot placement to ensure proper form and alignment. Keep your back pressed against the pad and push through your heels while maintaining control.",
        description:
          "Leg presses are a popular machine exercise that targets multiple muscles in the lower body, providing an effective way to build strength, power, and muscular endurance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Heel Cord Stretch",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/6P_r7NIjj_o",
        musclesWorked:
          "Stretches the muscles of the calf (gastrocnemius and soleus).",
        tips: "Stand with one foot forward and one foot back, keeping both heels flat on the ground. Lean forward, bending the front knee, and feel the stretch in the back calf. Hold for the desired duration and then switch legs.",
        description:
          "The heel cord stretch is a simple and effective exercise for stretching the calf muscles, promoting flexibility, reducing muscle tightness, and improving ankle mobility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Standing Quadriceps Stretch",
        injuryId: 3,
        videoLink: "https://www.youtube.com/embed/pAm21cf6OLI",
        musclesWorked:
          "Stretches the muscles at the front of the thigh (quadriceps).",
        tips: "Hold onto a stable support for balance, grab your ankle or foot, and gently pull your heel toward your glutes. Keep your knees close together and maintain an upright posture.",
        description:
          "The standing quadriceps stretch targets the muscles at the front of the thigh, helping to improve flexibility, reduce muscle tightness, and alleviate knee discomfort.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clamshells",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/m_ZPapmqeNM",
        musclesWorked:
          "Targets the muscles of the hips and outer thighs (gluteus medius and minimus).",
        tips: "Lie on your side with your knees bent and feet together. Keeping your feet touching, lift your top knee as high as possible while maintaining control. Lower back down and repeat on the other side.",
        description:
          "Clamshells are a popular exercise for targeting the hip abductor muscles, strengthening the hips, improving stability, and preventing common lower body injuries.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cossack Squat",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/usfu415_0AI",
        musclesWorked:
          "Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and adductors.",
        tips: "Take a wide lateral stance with your toes pointing slightly outward. Lower your body to one side, keeping the other leg straight and the foot flat on the ground. Push through the heel to return to the starting position and repeat on the other side.",
        description:
          "The Cossack squat is a dynamic exercise that targets multiple muscles in the lower body, improving strength, flexibility, and mobility in the hips, thighs, and glutes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "World’s greatest stretch",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/o04xhq1b2bI",
        musclesWorked:
          "Engages the muscles of the hips, hamstrings, quadriceps, calves, and upper body.",
        tips: "Step forward with one foot into a lunge position. Reach one hand to the inside of the forward foot, rotate the torso, and extend the opposite arm overhead. Return to the starting position and repeat on the other side.",
        description:
          "The World’s Greatest Stretch is a compound exercise that combines elements of a lunge, twist, and stretch. It helps improve mobility, flexibility, and overall functional movement.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "90/90 Stretch",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/VYvMMw8z3rE",
        musclesWorked:
          "Stretches the muscles of the hips, including the glutes, hip flexors, and external rotators.",
        tips: "Sit on the ground with one leg bent in front of you at a 90-degree angle and the other leg bent behind you at a 90-degree angle. Lean forward from the hips to feel a stretch in the hip of the back leg. Repeat on the other side.",
        description:
          "The 90/90 stretch is an effective exercise for stretching the hip muscles, improving hip mobility, and reducing tightness or discomfort in the hips.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Frog Stretch",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/mO8S7qOdcdU",
        musclesWorked:
          "Targets the muscles of the hips, including the hip adductors (inner thigh muscles).",
        tips: "Assume a quadruped position with your knees spread apart and your feet touching each other. Sit back onto your heels and lean forward, feeling a stretch in the inner thighs. Keep your back straight and avoid rounding the spine.",
        description:
          "The frog stretch is a great exercise for targeting the inner thigh muscles, improving hip mobility, and increasing flexibility in the hips and groin area.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Asian Squat",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/Vhqwshad4FU",
        musclesWorked:
          "Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Assume a deep squat position with your feet flat on the ground, heels down, and knees tracking over your toes. Keep your torso upright and your hands together in front of your chest for balance.",
        description:
          "The Asian squat, also known as the deep squat or third world squat, is a natural resting position that can improve hip mobility, ankle flexibility, and overall lower body strength and stability.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bear Sit Hinge",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/Yu4Yq6sCMvc",
        musclesWorked:
          "Engages the muscles of the hips, hamstrings, and lower back.",
        tips: "Sit on the ground with your knees bent and feet flat on the floor. Place your hands behind you, fingers pointing toward your feet. Lift your hips off the ground and hinge back, feeling a stretch in the hips and hamstrings. Return to the starting position and repeat.",
        description:
          "The Bear Sit Hinge is an exercise that targets the muscles of the hips, hamstrings, and lower back. It helps improve hip mobility, strengthen the posterior chain, and enhance overall lower body flexibility and stability.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Butterfly Pose",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/MdE_Cj6ChLo",
        musclesWorked:
          "Stretches the muscles of the hips, including the groin and inner thighs.",
        tips: "Sit on the ground and bring the soles of your feet together, allowing your knees to drop out to the sides. Gently press down on your thighs to increase the stretch. Sit tall and avoid rounding your back.",
        description:
          "The Butterfly Pose, also known as the Bound Angle Pose or Cobbler’s Pose, is a seated posture that stretches the muscles of the hips, promotes hip flexibility, and helps alleviate tightness in the groin and inner thighs.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reclining Pigeon Pose",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/WDOBkhKEuu0",
        musclesWorked:
          "Stretches the muscles of the hips, particularly the glutes and hip external rotators.",
        tips: "Lie on your back and cross one ankle over the opposite knee. Grab the back of the supporting leg and gently pull it toward your chest, feeling a stretch in the hip and glute of the crossed leg. Repeat on the other side.",
        description:
          "Reclining Pigeon Pose, also known as Figure Four Stretch, is an effective exercise for stretching the muscles of the hips, enhancing hip mobility, and alleviating tightness or discomfort in the glutes and hip external rotators.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "External hip rotation",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/-pNMOAL6fro",
        musclesWorked:
          "Targets the muscles of the hips, specifically the hip external rotators.",
        tips: "Lie on your back with your knees bent and feet flat on the ground. Place a resistance band around your thighs just above your knees. Slowly rotate your knees outwards against the resistance of the band, then return to the starting position.",
        description:
          "External hip rotation exercise is used to target the muscles responsible for hip external rotation. It helps improve hip mobility, strengthen the hip external rotators, and promote better alignment and stability in the hip joint.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sit to stand",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/5yxfzyzEzBY",
        musclesWorked:
          "Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Start by sitting on a chair or bench. Place your feet shoulder-width apart and stand up by pushing through your heels and engaging your leg muscles. Reverse the movement to return to a seated position.",
        description:
          "Sit to stand exercise, also known as chair squats, is a functional movement that targets the muscles of the lower body. It helps improve leg strength, mobility, and the ability to perform daily activities that involve standing up from a seated position.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Single Leg Hip Rotations",
        injuryId: 4,
        videoLink: "https://www.youtube.com/embed/73XPwD9VHLk",
        musclesWorked:
          "Engages the muscles of the hips, including the hip internal and external rotators.",
        tips: "Stand with one foot slightly off the ground and the opposite leg firmly planted. Rotate the raised leg inward and then outward in a controlled manner, focusing on engaging the muscles of the hip. Repeat on the other leg.",
        description:
          "Single Leg Hip Rotations are an effective exercise for targeting the muscles of the hips, including the hip internal and external rotators. It helps improve hip mobility, stability, and the overall coordination of the lower body.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Flexion",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/t0b_fTFz4iY?si=jjl8TdvJwGfsxQwc",
        musclesWorked: "Sternocleidomastoid",
        tips: "Keep your back straight while performing the exercise.",
        description:
          "This exercise involves moving your chin towards your chest to work on the front of your neck.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Extension",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/ML9tj2g83Q8?si=CX1BV9TblkPHy1p0",
        musclesWorked: "Trapezius, Erector Spinae",
        tips: "Gently tilt your head backward without straining your neck.",
        description:
          "Tilt your head backward to stretch and strengthen the muscles at the back of your neck.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Lateral Flexion (Left)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KX2OpgLVvVk?si=voovKb2DpPluoHkf",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Keep your shoulders relaxed while tilting your head to the side.",
        description:
          "Tilt your head to the left to target the muscles on the left side of your neck.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Lateral Flexion (Right)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KX2OpgLVvVk?si=voovKb2DpPluoHkf",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Keep your shoulders relaxed while tilting your head to the side.",
        description:
          "Tilt your head to the right to target the muscles on the right side of your neck.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Rotation (Left)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/ZP76KJ5Uyi0?si=tdAytfqFsi9QWLrm",
        musclesWorked: "Sternocleidomastoid, Splenius",
        tips: "Rotate your head gently without forcing the movement.",
        description:
          "Turn your head to the left to engage the muscles responsible for neck rotation.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Rotation (Right)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/ZP76KJ5Uyi0?si=tdAytfqFsi9QWLrm",
        musclesWorked: "Sternocleidomastoid, Splenius",
        tips: "Rotate your head gently without forcing the movement.",
        description:
          "Turn your head to the right to engage the muscles responsible for neck rotation.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Isometrics (Front)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KbJ8_9GBers?si=3PXSt4Bur2_lGr_z",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Apply gentle resistance with your hand while pushing forward with your neck.",
        description:
          "Push your head forward against your hand to work on isometric strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Isometrics (Back)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KbJ8_9GBers?si=3PXSt4Bur2_lGr_z",
        musclesWorked: "Trapezius",
        tips: "Apply gentle resistance with your hand while pushing backward with your neck.",
        description:
          "Push your head backward against your hand to work on isometric strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Isometrics (Left)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KbJ8_9GBers?si=3PXSt4Bur2_lGr_z",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Apply gentle resistance with your hand while pushing leftward with your neck.",
        description:
          "Push your head to the left against your hand to work on isometric strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Isometrics (Right)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/KbJ8_9GBers?si=3PXSt4Bur2_lGr_z",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Apply gentle resistance with your hand while pushing rightward with your neck.",
        description:
          "Push your head to the right against your hand to work on isometric strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Shrugs",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/hfYeQk0EHVI?si=eOajJHPP5dRhsHhk",
        musclesWorked: "Trapezius",
        tips: "Lift your shoulders while keeping your neck relaxed.",
        description:
          "Elevate your shoulders as if you're shrugging to target the trapezius muscles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Tilts (Left)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/QatBdq1IMAw?si=nMZdXl112zZlJ7sY",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Tilt your head to the left side without lifting your shoulders.",
        description:
          "Tilt your head to the left to engage the neck's lateral muscles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Tilts (Right)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/QatBdq1IMAw?si=nMZdXl112zZlJ7sY",
        musclesWorked: "Sternocleidomastoid, Scalenes",
        tips: "Tilt your head to the right side without lifting your shoulders.",
        description:
          "Tilt your head to the right to engage the neck's lateral muscles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Circles (Clockwise)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/YTT0sgNU01I?si=pNh5gzmL1UkhU0uu",
        musclesWorked: "Sternocleidomastoid, Scalenes, Trapezius",
        tips: "Gently rotate your head in a clockwise circular motion.",
        description:
          "Perform circular motions with your head to work on neck flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Circles (Counterclockwise)",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/YTT0sgNU01I?si=pNh5gzmL1UkhU0uu",
        musclesWorked: "Sternocleidomastoid, Scalenes, Trapezius",
        tips: "Gently rotate your head in a counterclockwise circular motion.",
        description:
          "Perform circular motions with your head in the counterclockwise direction to improve neck flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Resistance Band Pulls",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/rUjyBFHn8SQ?si=AX7hnRR57WQHmRsr",
        musclesWorked: "Sternocleidomastoid, Scalenes, Trapezius",
        tips: "Secure a resistance band and pull it gently with your neck.",
        description:
          "Use a resistance band to strengthen the neck muscles by pulling against resistance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Retractions",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/VYcifC6BFgc?si=pKz8K6pw87CJF8ab",
        musclesWorked: "Sternocleidomastoid, Scalenes, Trapezius",
        tips: "Pull your head back gently without straining.",
        description:
          "Retract your head by pulling it backward to improve neck posture and strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neck Isometric Rotations",
        injuryId: 5,
        videoLink: "https://www.youtube.com/embed/E5ad2c2z_Bc?si=T0j-LrCzkA_utOOX",
        musclesWorked: "Sternocleidomastoid, Splenius",
        tips: "Apply resistance while turning your head left and right.",
        description:
          "Strengthen your neck by applying resistance while rotating your head left and right.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Flexion",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/ndDCV4Pi1lM?si=-cq8H4q4J_gK8WU-",
        musclesWorked: "Flexor Carpi Radialis, Flexor Carpi Ulnaris",
        tips: "Keep your forearm stable and bend your wrist downward.",
        description:
          "Flex your wrist by moving it downward toward the palm of your hand.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Extension",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/ndDCV4Pi1lM?si=-cq8H4q4J_gK8WU-",
        musclesWorked:
          "Extensor Carpi Radialis Longus, Extensor Carpi Radialis Brevis",
        tips: "Maintain a stable forearm and extend your wrist upward.",
        description:
          "Extend your wrist by moving it upward away from the palm.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Pronation",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/Y-2-lnALVZE?si=GObSqmVdl1G6omPB",
        musclesWorked: "Pronator Teres, Pronator Quadratus",
        tips: "Keep your elbow at a 90-degree angle and rotate your palm downward.",
        description: "Pronate your wrist by turning your palm downward.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Supination",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/Y-2-lnALVZE?si=GObSqmVdl1G6omPB",
        musclesWorked: "Supinator",
        tips: "Maintain a 90-degree elbow angle and rotate your palm upward.",
        description: "Supinate your wrist by turning your palm upward.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Circles (Clockwise)",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/wRSk1_C6yOM?si=-RDNb0Sk7mxZ2fka",
        musclesWorked: "Wrist Flexors and Extensors",
        tips: " Make circular motions with your wrist in a clockwise direction.",
        description:
          "Perform circular motions with your wrist in a clockwise direction to improve wrist flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Circles (Counterclockwise)",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/wRSk1_C6yOM?si=-RDNb0Sk7mxZ2fka",
        musclesWorked: "Wrist Flexors and Extensors",
        tips: "Make circular motions with your wrist in a counterclockwise direction.",
        description:
          "Perform circular motions with your wrist in a counterclockwise direction to enhance wrist flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Radial Deviation",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/pwodoGsoIpM?si=2dXWMQJjhnAuONKL",
        musclesWorked: "Extensor Carpi Radialis Longus, Flexor Carpi Radialis",
        tips: "Tilt your hand toward the thumb side.",
        description:
          "Perform radial deviation by bending your wrist toward the thumb side.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Ulnar Deviation",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/Qtv7XHinNjg?si=-0VGVHfDoNBAKnaX",
        musclesWorked: "Extensor Carpi Ulnaris, Flexor Carpi Ulnaris",
        tips: "Tilt your hand toward the pinky side.",
        description:
          "Execute ulnar deviation by bending your wrist toward the pinky side.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finger Extensions",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/K317o7xfizU?si=Pd5rePsE-kDkGEkj",
        musclesWorked: "Extensor Digitorum, Extensor Indicis",
        tips: "Extend your fingers as far as possible.",
        description:
          "Extend your fingers fully to strengthen the extensor muscles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finger Flexion",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/42AFFKEeNhE?si=ZvH8DDqgR-2SCu0B",
        musclesWorked:
          "Flexor Digitorum Superficialis, Flexor Digitorum Profundus",
        tips: "Bend your fingers at the knuckles.",
        description:
          "Perform finger flexion by bending your fingers at the knuckles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thumb Opposition",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/H5qap5Ktrlk?si=oxgW7h2zBwnEfdVf",
        musclesWorked: "Opponens Pollicis, Flexor Pollicis Brevis",
        tips: "Touch your thumb to each fingertip.",
        description:
          "Oppose your thumb by touching it to each fingertip, working on precision and strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grip Strengthening",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/1nE8XClDsPs?si=mkVVuIwJZk6lwm2o",
        musclesWorked: "Hand Flexors",
        tips: "Squeeze a stress ball or hand gripper with maximum force.",
        description:
          "Improve grip strength by squeezing a stress ball or hand gripper.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finger Abduction/Adduction",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/P4WPk5mUr8I?si=iO4EZuZpSVgWkrJD",
        musclesWorked: "Palmar Interossei, Dorsal Interossei",
        tips: "Spread your fingers apart and then bring them back together.",
        description:
          "Strengthen the finger abductors by spreading your fingers apart and then adductors by bringing them together.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wrist Tendon Gliding",
        injuryId: 6,
        videoLink: "https://www.youtube.com/embed/Glj2ozTzVe4?si=ODBk8R6mEmVCXFhZ",
        musclesWorked: "Various wrist flexors and extensors",
        tips: "Follow a sequence of wrist movements to enhance flexibility.",
        description:
          "Perform a series of wrist movements to promote tendon gliding and wrist health.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Dorsiflexion",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/LtzP-OEwlQA?si=S3gNriLnUb6RZkSg",
        musclesWorked: "Tibialis Anterior",
        tips: "Pull your toes toward your shin.",
        description:
          "Flex your ankle by pulling your toes upward toward your shin.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Plantarflexion",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/uuhqnQJ0zYY?si=tMdoiTB3v5OJFPl_",
        musclesWorked: "Gastrocnemius, Soleus",
        tips: "Push your toes downward.",
        description:
          "Extend your ankle by pushing your toes downward away from your shin.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Inversion",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/50YDq8_OA_w?si=c2l2xZHaIhFBnhtj",
        musclesWorked: "Tibialis Posterior",
        tips: "Turn your sole inward.",
        description: "Invert your ankle by turning your sole inward.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Eversion",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/4HuxLWQykxk?si=6nbxzo6biSGsZqFi",
        musclesWorked: "Peroneus Brevis, Peroneus Longus",
        tips: "Turn your sole outward.",
        description: "Evert your ankle by turning your sole outward.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Circles (Clockwise)",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/mzTQGYGI0Ng?si=k5Ey6fsCBaRgjjmF",
        musclesWorked: "Ankle Flexors and Extensors",
        tips: "Make circular motions with your ankle in a clockwise direction.",
        description:
          "Perform circular motions with your ankle in a clockwise direction to enhance ankle mobility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Circles (Counterclockwise)",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/mzTQGYGI0Ng?si=k5Ey6fsCBaRgjjmF",
        musclesWorked: "Ankle Flexors and Extensors",
        tips: "Make circular motions with your ankle in a counterclockwise direction.",
        description:
          "Execute circular motions with your ankle in a counterclockwise direction to improve ankle mobility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toe Tapping",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/DKgdkn-f-ck?si=ABozU0VfXVG2cnpP",
        musclesWorked: "Toe Flexors and Extensors",
        tips: "Tap your toes up and down.",
        description:
          "Tap your toes up and down to enhance toe strength and flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Towel Scrunch",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/1ogSryKJXB4?si=NUU7VEqcpvkxls0J",
        musclesWorked: "Toe Flexors",
        tips: "Place a towel on the floor and scrunch it with your toes.",
        description:
          "Improve toe strength by scrunching a towel with your toes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marble Pickup",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/5nNhDzH4pKY?si=MFQ1coMeVf3IqIzr",
        musclesWorked: "Toe Flexors",
        tips: "Place marbles on the floor and pick them up with your toes.",
        description:
          "Enhance toe dexterity and strength by picking up marbles with your toes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Calf Raises",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/CtyIVeJH6lI?si=gVh7ebKVkWjtabjZ",
        musclesWorked: "Gastrocnemius, Soleus",
        tips: "Rise onto your toes and lower back down.",
        description: "Strengthen your calf muscles by performing calf raises.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arch Strengthening",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/B4Ti5rLEwE4?si=mr263oEpRIgoWjfN",
        musclesWorked: "Plantar Fascia, Intrinsic Foot Muscles",
        tips: "Place a small ball or towel under your arch and press down.",
        description:
          "Strengthen your foot arch by pressing down on a ball or towel.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Big Toe Extension",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/9koRqQhN8QE?si=3jdtYE3pmcqwdSbH",
        musclesWorked: "Extensor Hallucis Longus",
        tips: "Extend your big toe upward.",
        description:
          "Focus on extending your big toe upward to enhance toe flexibility.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Alphabet",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/YTVZUMuEKPA?si=9AyRQKcAPw_CI9bc",
        musclesWorked: "Ankle Flexors and Extensors",
        tips: "Imagine the alphabet and trace the letters with your toes.",
        description:
          "Improve ankle mobility by tracing the alphabet with your toes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ankle Resistance Band Exercises",
        injuryId: 7,
        videoLink: "https://www.youtube.com/embed/CgnMoSHF0qE?si=0XbUxbm06lqL0k_j",
        musclesWorked: "Ankle Muscles",
        tips: "Use a resistance band to perform ankle flexion, extension, inversion, and eversion exercises.",
        description:
          "Strengthen your ankle muscles with resistance band exercises for improved stability and support.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crunches",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/okqQVQireEo?si=H6bpBDWy57bpCblX",
        musclesWorked: "Rectus Abdominis",
        tips: "Lie on your back, bend your knees, and lift your upper body off the floor.",
        description:
          "Perform crunches by lifting your upper body toward your knees, engaging your core muscles.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Planks",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/yeKv5oX_6GY?si=NjBENTmPnG3wnyKw",
        musclesWorked: "Rectus Abdominis, Transverse Abdominis",
        tips: "Hold a push-up position with your body in a straight line.",
        description:
          "Strengthen your core by holding a plank position, maintaining a straight line from head to heels.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Russian Twists",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/wkD8rjkodUI?si=o6twmmt1Fy9UxVFU",
        musclesWorked: "Obliques",
        tips: "Sit with your knees bent, lift your feet, and twist your torso side to side.",
        description:
          "Work your obliques by twisting your torso from side to side while holding your feet off the ground.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Raises",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/gobteD5GWkE?si=PTEVLr5KNSNb2yZp",
        musclesWorked: "Lower Abs",
        tips: "Lie on your back and raise your legs while keeping them straight.",
        description:
          "Target your lower abdominal muscles by lifting your legs off the ground.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mountain Climbers",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/cnyTQDSE884?si=0qFA1fkvF0ZgOaCH",
        musclesWorked: "Core, Upper Body",
        tips: "Start in a push-up position and bring your knees alternately toward your chest.",
        description:
          "Engage your core and improve cardiovascular fitness with mountain climbers.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bicycle Crunches",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/1we3bh9uhqY?si=WiI1dDhmsVqbHIeu",
        musclesWorked: "Obliques",
        tips: "Lie on your back, bring your opposite elbow and knee together while extending the other leg.",
        description:
          "Work your obliques by mimicking a pedaling motion with your legs and crunching to the opposite knee.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dead Bug",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/zechBkcIMf0?si=LmAiHRT8qRZ5Bl2X",
        musclesWorked: "Rectus Abdominis, Transverse Abdominis",
        tips: "Lie on your back, lift your legs, and reach your arms toward the ceiling.",
        description:
          "Strengthen your core while maintaining balance by extending your arms and legs.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hollow Body Hold",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/FYojATjHStg?si=N_d5dW-pzYvyUxxD",
        musclesWorked: "Rectus Abdominis, Transverse Abdominis",
        tips: "Lie on your back, lift your head and legs off the ground.",
        description:
          "Challenge your core muscles by holding a hollow body position with your body off the ground.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reverse Crunches",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/yH-oSzE5_g0?si=zCcO4WHoXilDS9gd",
        musclesWorked: "Lower Abs",
        tips: "Lie on your back, bend your knees, and lift your hips off the ground.",
        description:
          "Target your lower abdominal muscles by lifting your hips and legs off the ground.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Flutter Kicks",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/ANVdMDaYRts?si=An0UxfwbV0nvVKZ4",
        musclesWorked: "Lower Abs",
        tips: "Lie on your back, lift your legs, and flutter them up and down.",
        description:
          "Strengthen your lower abdominal muscles by performing flutter kicks.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Standing Cable Crunches",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/vFV78ASgsak?si=6JIFy-8E5EoNE6Zm",
        musclesWorked: "Rectus Abdominis",
        tips: "Use a cable machine to perform crunches while kneeling and pulling the rope attachment downward.",
        description:
          "Build stronger abs by using a cable machine to add resistance to your crunches.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Medicine Ball Russian Twists",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/2_MsoqTpIJ8?si=_30ZNobc94v7RI3C",
        musclesWorked: "Obliques",
        tips: "Sit with your knees bent, hold a medicine ball, and twist your torso side to side.",
        description: "Enhance your oblique strength with medicine ball twists.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hanging Leg Raises",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/Pr1ieGZ5atk?si=nh3dKDF_kfxdgnOs",
        musclesWorked: "Lower Abs",
        tips: "Hang from a bar and lift your legs, keeping them straight.",
        description:
          "Target your lower abdominal muscles with hanging leg raises.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sit-Up Twists",
        injuryId: 8,
        videoLink: "https://www.youtube.com/embed/_xzyH6NP_9k?si=Dqxh5_SFKdHAX72g",
        musclesWorked: "Obliques",
        tips: "Perform sit-ups while twisting your torso to one side at the top of the movement.",
        description:
          "Strengthen your obliques with sit-up twists that involve twisting your upper body as you sit up.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Squats",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/WbKT5b8ydmM",
        musclesWorked:
          "Targets the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.",
        tips: "Keep your feet shoulder-width apart, lower your hips back and down as if sitting into a chair, and maintain a neutral spine. Engage your core and push through your heels to rise back up.",
        description:
          "Squats are a fundamental compound exercise that targets multiple muscles in the lower body, promoting strength, stability, and functional movement.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lunges",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/yLeuSZkXwZo?si=5xUGBM4f0sf0T7pG",
        musclesWorked: "Glutes, Hamstrings",
        tips: "Step forward and lower your body until both knees are bent at a 90-degree angle.",
        description:
          "Lunges engage your glutes and hamstrings while improving leg strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Glute Bridge",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/OUgsJ8-Vi0E?si=UN-cgiqcuVZd4yuF",
        musclesWorked: "Glutes, Lower Back",
        tips: "Lie on your back, bend your knees, and lift your hips off the ground.",
        description:
          "Strengthen your glutes and lower back with glute bridge exercises.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Deadlifts",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/SHa6Xq9WG1g?si=BeL4tLe3LGxGw_Zy",
        musclesWorked: "Gluteus Maximus, Hamstrings",
        tips: "Bend at your hips and knees, lower your torso, and then stand back up.",
        description:
          "Deadlifts work the gluteus maximus and hamstrings while enhancing overall strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kickbacks",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/BNDw4ciQoQI?si=LJeXDpK9oTTpN2eM",
        musclesWorked: "Gluteus Maximus",
        tips: "Get on all fours and lift one leg straight back, squeezing your glutes.",
        description:
          "Kickbacks target the gluteus maximus, helping to shape and tone your rear.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Step-Ups",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/wfhXnLILqdk?si=Hqc6cC_dO5MdEWIg",
        musclesWorked: "Glutes, Quads",
        tips: "Step onto a raised platform and lift your body up with one leg.",
        description:
          "Step-ups engage your glutes and quadriceps, improving leg strength and stability.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fire Hydrants",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/QmUCDh9koJE?si=f2_SUcMQ3kCBt_cl",
        musclesWorked: "Glutes, Hip Abductors",
        tips: "Start on all fours and lift one leg out to the side while keeping the knee bent.",
        description:
          "Fire hydrants target the glutes and hip abductors, helping with hip stability.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sumo Squats",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/ccKjoHwvCI0?si=XcFNyRXUa71Y8V40",
        musclesWorked: "Glutes, Inner Thighs",
        tips: "Take a wide stance and lower your body, engaging the inner thighs and glutes.",
        description:
          "Sumo squats work the glutes and inner thighs, promoting lower-body strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bulgarian Split Squats",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/hPlKPjohFS0?si=fGph9nyCUygC8-2g",
        musclesWorked: "Glutes, Quads",
        tips: "Stand facing away from a bench, place one foot behind you, and lower your body.",
        description:
          "Bulgarian split squats challenge the glutes and quadriceps for improved leg strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Press",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/iqikp_LtbvA?si=ofGfj_JOupN5BYXX",
        musclesWorked: "Glutes, Quads",
        tips: "Use a leg press machine to push a weighted sled with your legs.",
        description:
          "Leg presses target the glutes and quadriceps for leg strength and hypertrophy.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clamshells",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/m_ZPapmqeNM",
        musclesWorked:
          "Targets the muscles of the hips and outer thighs (gluteus medius and minimus).",
        tips: "Lie on your side with your knees bent and feet together. Keeping your feet touching, lift your top knee as high as possible while maintaining control. Lower back down and repeat on the other side.",
        description:
          "Clamshells are a popular exercise for targeting the hip abductor muscles, strengthening the hips, improving stability, and preventing common lower body injuries.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Single-Leg Glute Bridge",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/_K_di6h2-Wg?si=YzbRSk0F5oRgWcuM",
        musclesWorked: "Glutes, Hamstrings",
        tips: "Lie on your back, lift one leg, and perform a glute bridge with a single leg.",
        description: "This exercise targets the glutes and hamstrings while improving balance.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Box Jumps",
        injuryId: 9,
        videoLink: "https://www.youtube.com/embed/w4_xPCRlq0k?si=2T3GoiPEmKDJD6md",
        musclesWorked: "Glutes, Quads",
        tips: "Jump onto a sturdy box or platform, landing with soft knees.",
        description: "Box jumps help build explosive strength in the glutes and quadriceps.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Exercises", null, {});
  },
};
