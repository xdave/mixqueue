import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { injectCSS } from '../../../../util/jss';
import { setPosFromX, secondsToTime2, qXFromPos, getTimeFromX } from "../../../../util/player";
import Controls from '../Controls';
import Track from './Track';

import { styles } from './styles';
import { Model } from './Model';
import { Controller } from './Controller';
import { ViewModel } from './ViewModel';

const C = connect(Model, Controller, ViewModel);

const View = C(({ classes, peaks, tracks, music, actions, mixId }) => {
    return (
        <div className={classes.peaksContainer}>
            <div className={classes.controlsContainer}>
                <div className={classes.controls}>
                    <Controls mixId={mixId} />
                </div>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row', height: '100%' }}>
                <div
                    key={`peaks-display-${peaks}`}
                    className={classNames(classes.peaks, 'peaks')}
                    style={{ backgroundImage: peaks ? `url("${peaks}")` : 'none' }}
                    onClick={setPosFromX(music.duration, actions.setTime)}
                    onMouseEnter={() => actions.setSelectingPos({ selectingPos: true })}
                    onMouseLeave={() => actions.setSelectingPos({ selectingPos: false })}
                    onMouseMove={e => {
                        const { left } = e.currentTarget.getBoundingClientRect()
                        actions.setPosSelectionX({ posSelectX: e.clientX - left });
                        const time = getTimeFromX(e, music.duration);
                        actions.setPosSelectionTime({ posSelectTime: time });
                    }}
                >
                    <div
                        className={classes.playbackPosition}
                        style={{
                            left: qXFromPos('.peaks', music.currentTime, music.duration)
                        }}
                    />

                    <div
                        className={classes.posSelector}
                        style={{
                            display: music.selectingPos
                                ? 'block'
                                : 'none',
                            left: `${music.posSelectX}px`,
                        }}
                    >
                        <div className={classes.posSelectTime}>
                            {secondsToTime2(music.posSelectTime)}
                        </div>
                    </div>

                    {tracks.map((track, index) => (
                        <Track key={index} track={track} />
                    ))}

                    <div className={classes.currentTime}>
                        {secondsToTime2(music.currentTime)}
                    </div>
                    <div className={classes.duration}>
                        {secondsToTime2(music.duration)}
                    </div>
                </div>
            </div>
        </div>
    )
});

export default injectCSS(styles)(View);
