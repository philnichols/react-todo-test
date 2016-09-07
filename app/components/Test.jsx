var React = require('react');

var {connect} = require('react-redux');

export var Test = React.createClass({
    render: function () {
        var {todos, showCompleted, searchText} = this.props;

        var renderTodos = () => {
            return "Intro text.";
        }

        return (
            <div>
                {renderTodos()}
            </div>
        )
    }
});

export default connect()(Test);