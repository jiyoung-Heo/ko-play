"use client";

import { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideo from './component/UserVideo';


const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export default function App() {
    const [mySessionId, setMySessionId] = useState('SessionABZC');
    const [myUserName, setMyUserName] = useState(`Participant${Math.floor(Math.random() * 100)}`);
    const [session, setSession] = useState(null);
    const [mainStreamManager, setMainStreamManager] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [subscriber, setSubscriber] = useState(null);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

    useEffect(() => {
        const handleBeforeUnload = () => {
            leaveSession();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [session]);

    useEffect(() => {
        joinSession();
    }, []);

    const joinSession = async () => {
        const OV = new OpenVidu();
        const mySession = OV.initSession();

        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscriber(subscriber);

            subscriber.on('videoElementCreated', (event) => {
                const videoElement = event.element;
            });
        });

        mySession.on('streamDestroyed', (event) => {
            setSubscriber(null);
        });

        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        const token = await getToken();
        mySession
            .connect(token, { clientData: myUserName })
            .then(async () => {
                const publisher = await OV.initPublisherAsync(undefined, {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: '640x480',
                    frameRate: 30,
                    insertMode: 'APPEND',
                    mirror: false,
                });

                publisher.on('videoElementCreated', function (event) {
                    const videoElement = event.element;
                    videoElement['muted'] = true;
                });

                mySession.publish(publisher);

                const devices = await OV.getDevices();
                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                const currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

                setSession(mySession);
                setMainStreamManager(publisher);
                setPublisher(publisher);
                setCurrentVideoDevice(currentVideoDevice);
            })
            .catch((error) => {
                console.error('Error connecting to the session:', error.code, error.message);
            });
    };

    const leaveSession = () => {
        if (session) {
            session.disconnect();
        }
        setSession(null);
        setSubscriber(null);
        setMySessionId('SessionABZC');
        setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
        setMainStreamManager(null);
        setPublisher(null);
    };

    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    };

    const createSession = async (sessionId) => {
        const response = await axios.post(
            `${APPLICATION_SERVER_URL}api/sessions`,
            { customSessionId: sessionId },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data; 
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(
            `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
            {},
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data;
    };


    return (
        <div className="container">
            {session && (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="Leave session"
                        />
                    </div>

                    <div id="video-container" className="col-md-6">
                        {publisher && (
                            <div
                                className="stream-container col-md-6 col-xs-6"
                                onClick={() => setMainStreamManager(publisher)}
                            >
                                <UserVideo streamManager={publisher} />
                            </div>
                        )}
                        {subscriber && (
                            <div
                                className="stream-container col-md-6 col-xs-6"
                                onClick={() => setMainStreamManager(subscriber)}
                            >
                                <UserVideo streamManager={subscriber} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
