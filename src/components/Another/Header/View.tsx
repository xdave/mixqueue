import * as React from 'react';
import { connect } from '../../../util/jss';
import { Stylesheet } from './Stylesheet';
import { ViewModel } from './ViewModel';
import { Controller } from './Controller'
import MixSelector from './MixSelector';
import Link from '../../util/Link'
import SvgIcon from '../../util/SvgIcon';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Icon from 'material-ui/Icon';
const LibraryMusic = require('material-ui-icons/LibraryMusic').default;
const Grid = require('material-ui/Grid').default;
const Typography = require('material-ui/Typography').default;
const Hidden = require('material-ui/Hidden').default;

const archive = require('../../../icons/archive.svg');
const mixcloud = require('../../../icons/mixcloud.svg');
const soundcloud = require('../../../icons/soundcloud.svg');
const preact = require('../../../icons/preact.svg');
const github = require('../../../icons/github.svg');

export const C = connect(Stylesheet, ViewModel, Controller);

export const View = C(({ classes, control, actions }) => (
    <AppBar className={classes.appBar}>
        <Toolbar>
            <Grid container className={classes.gridContainer}>
                <Grid item onClick={async () => {
                    if (control) {
                        const audioControl = control();
                        if (audioControl) {
                            await actions.audio.setPlaying(false);
                            audioControl.audio.element.src = ''
                            actions.audio.setDuration(0);
                        }
                    }
                }}>
                    <Link to={`/`}>
                        <Icon><LibraryMusic /></Icon>
                    </Link>
                </Grid>
                <Hidden only={['xs']}>
                    <Grid item>
                        <Typography type="title" colorInherit>
                            MixQueue
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item>
                    <MixSelector />
                </Grid>
                <Hidden only={['xs', 'sm']}>
                    <Grid item style={{ marginLeft: 'auto' }}>
                        <Grid container>
                            <Grid item>
                                <a href="https://archive.org/details/@xdavehome" target="_blank">
                                    <SvgIcon
                                        src={archive}
                                        title="Files hosted at the Internet Archive"
                                        alt="archive.org"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://www.mixcloud.com/xdavehome/" target="_blank">
                                    <SvgIcon
                                        src={mixcloud}
                                        title="More on Mixcloud!"
                                        alt="Mixcloud"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://soundcloud.com/dave-439736476" target="_blank">
                                    <SvgIcon
                                        src={soundcloud}
                                        title="Check out my SoundCloud!"
                                        alt="SoundCloud"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://preactjs.com/" target="_blank">
                                    <SvgIcon
                                        src={preact}
                                        title="Powered by Preact"
                                        alt="Preact"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://github.com/xdave/mixqueue" target="_blank">
                                    <SvgIcon
                                        src={github}
                                        title="Star on GitHub!"
                                        alt="GitHub"
                                    />
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Toolbar>
    </AppBar>
));
