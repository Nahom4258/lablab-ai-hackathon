import { useEffect, useState } from 'react';
import { DailyAudio, useParticipantIds, useLocalSessionId } from '@daily-co/daily-react';
import { cn } from '../../lib/utils';
import { Video } from '../Video';

export const Call = () => {
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const localSessionId = useLocalSessionId();
  const [mode] = useState<'full' | 'minimal'>('full');
  const [currentTimer, setCurrentTimer] = useState(0); // New state for the timer

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimer(prev => prev + 1); // Update timer every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);



  const formatTime = (time : any) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`
  }

  return <div className='flex flex-col justify-center items-center'>
    <div className={cn("flex items-center justify-center", {
      'fixed bottom-20 right-20': mode === 'minimal',
    })}>
      <div className='relative'>
        {/* <Button variant='outline' onClick={handleToggleMode} className='absolute top-2 right-2 z-10 gap-2' size='sm'>
          {mode === 'full' ? 'Minimize' : 'Maximize'}
          {mode === 'full' ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
        </Button> */}
        {
          remoteParticipantIds.length > 0 ?
          <Video
          id={remoteParticipantIds[0]}
          className={
            cn({
              'max-h-[50vh] min-h-[20rem]': mode === 'full',
              'max-h-[15rem]': mode === 'minimal',
            })
          }
          /> :
          <div className='relative flex items-center justify-center size-[50vh]'>
              <p className='text-2xl text-black'>Waiting for Emma to join...</p>
            </div>
        }
        {localSessionId && (
          <Video
          id={localSessionId}
          className={cn('absolute bottom-2 right-2', {
            'lg:max-h-32 max-h-20': mode === 'full',
            // 'max-h-20': mode === 'minimal',
          })}
          />
        )}
      </div>
    </div>
    <DailyAudio />
    <p className='z-50 text-xl mt-1 justify-center items-center text-black'>{formatTime(currentTimer)}</p>
  </div>
}