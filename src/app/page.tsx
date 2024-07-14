import Header from '@/app/components/Header';
import Image from 'next/image';
import NewTaskButton from './components/NewTaskButton';
import Body from './components/Body';

export default function Home() {
  return (
    <div className="container mx-auto prose">
      <Header />
      <Body />
    </div>
  );
}
