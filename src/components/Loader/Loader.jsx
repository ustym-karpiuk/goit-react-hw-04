import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#000000"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export default Loader;
