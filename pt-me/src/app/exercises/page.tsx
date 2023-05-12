import Exercises from '@/components/Exercises';

export default function page() {
  return (
    <div className='flex justify-center'>
      <div
        id='exercise-container'
        className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl mt-[10rem] md:absolute md:object-right'
      >
        <Exercises />
      </div>
    </div>
  );
}
