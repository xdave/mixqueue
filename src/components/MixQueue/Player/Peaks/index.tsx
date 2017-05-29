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

const View = C(({ classes, peaks, tracks, audio, actions }) => {
    return (
        <div className={classes.peaksContainer}>
            <div className={classes.controlsContainer}>
                <div className={classes.controls}>
                    {/*<div>&nbsp;</div>*/}
                    <Controls />
                    {/*<div>&nbsp;</div>*/}
                </div>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row', height: '100%' }}>
                <div
                    key={`peaks-display-${peaks}`}
                    className={classNames(classes.peaks, 'peaks')}
                    style={{ backgroundImage: peaks ? `url("${peaks}")` : 'none' }}
                    onClick={setPosFromX(audio.duration, actions.setCurrentTime)}
                    onMouseEnter={() => actions.setSelectingPos(true)}
                    onMouseLeave={() => actions.setSelectingPos(false)}
                    onMouseMove={e => {
                        const { left } = e.currentTarget.getBoundingClientRect()
                        actions.setPosSelectionX(e.clientX - left);
                        const time = getTimeFromX(e, audio.duration);
                        actions.setPosSelectionTime(time);
                    }}
                >
                    <div
                        className={classes.playbackPosition}
                        style={{
                            left: qXFromPos('.peaks', audio.currentTime, audio.duration)
                        }}
                    />

                    <div
                        className={classes.posSelector}
                        style={{
                            display: audio.selectingPos
                                ? 'block'
                                : 'none',
                            left: `${audio.posSelectX}px`,
                        }}
                    >
                        <div className={classes.posSelectTime}>
                            {secondsToTime2(audio.posSelectTime)}
                        </div>
                    </div>

                    {tracks.map((track, index) => (
                        <Track key={index} track={track} />
                    ))}

                    <div className={classes.currentTime}>
                        {secondsToTime2(audio.currentTime)}
                    </div>
                    <div className={classes.duration}>
                        {secondsToTime2(audio.duration)}
                    </div>
                </div>
            </div>
        </div>
    )
});

export default injectCSS(styles)(View);
