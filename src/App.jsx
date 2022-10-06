import { HMSRoomProvider } from '@100mslive/hms-video-react';
import './App.css';
import Home from './Home';

function App() {
  return (
    <HMSRoomProvider>
      <div className='page'>
        <Home />
      </div>
    </HMSRoomProvider>
  );
}

export default App;