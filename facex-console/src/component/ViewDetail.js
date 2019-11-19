import React from 'react';

class ViewDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        response: []
      };
    }

    componentDidMount() {
        console.log('did mount indeed');
    }

    render() {
        console.log('rendering...');

        return (
            <div>Loading...</div>
        );
    }
}

export default ViewDetail;
