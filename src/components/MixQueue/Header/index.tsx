import * as React from 'react';
import { connect } from 'react-redux';
import { injectCSS } from '../../../util/jss';
import { Stylesheet } from './Stylesheet';
import { Model } from './Model';
import { ViewModel } from './ViewModel';
import { Controller } from './Controller'
import MixSelector from './MixSelector';
import Link from '../../util/Link'
import CustomIcon from '../../util/Icon';

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

export const C = connect(Model, Controller, ViewModel);

export const View = C(({ classes, actions, mixId }) => (
    <AppBar className={classes.appBar}>
        <Toolbar>
            <Grid container className={classes.gridContainer}>
                <Hidden only={['xs']}>
                    <Grid item onClick={actions.unload}>
                        <Link to={`/`}>
                            <Icon><LibraryMusic /></Icon>
                        </Link>
                    </Grid>
                </Hidden>
                <Hidden only={['xs']}>
                    <Grid item>
                        <Typography type="title" colorInherit>
                            MixQueue
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item>
                    <MixSelector mixId={mixId} />
                </Grid>
                <Hidden only={['xs', 'sm']}>
                    <Grid item style={{ marginLeft: 'auto' }}>
                        <Grid container>
                            <Grid item>
                                <a href="https://archive.org/details/@xdavehome" target="_blank">
                                    <CustomIcon
                                        src={archive}
                                        title="Files hosted at the Internet Archive"
                                        alt="archive.org"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://www.mixcloud.com/xdavehome/" target="_blank">
                                    <CustomIcon
                                        src={mixcloud}
                                        title="More on Mixcloud!"
                                        alt="Mixcloud"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://soundcloud.com/xdavehome" target="_blank">
                                    <CustomIcon
                                        src={soundcloud}
                                        title="Check out my SoundCloud!"
                                        alt="SoundCloud"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://preactjs.com/" target="_blank">
                                    <CustomIcon
                                        src={preact}
                                        title="Powered by Preact"
                                        alt="Preact"
                                    />
                                </a>
                            </Grid>
                            <Grid item>
                                <a href="https://github.com/xdave/mixqueue" target="_blank">
                                    <CustomIcon
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

export default injectCSS(Stylesheet)(View);
