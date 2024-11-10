import { Video } from 'lucide-react';
import { Button } from '../ui/button';

export const WelcomeScreen = ({ onStart, loading }: { onStart: () => void, loading: boolean }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 p-10'>
      <h1 className='text-4xl'>
        Welcome to AvatarX, Let's talk to Emma - a Therapist!
      </h1>
      <Button onClick={onStart}><Video className='size-6 mr-2' />{loading ? 'Loading...' : 'Talk to Emma'}</Button>
    </div>
  );
};
