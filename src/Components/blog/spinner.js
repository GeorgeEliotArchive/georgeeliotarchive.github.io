import React from 'react';

import classes from './spinner.module.css';

const Spinner = () => (
    <div className={classes.center}>
    <div className={classes.Spinnerborder}></div>
    <h2>Loading ...</h2>

    </div>
);

export default Spinner;