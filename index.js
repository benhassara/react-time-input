'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeInput = _react2.default.createClass({
    displayName: 'TimeInput',
    getInitialState: function getInitialState() {
        return {
            time: this.props.initTime || ''
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        if (!this.props.disabled && this.props.mountFocus) {
            setTimeout(function () {
                _this._input.focus();
            }, 0);
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        var _this2 = this;

        if (this.props.mountFocus) {
            setTimeout(function () {
                _this2._input.focus();
            }, 0);
        }
    },
    isValid: function isValid(val) {

        var isValid = true,
            letterArr = val.split(':').join('').split(''),
            regexp = /^\d{0,2}?\:?\d{0,2}$/,
            valArr = [];

        if (!regexp.test(val)) {
            isValid = false;
        }

        // check each letter

        if (letterArr[0] && (parseInt(letterArr[0], 10) < 0 || parseInt(letterArr[0], 10) > 2)) {
            isValid = false;
        }

        if (letterArr[2] && (parseInt(letterArr[2], 10) < 0 || parseInt(letterArr[2], 10) > 5)) {
            isValid = false;
        }

        if (valArr.indexOf(':')) {
            valArr = val.split(':');
        } else {
            valArr.push(val);
        }

        // check mm and HH
        if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
            isValid = false;
        }

        if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
            isValid = false;
        }

        return isValid;
    },


    lastVal: '',

    onChangeHandler: function onChangeHandler() {

        var val = this._input.value;

        console.log(val + ' ' + this.isValid(val));

        if (this.isValid(val)) {

            if (val.length === 2 && this.lastVal.length !== 3) {
                val = val + ':';
            }

            if (val.length === 2 && this.lastVal.length === 3) {
                val = val.slice(0, 1);
            }

            if (val.length > 5) {
                return false;
            }

            this.lastVal = val;

            this.setState({
                time: val
            });

            if (val.length === 5) {
                this.props.onTimeChange(val);
            }
        }
    },
    render: function render() {
        var _this3 = this;

        return _react2.default.createElement('input', {
            className: this.props.className,
            name: this.props.name,
            type: 'tel',
            disabled: this.props.disabled,
            placeholder: ' ',
            value: this.state.time,
            onChange: this.onChangeHandler,
            ref: function ref(c) {
                return _this3._input = c;
            }
        });
    }
});

exports.default = TimeInput;
