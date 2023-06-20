'use client';
import { useRef } from 'react';
import useWavesurfer from '@/hooks/useWavesurfer';
import VolumeSlider from './VolumeSlider';
import { formatDuration } from '@/utils/app-helper';
import { useDispatch, useSelector } from 'react-redux';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdVolumeUp, MdVolumeMute } from 'react-icons/md';
import { playNextSong, playPreviousSong, selectCurrentSong } from '@/redux/features/songsSlice';

const Player = () => {
    const dispatch = useDispatch();
    const waveContainerRef = useRef(null);
    const { album, title, artist, preview: audioSrc, duration } = useSelector(selectCurrentSong);
    const { handlePlayPause, isPlaying, setAudioVolume, audioVolume } = useWavesurfer(waveContainerRef, audioSrc);
    const formattedDuration = formatDuration(duration);

    return (
        <>
            <div className={ audioSrc ? 'player' : 'player disable' }>
                <img src={ album?.cover_xl } alt='' />

                <div className='song-details'>
                    <span className='song-title overflowing-text'>{ title }</span>
                    <span className='artist-name'>{ artist?.name }</span>
                </div>

                <div className='control-buttons'>
                    <button onClick={ () => dispatch(playPreviousSong()) }>
                        <MdSkipPrevious />
                    </button>

                    <button
                        className='play-pause-btn'
                        onClick={ audioSrc && handlePlayPause }
                    >
                        { 
                            isPlaying ? 
                                <MdPause /> :
                                <MdPlayArrow /> 
                        }
                    </button>

                    <button onClick={ () => dispatch(playNextSong()) }>
                        <MdSkipNext />
                    </button>
                </div>

                <div className='wave-container' ref={ waveContainerRef }></div>

                <span className='duration'>{ formattedDuration }</span>

                <div className='volume-slider-container'>
                    <button onClick={ () => setAudioVolume((prev) => prev === 0 ? 1 : 0) }>
                        { audioVolume ? <MdVolumeUp /> : <MdVolumeMute /> }
                    </button>

                    {
                        audioSrc &&
                            <VolumeSlider
                                audioVolume={ audioVolume }
                                onChange={ (value) => setAudioVolume(value) }
                            />
                    }
                </div>
            </div>
        </>
    );
};

export default Player;
