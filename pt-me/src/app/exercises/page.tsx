import Exercises from '@/components/Exercises';

export default function page() {
  return (
    <div
      id='exercise-container'
      className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl mt-[10rem] absolute object-right'
    >
      <Exercises />
    </div>
  );
}
