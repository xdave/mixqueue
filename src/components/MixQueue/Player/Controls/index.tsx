import * as React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
const PlayArrow = require('material-ui-icons/PlayArrow').default;
const Pause = require('material-ui-icons/Pause').default;

import { Model } from './Model';
import { Controller } from './Controller';
import { ViewModel } from './ViewModel';

const C = connect(Model, Controller, ViewModel);

export default C(({ playing, className, mix, play, pause }) => (
    <div className={className}>
        <IconButton>
            {playing
                ? <Pause onClick={pause} />
                : <PlayArrow onClick={play(mix)} />
            }
        </IconButton>
    </div>
));
