'use strict';

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
    await queryInterface.bulkInsert('Exercises', [
      {
        name: 'External rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/_UvmPNGtlPM',
        tips: 'Start by holding a light dumbbell or resistance band in one hand with your elbow bent and your upper arm close to your body. Keeping your elbow stationary, rotate your forearm outward, away from your body, while maintaining control and a slow and controlled movement.',
        description:
          'Shoulder external rotation with a resistive band is a great way to help strengthen your shoulders after an injury or surgery. Hold a resistive band in front of you with your thumbs up. Bend your elbows to about a 90 degree angle, and keep your elbows by your side. Keeping your wrists in a neutral position, pull the band outwards while keeping your elbows by your side. Slowly come back in.',
        musclesWorked: 'Infraspinatus, teres minor, posterior deltoid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pendulum',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/L4QrSkoXpIw',
        tips: 'Do not round your back or lock your knees.',
        description:
          'Lean forward and place one hand on a counter or table for support. Let your other arm hang freely at your side. Gently swing your arm forward and back. Repeat the exercise moving your arm side-to-side, and repeat again in a circular motion. Repeat the entire sequence with the other arm.',
        musclesWorked: 'Deltoids, supraspinatus, infraspinatus, subscapularis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crossover Arm Stretch',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ATusl0jg4SU',
        tips: 'Do not pull or put pressure on your elbow.',
        description:
          'Relax your shoulders and gently pull one arm across your chest as far as possible, holding at your upper arm. Hold the stretch for 30 seconds and then relax for 30 seconds. Repeat with the other arm. You should feel this stretch at the back of your shoulder',
        musclesWorked: 'Posterior deltoid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Passive Internal Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/RNaMFoh1k64',
        tips: 'Do not lean over or twist to side while pulling the stick.',
        description:
          'Hold a stick behind your back with one hand, and lightly grasp the other end of the stick with your other hand.Pull the stick horizontally as shown so that your shoulder is passively stretched to the point of feeling a pull without pain.Hold for 30 seconds and then relax for 30 seconds.Repeat on the other side. You should feel this stretch at the front of your shoulder',
        musclesWorked: 'Supraspinatus',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Passive External Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ZbUoLkxYVMY',
        tips: 'Keep your hips facing forward and do not twist.',
        description:
          'Grasp the stick with one hand and cup the other end of the stick with the other hand. Keep the elbow of the shoulder you are stretching against the side of your body and push the stick horizontally, as shown, to the point of feeling a pull without pain. Hold for 30 seconds and then relax for 30 seconds. Repeat on the other side. You should feel this stretch in the back of your shoulder.',
        musclesWorked: 'Infraspinatus, teres minor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sleeper Stretch',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/OX6GtqNsHjE',
        tips: 'Do not bend your wrist or press down on your wrist.',
        description:
          'Lie on your side on a firm, flat surface with the affected shoulder under you and your arm bent, as shown. You can place your head on a pillow for comfort, if needed. Use your unaffected arm to push your other arm down. Stop pressing down when you feel a stretch in the back of your affected shoulder. Hold this position for 30 seconds, then relax your arm for 30 seconds. You should feel this stretch in your outer upper back, behind your shoulder',
        musclesWorked: 'Infraspinatus, teres minor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standing Row',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/a7hcEMgr198',
        tips: 'Squeeze your shoulder blades together as you pull.',
        description:
          'Make a 3-foot-long loop with the elastic band and tie the ends together. Attach the loop to a doorknob or other stable object.Stand holding the band with your elbow bent and at your side, as shown in the start position. Keep your arm close to your side and slowly pull your elbow straight back. Slowly return to the start position and repeat.',
        musclesWorked: 'Middle and lower trapezius',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Internal Rotation',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/QFnXM2ueUIE',
        tips: 'Keep your elbow pressed into your side.',
        description:
          'Make a 3-foot-long loop with the elastic band and tie the ends together. Attach the loop to a doorknob or other stable object.Stand holding the band with your elbow bent and at your side, as shown in the start position. Keep your elbow close to your side and bring your arm across your body. Slowly return to the start position and repeat.',
        musclesWorked: 'Pectoralis, subscapularis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scapula Setting',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/WklUZWulQao',
        tips: 'Do not tense up in your neck.',
        description:
          'Keeping your feet on the floor, and your hands gripped to the side of the chair (with the arms straight), pull up against the bottom of the chair (i.e. upwards). You should feel a muscular contraction at the bottom of your shoulder blades. Lie on your stomach with your arms by your sides. Place a pillow under your forehead for comfort, if required. Gently draw your shoulder blades together and down your back as far as possible. Ease about halfway off from this position and hold for 10 seconds. Relax and repeat 10 times.',
        musclesWorked: 'Middle trapezius, serratus',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Scapular Retraction/Protraction',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/gdiZFeaOQk0',
        tips: 'Do not shrug your shoulder toward your ear.',
        description:
          'Access more range of motion and control of your scapula through this protraction and retraction  to separate your scapula from your ribcage and spine.',
        musclesWorked: 'Middle trapezius, serratus',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bent-Over Horizontal Abduction',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/ncQ5kMwV7nY',
        tips: 'Control the movement as you lower the weight.',
        description:
          'Begin bent over so your torso is about parallel to the floor. Palm should face forward and thumb will point upward. Raise the arm out to a “T” thinking about squeezing shoulder blade back. Be sure to keep shoulders square to the floor and only lift to the height of the torso, no further. Modify based on provider’s recommendations.',
        musclesWorked:
          'Middle and lower trapezius, Infraspinatus, teres minor, posterior deltoid',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lateral Raises',
        injuryId: 1,
        videoLink: 'https://www.youtube.com/embed/wZnsZsMywrY',
        tips: 'Focus on maintaining proper form throughout the movement. Avoid using momentum or swinging the weights, and instead, lift the weights in a controlled manner, emphasizing the contraction in the lateral deltoids',
        description:
          'Lateral raises, also known as lateral deltoid raises or side raises, are a shoulder exercise that primarily targets the lateral deltoid muscle, located on the outer side of the shoulder. The exercise involves lifting the arms out to the sides while keeping them straight or slightly bent at the elbows.',
        musclesWorked: 'deltoids',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bird Dog',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/b6zcIxFkuN4',
        tips: 'Maintain a neutral spine throughout the movement and avoid arching or rounding your back. Focus on stability and control.',
        description:
          'The bird dog exercise is a core-strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable and neutral spine position. It resembles the posture of a bird dog pointing its prey.',
        musclesWorked: 'transverse abdominis, erector spinae, glutes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bridge',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/I6vxggX_1KM',
        musclesWorked:
          'Targets the glutes (especially the gluteus maximus), hamstrings, and core muscles.',
        tips: 'Lie on your back with your knees bent and feet flat on the ground. Lift your hips off the ground, pushing through your heels and engaging your glutes and hamstrings. Hold the position for a few seconds, then lower your hips back down. Repeat for the desired number of repetitions.',
        description:
          'The Bridge exercise is a classic bodyweight exercise that targets the glutes (especially the gluteus maximus), hamstrings, and core muscles. It helps strengthen and tone the posterior chain, improve hip stability, and enhance overall lower body strength. The exercise can be modified or progressed by adding resistance or performing single-leg variations.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pelvic Tilts',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/xOdfBCql6rw',
        musclesWorked:
          'Engages the deep core muscles, including the transverse abdominis and pelvic floor muscles.',
        tips: 'Focus on initiating the movement from the lower abdomen while keeping the rest of your body relaxed. Avoid excessive arching or rounding of the spine.',
        description:
          'Pelvic tilts are a foundational core exercise that helps improve pelvic stability, strengthen the deep abdominal muscles, and promote proper alignment of the spine and pelvis.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Side-to-Side',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/-7XWweC0ivs',
        musclesWorked:
          'Targets the obliques (side abdominal muscles) and engages the deep core muscles.',
        tips: 'Maintain a stable and engaged core throughout the movement. Control the side-to-side motion and avoid excessive twisting or leaning.',
        description:
          'The side-to-side exercise targets the oblique muscles, promoting lateral core strength and stability, which is beneficial for activities that involve twisting or bending sideways.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamstring Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/C-wiOqYcxoI',
        musclesWorked:
          'Stretches the hamstrings (muscles at the back of the thigh).',
        tips: 'Keep your back straight and avoid rounding your spine. Gently lean forward until you feel a stretch in the back of your thigh.',
        description:
          'The hamstring stretch helps improve hamstring flexibility and is beneficial for activities that require bending or extending the knees.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Piriformis Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/iL19XaxMmP4',
        musclesWorked:
          'Stretches the piriformis muscle located deep in the buttocks.',
        tips: 'Keep your back straight and avoid excessive twisting of the spine. Gradually increase the stretch without causing pain or discomfort.',
        description:
          'The piriformis stretch targets the piriformis muscle, which can become tight and contribute to buttock and sciatic nerve pain. Stretching this muscle can help alleviate tension and improve hip flexibility.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '1/2 Kneeling Hip Flexor Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/Q4Ko275cluo',
        musclesWorked:
          'Stretches the hip flexor muscles, including the iliopsoas and rectus femoris.',
        tips: 'Maintain an upright posture and avoid arching your lower back. Engage your glutes to deepen the stretch.',
        description:
          'The 1/2 kneeling hip flexor stretch targets the muscles at the front of the hip, helping to improve hip flexibility and alleviate tightness caused by prolonged sitting or activities that involve repetitive hip flexion.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Knee to Chest',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/8kzfXDNq_P8',
        musclesWorked: 'Stretches the glutes and lower back muscles.',
        tips: 'Pull your knee gently toward your chest and hold the stretch without bouncing. Keep your opposite leg relaxed and your back flat on the ground.',
        description:
          'The knee to chest stretch helps release tension in the glutes and lower back, promoting flexibility and relieving discomfort.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Knee Rotation',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/ENIEUp78CqY',
        musclesWorked: 'Engages the hip and glute muscles.',
        tips: 'Perform the movement in a slow and controlled manner. Avoid excessive pressure or strain on the knee joint.',
        description:
          'The knee rotation exercise targets the hip and glute muscles, promoting mobility and stability in the hip joint.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cobra Stretch',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/JDcdhTuycOI',
        musclesWorked:
          'Stretches the muscles of the lower back, chest, and shoulders.',
        tips: 'Extend your arms fully, lift your chest off the ground, and elongate your spine. Avoid straining your neck by keeping it aligned with your spine.',
        description:
          'The cobra stretch is a gentle backbend that helps alleviate tension in the lower back, stretch the chest and shoulders, and improve overall spinal flexibility.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cat/Cow',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/u5TglXNBrtE',
        musclesWorked:
          'Engages the muscles of the spine, including the back extensors and abdominal muscles.',
        tips: 'Move between cat and cow positions smoothly, coordinating your breath with the movement. Focus on creating a fluid motion in your spine.',
        description:
          'The cat/cow exercise is a gentle spinal mobilization exercise that promotes flexibility, relieves back tension, and enhances core stability.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Child’s Pose',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/2vJKSlfLX10',
        musclesWorked: 'Stretches the muscles of the back, hips, and thighs.',
        tips: 'Sink your hips back toward your heels, reach your arms forward, and relax your forehead on the ground. Breathe deeply and allow your body to relax into the pose.',
        description:
          "Child's pose is a restorative yoga position that stretches the back, hips, and thighs, promoting relaxation and releasing tension in the body.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Foam rolling',
        injuryId: 2,
        videoLink: 'https://www.youtube.com/embed/aQ565ee0DrE',
        musclesWorked:
          'Targets tight or knotted muscles and fascia, aiding in muscle recovery and mobility.',
        tips: 'Roll slowly over the target area, pausing on any tender spots or areas of tightness. Use your body weight to adjust the pressure and intensity.',
        description:
          'Foam rolling, also known as self-myofascial release, involves using a foam roller to apply pressure to tight or sore muscles, promoting muscle relaxation, increasing blood flow, and improving mobility.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Straight Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/drEiYK2li9Q',
        musclesWorked:
          'Targets the muscles of the thighs, particularly the quadriceps.',
        tips: 'Keep your leg straight and engage your core to stabilize your body. Avoid swinging or using momentum to lift your leg.',
        description:
          'Straight leg raises are an effective exercise for strengthening the quadriceps muscles, improving leg stability, and enhancing overall lower body strength.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quad Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/l83s6t8VWsE',
        musclesWorked:
          'Stretches the muscles at the front of the thigh (quadriceps).',
        tips: 'Hold onto a stable support for balance, and gently pull your heel toward your glutes to increase the stretch. Keep your knees close together and avoid excessive arching of the lower back.',
        description:
          'The quad stretch targets the muscles at the front of the thigh, helping to improve flexibility, reduce muscle tightness, and alleviate knee and hip discomfort.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamstring Curls',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/oWu8RxtWdGE',
        musclesWorked:
          'Engages the hamstring muscles at the back of the thigh.',
        tips: 'Maintain proper form throughout the movement, focusing on the mind-muscle connection with your hamstrings. Avoid using momentum or swinging your legs.',
        description:
          'Hamstring curls are an effective exercise for strengthening the hamstrings, improving leg stability, and enhancing overall lower body strength.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Squats',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/WbKT5b8ydmM',
        musclesWorked:
          'Targets the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Keep your feet shoulder-width apart, lower your hips back and down as if sitting into a chair, and maintain a neutral spine. Engage your core and push through your heels to rise back up.',
        description:
          'Squats are a fundamental compound exercise that targets multipsle muscles in the lower body, promoting strength, stability, and functional movement.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Prone Straight Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/7WkAPLOaxmk',
        musclesWorked:
          'Engages the muscles of the glutes, hamstrings, and lower back.',
        tips: 'Keep your core engaged and maintain control throughout the movement. Avoid lifting your legs too high or arching your lower back excessively.',
        description:
          'Prone straight leg raises are an effective exercise for targeting the glutes, hamstrings, and lower back muscles, promoting strength, stability, and improved posture.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Wall Squats',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/aKBxiKs9n8A',
        musclesWorked:
          'Targets the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Lean against the wall with your feet hip-width apart and slowly slide down the wall, keeping your knees aligned with your ankles. Hold the position for the desired duration and then push through your heels to rise back up.',
        description:
          'Wall squats are a variation of squats that provide support and stability, targeting the muscles of the lower body and promoting leg strength, stability, and endurance.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Calf Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/C7qnbmpLNGI',
        musclesWorked:
          'Targets the muscles of the calves (gastrocnemius and soleus).',
        tips: 'Push through the balls of your feet and rise onto your toes, lifting your heels as high as possible. Pause briefly at the top and then lower your heels back down.',
        description:
          'Calf raises are an effective exercise for strengthening the calf muscles, improving ankle stability, and enhancing lower leg strength and power.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Step-Ups',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/ACY7U8fOEdU',
        musclesWorked:
          'Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Step onto a stable elevated surface, leading with one foot at a time. Focus on maintaining proper form and control throughout the movement. Avoid pushing off with your back foot.',
        description:
          'Step-ups are a compound exercise that targets the muscles of the lower body, helping to improve strength, power, and stability in the legs and hips.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Side Leg Raises',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/izV5th7AQHM',
        musclesWorked:
          'Targets the muscles of the hips and outer thighs (abductors).',
        tips: 'Keep your core engaged and maintain proper alignment throughout the movement. Avoid leaning or tilting your upper body excessively.',
        description:
          'Side leg raises are a great exercise for targeting the hip abductor muscles, improving hip stability, and enhancing overall lower body strength and balance.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Leg Presses',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/8nQteJqlBF8',
        musclesWorked:
          'Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Adjust the seat and foot placement to ensure proper form and alignment. Keep your back pressed against the pad and push through your heels while maintaining control.',
        description:
          'Leg presses are a popular machine exercise that targets multipsle muscles in the lower body, providing an effective way to build strength, power, and muscular endurance.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heel Cord Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/6P_r7NIjj_o',
        musclesWorked:
          'Stretches the muscles of the calf (gastrocnemius and soleus).',
        tips: 'Stand with one foot forward and one foot back, keeping both heels flat on the ground. Lean forward, bending the front knee, and feel the stretch in the back calf. Hold for the desired duration and then switch legs.',
        description:
          'The heel cord stretch is a simple and effective exercise for stretching the calf muscles, promoting flexibility, reducing muscle tightness, and improving ankle mobility.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standing Quadriceps Stretch',
        injuryId: 3,
        videoLink: 'https://www.youtube.com/embed/pAm21cf6OLI',
        musclesWorked:
          'Stretches the muscles at the front of the thigh (quadriceps).',
        tips: 'Hold onto a stable support for balance, grab your ankle or foot, and gently pull your heel toward your glutes. Keep your knees close together and maintain an upright posture.',
        description:
          'The standing quadriceps stretch targets the muscles at the front of the thigh, helping to improve flexibility, reduce muscle tightness, and alleviate knee discomfort.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clamshells',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/m_ZPapmqeNM',
        musclesWorked:
          'Targets the muscles of the hips and outer thighs (gluteus medius and minimus).',
        tips: 'Lie on your side with your knees bent and feet together. Keeping your feet touching, lift your top knee as high as possible while maintaining control. Lower back down and repeat on the other side.',
        description:
          'Clamshells are a popular exercise for targeting the hip abductor muscles, strengthening the hips, improving stability, and preventing common lower body injuries.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cossack Squat',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/usfu415_0AI',
        musclesWorked:
          'Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and adductors.',
        tips: 'Take a wide lateral stance with your toes pointing slightly outward. Lower your body to one side, keeping the other leg straight and the foot flat on the ground. Push through the heel to return to the starting position and repeat on the other side.',
        description:
          'The Cossack squat is a dynamic exercise that targets multipsle muscles in the lower body, improving strength, flexibility, and mobility in the hips, thighs, and glutes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'World’s greatest stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/o04xhq1b2bI',
        musclesWorked:
          'Engages the muscles of the hips, hamstrings, quadriceps, calves, and upper body.',
        tips: 'Step forward with one foot into a lunge position. Reach one hand to the inside of the forward foot, rotate the torso, and extend the opposite arm overhead. Return to the starting position and repeat on the other side.',
        description:
          'The World’s Greatest Stretch is a compound exercise that combines elements of a lunge, twist, and stretch. It helps improve mobility, flexibility, and overall functional movement.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '90/90 Stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/VYvMMw8z3rE',
        musclesWorked:
          'Stretches the muscles of the hips, including the glutes, hip flexors, and external rotators.',
        tips: 'Sit on the ground with one leg bent in front of you at a 90-degree angle and the other leg bent behind you at a 90-degree angle. Lean forward from the hips to feel a stretch in the hip of the back leg. Repeat on the other side.',
        description:
          'The 90/90 stretch is an effective exercise for stretching the hip muscles, improving hip mobility, and reducing tightness or discomfort in the hips.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frog Stretch',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/mO8S7qOdcdU',
        musclesWorked:
          'Targets the muscles of the hips, including the hip adductors (inner thigh muscles).',
        tips: 'Assume a quadruped position with your knees spread apart and your feet touching each other. Sit back onto your heels and lean forward, feeling a stretch in the inner thighs. Keep your back straight and avoid rounding the spine.',
        description:
          'The frog stretch is a great exercise for targeting the inner thigh muscles, improving hip mobility, and increasing flexibility in the hips and groin area.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Asian Squat',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/Vhqwshad4FU',
        musclesWorked:
          'Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Assume a deep squat position with your feet flat on the ground, heels down, and knees tracking over your toes. Keep your torso upright and your hands together in front of your chest for balance.',
        description:
          'The Asian squat, also known as the deep squat or third world squat, is a natural resting position that can improve hip mobility, ankle flexibility, and overall lower body strength and stability.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bear Sit Hinge',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/Yu4Yq6sCMvc',
        musclesWorked:
          'Engages the muscles of the hips, hamstrings, and lower back.',
        tips: 'Sit on the ground with your knees bent and feet flat on the floor. Place your hands behind you, fingers pointing toward your feet. Lift your hips off the ground and hinge back, feeling a stretch in the hips and hamstrings. Return to the starting position and repeat.',
        description:
          'The Bear Sit Hinge is an exercise that targets the muscles of the hips, hamstrings, and lower back. It helps improve hip mobility, strengthen the posterior chain, and enhance overall lower body flexibility and stability.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Butterfly Pose',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/MdE_Cj6ChLo',
        musclesWorked:
          'Stretches the muscles of the hips, including the groin and inner thighs.',
        tips: 'Sit on the ground and bring the soles of your feet together, allowing your knees to drop out to the sides. Gently press down on your thighs to increase the stretch. Sit tall and avoid rounding your back.',
        description:
          'The Butterfly Pose, also known as the Bound Angle Pose or Cobbler’s Pose, is a seated posture that stretches the muscles of the hips, promotes hip flexibility, and helps alleviate tightness in the groin and inner thighs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reclining Pigeon Pose',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/WDOBkhKEuu0',
        musclesWorked:
          'Stretches the muscles of the hips, particularly the glutes and hip external rotators.',
        tips: 'Lie on your back and cross one ankle over the opposite knee. Grab the back of the supporting leg and gently pull it toward your chest, feeling a stretch in the hip and glute of the crossed leg. Repeat on the other side.',
        description:
          'Reclining Pigeon Pose, also known as Figure Four Stretch, is an effective exercise for stretching the muscles of the hips, enhancing hip mobility, and alleviating tightness or discomfort in the glutes and hip external rotators.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'External hip rotation',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/-pNMOAL6fro',
        musclesWorked:
          'Targets the muscles of the hips, specifically the hip external rotators.',
        tips: 'Lie on your back with your knees bent and feet flat on the ground. Place a resistance band around your thighs just above your knees. Slowly rotate your knees outwards against the resistance of the band, then return to the starting position.',
        description:
          'External hip rotation exercise is used to target the muscles responsible for hip external rotation. It helps improve hip mobility, strengthen the hip external rotators, and promote better alignment and stability in the hip joint.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sit to stand',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/5yxfzyzEzBY',
        musclesWorked:
          'Engages the muscles of the lower body, including the quadriceps, hamstrings, glutes, and calves.',
        tips: 'Start by sitting on a chair or bench. Place your feet shoulder-width apart and stand up by pushing through your heels and engaging your leg muscles. Reverse the movement to return to a seated position.',
        description:
          'Sit to stand exercise, also known as chair squats, is a functional movement that targets the muscles of the lower body. It helps improve leg strength, mobility, and the ability to perform daily activities that involve standing up from a seated position.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Single Leg Hip Rotations',
        injuryId: 4,
        videoLink: 'https://www.youtube.com/embed/73XPwD9VHLk',
        musclesWorked:
          'Engages the muscles of the hips, including the hip internal and external rotators.',
        tips: 'Stand with one foot slightly off the ground and the opposite leg firmly planted. Rotate the raised leg inward and then outward in a controlled manner, focusing on engaging the muscles of the hip. Repeat on the other leg.',
        description:
          'Single Leg Hip Rotations are an effective exercise for targeting the muscles of the hips, including the hip internal and external rotators. It helps improve hip mobility, stability, and the overall coordination of the lower body.',
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
    await queryInterface.bulkDelete('Exercises', null, {});
  },
};
