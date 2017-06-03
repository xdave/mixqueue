import * as archiveActions from '../../../actions/archive';
import * as musicActions from '../../../actions/music';

export const Controller = {
    fetchMetadata: archiveActions.fetchMetadata,
    setSrc: musicActions.setSrc
};
