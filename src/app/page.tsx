import Board from './components/chess/Board';
import JailZone from './components/chess/JailZone';
import Sidebar from './components/Sidebar';

export default function Page() {
  return (
    <div className='flex items-center justify-center h-screen gap-2'>
      <div className='flex items-center justify-center flex-col h-screen gap-2 p-4'>
        <Board />
      </div>

      <Sidebar />
    </div>
  );
}
