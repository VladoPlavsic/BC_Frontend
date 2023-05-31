import React from 'react';
import { RingLoader } from 'react-spinners';

class LoadingSpinner extends React.Component {
    render() {
        return (
            <div className='sweet-loading'>
                <RingLoader
                    color={'#123abc'}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

export default LoadingSpinner