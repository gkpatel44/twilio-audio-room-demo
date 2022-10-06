import { useHMSStore, selectIsConnectedToRoom, useHMSActions, selectIsLocalAudioEnabled, selectPeers } from '@100mslive/hms-video-react';
import { useEffect } from 'react';
import getToken from './utils/getToken';
import AudioButton from './components/Buttons/AudioButton';
import LeaveButton from './components/Buttons/LeaveButton';
import UserCount from './components/Buttons/UserCount';

const Home = () => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
    const peers = useHMSStore(selectPeers);

    useEffect(() => {
        joinRoom()
    }, [])

    const joinRoom = () => {
        getToken('speaker')
            .then((token) => {
                hmsActions.join({
                    userName: 'Anonymous',
                    authToken: token,
                    settings: {
                        isAudioMuted: true,
                    },
                    initEndpoint: process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined
                });
            })
            .catch((error) => {
                console.log('Token API Error', error);
            });
    };
    return (
        <>
            {
                isConnected &&
                <div className='flex flex-col pt-4'>
                    <footer className='flex h-20 bg-gray-100 fixed bottom-0 space-x-4 left-0 w-full items-center justify-center'>
                        <UserCount count={peers.length} />
                        <AudioButton
                            active={isLocalAudioEnabled}
                            onClick={() => {
                                hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
                            }}
                        />
                        <LeaveButton
                            onClick={() => {
                                hmsActions.leave();
                            }}
                        />
                    </footer>
                </div>
            }
        </>
    );
};

export default Home;