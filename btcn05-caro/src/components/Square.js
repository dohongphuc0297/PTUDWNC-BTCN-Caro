import React from 'react';

class Square extends React.Component {

    render() {
        return(
        <button
            style={this.props.style}
            className="square" onClick={this.props.onClick}>
            {this.props.value}
        </button>
    )
};
}

export default Square