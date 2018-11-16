'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationForm = exports.Checkbox = exports.SelectGroup = exports.FileInput = exports.Radio = exports.TextInputGroup = exports.TextInput = exports.BaseFormControl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.parseFileSize = parseFileSize;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function parseFileSize(size) {
    var num = parseFloat(size, 10);
    var unit = size.match(/[a-zA-Z]+/)[0];
    unit = unit.toLowerCase();
    switch (unit) {
        case "b":
            return num;
        case "kb":
            return 1024 * num;
        case "mb":
            return 1024 * 1024 * num;
        case "gb":
            return 1024 * 1024 * 1024 * num;
        default:
            throw new Error("Unknown unit " + unit);
    }
}

var BaseFormControl = exports.BaseFormControl = function (_React$Component) {
    _inherits(BaseFormControl, _React$Component);

    function BaseFormControl(props) {
        _classCallCheck(this, BaseFormControl);

        var _this = _possibleConstructorReturn(this, (BaseFormControl.__proto__ || Object.getPrototypeOf(BaseFormControl)).call(this, props));

        _this.setError = function (errorMessage) {
            _this.getInputRef().setCustomValidity(errorMessage);
            _this.setState({ errorMessage: errorMessage });
        };

        _this.clearError = function () {
            return _this.setError("");
        };

        _this.checkError = function (e) {
            var isPristine = _this.state.isPristine;
            if (isPristine) _this.setDirty();
            _this.buildErrorMessage();
            _this.changeInputErrorClass();
        };

        _this.handleBlur = function (e) {
            if (_this.context.validationForm.immediate) return;
            _this.checkError();
        };

        _this.handleChange = function (e) {
            if (_this.props.onChange) _this.props.onChange(e);
            if (!_this.context.validationForm.immediate) return;
            _this.checkError();
        };

        _this.validateInput = function () {
            _this.setDirty();
            _this.buildErrorMessage();
        };

        _this.setDirty = function () {
            _this.setState({ isPristine: false });
        };

        _this.filterProps = function () {
            var _this$props = _this.props,
                errorMessage = _this$props.errorMessage,
                successMessage = _this$props.successMessage,
                validator = _this$props.validator,
                defaultErrorMessage = _this$props.defaultErrorMessage,
                attachToForm = _this$props.attachToForm,
                detachFromForm = _this$props.detachFromForm,
                setFormDirty = _this$props.setFormDirty,
                label = _this$props.label,
                immediate = _this$props.immediate,
                rest = _objectWithoutProperties(_this$props, ['errorMessage', 'successMessage', 'validator', 'defaultErrorMessage', 'attachToForm', 'detachFromForm', 'setFormDirty', 'label', 'immediate']);

            return rest;
        };

        _this.state = {
            isPristine: true,
            errorMessage: ""
        };
        if (_react2.default.createRef) _this.inputRef = _react2.default.createRef();else _this.inputRef = function (element) {
            //Before React 16.3
            _this.inputRefLegacy = element;
        };
        return _this;
    }

    _createClass(BaseFormControl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.context.validationForm.attachToForm(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.validationForm.detachFromForm(this);
        }
    }, {
        key: 'getInputRef',
        value: function getInputRef() {
            return this.inputRefLegacy || this.inputRef.current;
        }
    }, {
        key: 'buildErrorMessage',
        value: function buildErrorMessage() {
            var map = {
                valueMissing: "required",
                customError: "",
                stepMismatch: "step",
                patternMismatch: "pattern",
                rangeUnderflow: "min",
                rangeOverflow: "max",
                typeMismatch: "type"
            };

            var errorMessage = this.props.errorMessage;

            var defaultErrorMessage = this.context.validationForm.defaultErrorMessage || {};
            //If string was passed to errorMessage, default to required error Message
            if (typeof errorMessage === "string") errorMessage = { required: errorMessage };
            errorMessage = Object.assign({}, ValidationForm.defaultErrorMessage, defaultErrorMessage, errorMessage);
            var input = this.getInputRef();
            if (input) {
                var validityState = input.validity;
                var newErrorMessage = "";
                for (var prop in validityState) {
                    if (validityState[prop]) {
                        if (prop === "customError") newErrorMessage = input.validationMessage;else newErrorMessage = errorMessage[map[prop]];
                        break;
                    }
                }

                //Add support for minLength attribute
                if (this.props.minLength) {
                    if (input.value.length < +this.props.minLength) {
                        input.setCustomValidity(errorMessage["minLength"]);
                        newErrorMessage = errorMessage["minLength"].replace("{minLength}", this.props.minLength);
                    } else {
                        if (newErrorMessage === errorMessage["minLength"]) {
                            input.setCustomValidity("");
                            newErrorMessage = "";
                        }
                    }
                }

                if (typeof this.props.validator === "function") {
                    var validatorFn = this.props.validator;
                    var value = input.value;
                    if (!validatorFn(value)) {
                        input.setCustomValidity(errorMessage.validator);
                        newErrorMessage = errorMessage.validator;
                    } else {
                        input.setCustomValidity("");
                        newErrorMessage = "";
                    }
                }

                this.setState({ errorMessage: newErrorMessage });
            }
        }
    }, {
        key: 'displayErrorMessage',
        value: function displayErrorMessage() {
            return this.state.errorMessage ? _react2.default.createElement(
                'div',
                { className: 'invalid-feedback' },
                this.state.errorMessage
            ) : null;
        }

        //displayBlock for radio group structure

    }, {
        key: 'displaySuccessMessage',
        value: function displaySuccessMessage(displayBlock) {
            return !this.state.isPristine && !this.state.errorMessage && this.props.successMessage ? _react2.default.createElement(
                'div',
                { className: "valid-feedback" + (displayBlock ? " d-block" : "") },
                this.props.successMessage
            ) : null;
        }
    }, {
        key: 'changeInputErrorClass',
        value: function changeInputErrorClass() {
            var inputRef = this.getInputRef();
            if (inputRef.type !== "radio") {
                if (!inputRef.validity.valid) {
                    inputRef.classList.add("is-invalid");
                    inputRef.classList.remove("is-valid");
                } else {
                    inputRef.classList.remove("is-invalid");
                    inputRef.classList.add("is-valid");
                }
            }
        }

        //Filter out non-DOM attribute

    }]);

    return BaseFormControl;
}(_react2.default.Component);

BaseFormControl.propTypes = {
    name: _propTypes2.default.string.isRequired,
    errorMessage: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
};
BaseFormControl.contextTypes = {
    validationForm: _propTypes2.default.object
};

var TextInput = exports.TextInput = function (_BaseFormControl) {
    _inherits(TextInput, _BaseFormControl);

    function TextInput() {
        _classCallCheck(this, TextInput);

        return _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).apply(this, arguments));
    }

    _createClass(TextInput, [{
        key: 'render',
        value: function render() {
            var props = this.filterProps();

            var multiline = props.multiline,
                successMessage = props.successMessage,
                validator = props.validator,
                domProps = _objectWithoutProperties(props, ['multiline', 'successMessage', 'validator']);

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                multiline ? _react2.default.createElement('textarea', _extends({ className: this.props.className }, domProps, { ref: this.inputRef, onChange: this.handleChange, onBlur: this.handleBlur })) : _react2.default.createElement('input', _extends({ className: this.props.className }, domProps, { ref: this.inputRef, onChange: this.handleChange, onBlur: this.handleBlur })),
                this.displayErrorMessage(),
                this.displaySuccessMessage()
            );
        }
    }]);

    return TextInput;
}(BaseFormControl);

TextInput.defaultProps = _extends({}, BaseFormControl.defaultProps, {
    className: "form-control",
    multiline: false
});

var TextInputGroup = exports.TextInputGroup = function (_BaseFormControl2) {
    _inherits(TextInputGroup, _BaseFormControl2);

    function TextInputGroup() {
        _classCallCheck(this, TextInputGroup);

        return _possibleConstructorReturn(this, (TextInputGroup.__proto__ || Object.getPrototypeOf(TextInputGroup)).apply(this, arguments));
    }

    _createClass(TextInputGroup, [{
        key: 'render',
        value: function render() {
            var props = this.filterProps();

            var prepend = props.prepend,
                append = props.append,
                inputGroupClassName = props.inputGroupClassName,
                inputGroupStyle = props.inputGroupStyle,
                domProps = _objectWithoutProperties(props, ['prepend', 'append', 'inputGroupClassName', 'inputGroupStyle']);

            return _react2.default.createElement(
                'div',
                { className: inputGroupClassName, style: inputGroupStyle },
                prepend && _react2.default.createElement(
                    'div',
                    { className: 'input-group-prepend' },
                    prepend
                ),
                _react2.default.createElement('input', _extends({}, domProps, { className: this.props.className, ref: this.inputRef, onChange: this.handleChange, onBlur: this.handleBlur })),
                append && _react2.default.createElement(
                    'div',
                    { className: 'input-group-append' },
                    append
                ),
                this.displayErrorMessage(),
                this.displaySuccessMessage()
            );
        }
    }]);

    return TextInputGroup;
}(BaseFormControl);

TextInputGroup.defaultProps = _extends({}, BaseFormControl.defaultProps, {
    className: "form-control",
    inputGroupClassName: "input-group"
});
TextInputGroup.propTypes = {
    className: _propTypes2.default.string,
    inputGroupClassName: _propTypes2.default.string,
    inputGroupStyle: _propTypes2.default.object,
    prepend: _propTypes2.default.element,
    append: _propTypes2.default.element
};

var RadioGroup = function (_BaseFormControl3) {
    _inherits(RadioGroup, _BaseFormControl3);

    function RadioGroup() {
        _classCallCheck(this, RadioGroup);

        return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
    }

    _createClass(RadioGroup, [{
        key: 'getInputRef',
        value: function getInputRef() {
            var inputRef = window.document.querySelectorAll('[name="' + this.props.name + '"]')[0];
            return inputRef;
        }
    }, {
        key: 'mapRadioItems',
        value: function mapRadioItems() {
            var _this5 = this;

            return _react2.default.Children.map(this.props.children, function (child) {
                if (typeof child.type !== "function" || child.type.name !== RadioItem.name) {
                    console.warn("Only RadioItem is allowed inside RadioGroup");
                    return;
                }
                return _react2.default.cloneElement(child, _extends({}, child.props, {
                    inline: _this5.props.inline,
                    name: _this5.props.name,
                    required: _this5.props.required,
                    defaultValue: _this5.props.defaultValue,
                    onChange: _this5.props.onChange,
                    valueSelected: _this5.props.valueSelected,
                    checkError: _this5.checkError
                }));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.filterProps();
            var containerStyle = props.containerStyle,
                containerClassName = props.containerClassName;

            return _react2.default.createElement(
                'div',
                { style: containerStyle, className: containerClassName },
                this.mapRadioItems(),
                this.state.errorMessage && _react2.default.createElement(
                    'div',
                    { className: 'invalid-feedback d-block' },
                    this.state.errorMessage
                ),
                this.displaySuccessMessage(true)
            );
        }
    }]);

    return RadioGroup;
}(BaseFormControl);

RadioGroup.defaultProps = {
    inline: true,
    containerStyle: {}
};
RadioGroup.propTypes = {
    inline: _propTypes2.default.bool,
    name: _propTypes2.default.string.isRequired,
    containerStyle: _propTypes2.default.object,
    containerClassName: _propTypes2.default.string,
    defaultValue: _propTypes2.default.string,
    valueSelected: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};

var RadioItem = function (_Component) {
    _inherits(RadioItem, _Component);

    function RadioItem() {
        var _ref;

        var _temp, _this6, _ret;

        _classCallCheck(this, RadioItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this6 = _possibleConstructorReturn(this, (_ref = RadioItem.__proto__ || Object.getPrototypeOf(RadioItem)).call.apply(_ref, [this].concat(args))), _this6), _this6.onChange = function (e) {
            if (_this6.props.onChange) _this6.props.onChange(e, e.target.value);
            _this6.props.checkError();
        }, _temp), _possibleConstructorReturn(_this6, _ret);
    }

    _createClass(RadioItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                checkError = _props.checkError,
                containerStyle = _props.containerStyle,
                containerClassName = _props.containerClassName,
                label = _props.label,
                inline = _props.inline,
                defaultValue = _props.defaultValue,
                valueSelected = _props.valueSelected,
                onChange = _props.onChange,
                domProps = _objectWithoutProperties(_props, ['checkError', 'containerStyle', 'containerClassName', 'label', 'inline', 'defaultValue', 'valueSelected', 'onChange']);

            var checkProps = valueSelected !== undefined && onChange ? { checked: this.props.value === valueSelected } : { defaultChecked: this.props.value === defaultValue };

            return _react2.default.createElement(
                'div',
                { className: containerClassName + " form-check " + (inline ? "form-check-inline" : ""), style: containerStyle },
                _react2.default.createElement('input', _extends({ className: 'form-check-input', type: 'radio'
                }, checkProps, {
                    onChange: this.onChange
                }, domProps)),
                _react2.default.createElement(
                    'label',
                    { className: 'form-check-label', htmlFor: this.props.id },
                    label
                )
            );
        }
    }]);

    return RadioItem;
}(_react.Component);

RadioItem.defaultProps = {
    containerStyle: {},
    containerClassName: ""
};
RadioItem.propTypes = {
    value: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    containerStyle: _propTypes2.default.object,
    containerClassName: _propTypes2.default.string
};
var Radio = exports.Radio = {
    RadioGroup: RadioGroup,
    RadioItem: RadioItem
};

var FileInput = exports.FileInput = function (_BaseFormControl4) {
    _inherits(FileInput, _BaseFormControl4);

    function FileInput() {
        var _ref2;

        var _temp2, _this7, _ret2;

        _classCallCheck(this, FileInput);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this7 = _possibleConstructorReturn(this, (_ref2 = FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call.apply(_ref2, [this].concat(args))), _this7), _this7.checkFileError = function (file) {
            var _this7$props = _this7.props,
                maxFileSize = _this7$props.maxFileSize,
                fileType = _this7$props.fileType,
                _this7$props$errorMes = _this7$props.errorMessage,
                errorMessage = _this7$props$errorMes === undefined ? {} : _this7$props$errorMes;

            errorMessage = Object.assign({}, ValidationForm.defaultErrorMessage, errorMessage);
            var limit = maxFileSize ? parseFileSize(maxFileSize) : null;
            var newErrorMessage = "";
            var fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase().trim();
            fileType = fileType.map(function (type) {
                return type.toLowerCase().trim();
            });
            if (fileType.length > 0 && !fileType.includes(fileExtension)) {
                newErrorMessage = errorMessage["fileType"];
            } else if (limit && file.size > limit) {
                newErrorMessage = errorMessage["maxFileSize"];
            } else {
                newErrorMessage = "";
            }
            var inputRef = _this7.getInputRef();
            inputRef.setCustomValidity(newErrorMessage);
        }, _this7.handleChange = function (e) {
            var inputRef = _this7.getInputRef();
            var file = inputRef.files[0];
            if (_this7.props.onChange) _this7.props.onChange(e, file);
            if (!file) return _this7.checkError();
            _this7.checkFileError(file);
            _this7.checkError();
        }, _temp2), _possibleConstructorReturn(_this7, _ret2);
    }

    _createClass(FileInput, [{
        key: 'render',
        value: function render() {
            var props = this.filterProps();

            var maxFileSize = props.maxFileSize,
                fileType = props.fileType,
                domProps = _objectWithoutProperties(props, ['maxFileSize', 'fileType']);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', _extends({}, domProps, { ref: this.inputRef, type: 'file', onChange: this.handleChange })),
                this.displayErrorMessage(),
                this.displaySuccessMessage()
            );
        }
    }]);

    return FileInput;
}(BaseFormControl);

FileInput.propTypes = {
    fileType: _propTypes2.default.array,
    maxFileSize: _propTypes2.default.string
};
FileInput.defaultProps = _extends({}, BaseFormControl.defaultProps, {
    className: "form-control"
});

var SelectGroup = exports.SelectGroup = function (_BaseFormControl5) {
    _inherits(SelectGroup, _BaseFormControl5);

    function SelectGroup() {
        _classCallCheck(this, SelectGroup);

        return _possibleConstructorReturn(this, (SelectGroup.__proto__ || Object.getPrototypeOf(SelectGroup)).apply(this, arguments));
    }

    _createClass(SelectGroup, [{
        key: 'render',
        value: function render() {
            var domProps = this.filterProps();
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'select',
                    _extends({ className: this.props.className }, domProps, { ref: this.inputRef, onChange: this.handleChange, onBlur: this.handleBlur,
                        value: this.props.value }),
                    this.props.children
                ),
                this.displayErrorMessage(),
                this.displaySuccessMessage()
            );
        }
    }]);

    return SelectGroup;
}(BaseFormControl);

SelectGroup.defaultProps = _extends({}, BaseFormControl.defaultProps, {
    className: "form-control"
});

var Checkbox = exports.Checkbox = function (_BaseFormControl6) {
    _inherits(Checkbox, _BaseFormControl6);

    function Checkbox() {
        var _ref3;

        var _temp3, _this9, _ret3;

        _classCallCheck(this, Checkbox);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this9 = _possibleConstructorReturn(this, (_ref3 = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref3, [this].concat(args))), _this9), _this9.handleChange = function (e) {
            var checked = e.target.checked;
            if (_this9.props.onChange) _this9.props.onChange(e, checked);
            _this9.checkError();
        }, _temp3), _possibleConstructorReturn(_this9, _ret3);
    }

    _createClass(Checkbox, [{
        key: 'render',
        value: function render() {
            var props = this.filterProps();

            var label = props.label,
                inline = props.inline,
                containerStyle = props.containerStyle,
                className = props.className,
                checked = props.checked,
                domProps = _objectWithoutProperties(props, ['label', 'inline', 'containerStyle', 'className', 'checked']);

            return _react2.default.createElement(
                'div',
                { className: "form-check " + (inline ? "form-check-inline" : ""), style: containerStyle },
                _react2.default.createElement('input', _extends({ type: 'checkbox', className: this.props.className }, domProps, { ref: this.inputRef, onChange: this.handleChange, checked: this.props.value, defaultChecked: this.props.defaultChecked })),
                _react2.default.createElement(
                    'label',
                    { className: 'form-check-label', htmlFor: domProps.id },
                    this.props.label
                ),
                this.displayErrorMessage(),
                this.displaySuccessMessage()
            );
        }
    }]);

    return Checkbox;
}(BaseFormControl);

Checkbox.defaultProps = _extends({}, BaseFormControl.defaultProps, {
    className: "form-check-input",
    containerStyle: {},
    label: "",
    inline: false
});
Checkbox.propTypes = {
    name: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    containerStyle: _propTypes2.default.object,
    inline: _propTypes2.default.bool,
    id: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.bool,
    defaultChecked: _propTypes2.default.bool
};

var ValidationForm = exports.ValidationForm = function (_React$Component2) {
    _inherits(ValidationForm, _React$Component2);

    function ValidationForm() {
        var _ref4;

        var _temp4, _this10, _ret4;

        _classCallCheck(this, ValidationForm);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _ret4 = (_temp4 = (_this10 = _possibleConstructorReturn(this, (_ref4 = ValidationForm.__proto__ || Object.getPrototypeOf(ValidationForm)).call.apply(_ref4, [this].concat(args))), _this10), _this10.inputs = {}, _this10.attachToForm = function (component) {
            _this10.inputs[component.props.name] = component;
        }, _this10.detachFromForm = function (component) {
            delete _this10.inputs[component.props.name];
        }, _this10.getChildContext = function () {
            return {
                validationForm: {
                    attachToForm: _this10.attachToForm,
                    detachFromForm: _this10.detachFromForm,
                    immediate: _this10.props.immediate,
                    defaultErrorMessage: _this10.props.defaultErrorMessage
                }
            };
        }, _this10.setFormDiry = function () {
            var form = _this10.refs.form;
            if (!form.classList.contains('was-validated')) form.classList.add('was-validated');
        }, _this10.mapInputs = function (inputs) {
            var arr = Object.keys(inputs).map(function (prop) {
                return inputs[prop];
            });
            return arr;
        }, _this10.findFirstErrorInput = function (inputs) {
            return inputs.find(function (input) {
                return !input.getInputRef().validity.valid;
            });
        }, _this10.getErrorInputs = function (inputs) {
            var map = {};
            inputs.forEach(function (input) {
                var inputRef = input.getInputRef();
                var validityState = inputRef.validity;
                if (!validityState.valid) map[inputRef.name] = input;
            });
            return map;
        }, _this10.handleSubmit = function (event) {
            var form = _this10.refs.form;
            var formData = _this10.getFormData();
            var inputArr = _this10.mapInputs(_this10.inputs);
            _this10.setFormDiry();
            _this10.validateInputs();

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                if (_this10.props.onErrorSubmit) _this10.props.onErrorSubmit(event, formData, _this10.getErrorInputs(inputArr));
                if (_this10.props.setFocusOnError) {
                    var firstErrorInput = _this10.findFirstErrorInput(inputArr);
                    firstErrorInput.getInputRef().focus();
                }
            } else {
                if (_this10.props.onSubmit) _this10.props.onSubmit(event, formData, inputArr);
            }
        }, _this10.resetValidationState = function (isClearValue) {
            for (var prop in _this10.inputs) {
                _this10.inputs[prop].setState({ errorMessage: "", isPristine: true });
                var inputRef = _this10.inputs[prop].getInputRef();
                inputRef.classList.remove("is-valid");
                inputRef.classList.remove("is-invalid");
                inputRef.setCustomValidity("");
                if (isClearValue) {
                    if (inputRef.type == "checkbox") inputRef.checked = false;
                    inputRef.value = "";
                }
            }
            _this10.refs.form.classList.remove("was-validated");
        }, _temp4), _possibleConstructorReturn(_this10, _ret4);
    }

    _createClass(ValidationForm, [{
        key: 'isBaseFormControl',
        value: function isBaseFormControl(element) {
            if (typeof element !== "function") return false;
            while (Object.getPrototypeOf(element) !== Object.prototype) {
                if (Object.getPrototypeOf(element) === BaseFormControl) {
                    return true;
                }
                element = Object.getPrototypeOf(element);
            }
            return false;
        }

        //Use context instead
        // registerChildren(children) {
        //     let newChildren = React.Children.map(children, (child) => {
        //         //If child is our baseFormControl, then assign new props to it
        //         if (!child) return child;
        //         if (this.isBaseFormControl(child.type)) {
        //             return React.cloneElement(child, {
        //                 ...child.props,
        //                 attachToForm: this.attachToForm,
        //                 detachFromForm: this.detachFromForm,
        //                 immediate: this.props.immediate,
        //                 defaultErrorMessage: this.props.defaultErrorMessage
        //             });
        //         } else {
        //             if (typeof child === 'string') return child;
        //             return React.cloneElement(child, {
        //                 children: (typeof child.props.children === "string") ? child.props.children : this.registerChildren(child.props.children)
        //             });
        //         }
        //     });
        //     return newChildren;
        // }

    }, {
        key: 'validateInputs',
        value: function validateInputs() {
            for (var prop in this.inputs) {
                this.inputs[prop].validateInput();
            }
        }
    }, {
        key: 'getFormData',
        value: function getFormData() {
            var model = {};
            for (var name in this.inputs) {
                var inputRef = this.inputs[name].getInputRef();
                var value = null;
                switch (inputRef.type) {
                    case "checkbox":
                        value = inputRef.checked;
                        break;
                    case "radio":
                        var radios = document.querySelectorAll('[name="' + this.props.name + '"]');
                        for (var i = 0; i < radios.length; i++) {
                            if (radios[i].checked) {
                                value = radios[i].value;
                                break;
                            }
                        }
                        break;
                    case "file":
                        value = inputRef.files[0];
                        break;
                    default:
                        value = inputRef.value;
                }
                model[name] = value;
            };
            return model;
        }

        //By default only clear customError and class, if isClearValue is true, clear value also

    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                onSubmit = _props2.onSubmit,
                onErrorSubmit = _props2.onErrorSubmit,
                immediate = _props2.immediate,
                setFocusOnError = _props2.setFocusOnError,
                defaultErrorMessage = _props2.defaultErrorMessage,
                domProps = _objectWithoutProperties(_props2, ['onSubmit', 'onErrorSubmit', 'immediate', 'setFocusOnError', 'defaultErrorMessage']);

            return _react2.default.createElement(
                'form',
                _extends({ noValidate: true, ref: 'form'
                }, domProps, {
                    onSubmit: this.handleSubmit }),
                this.props.children
            );
        }
    }]);

    return ValidationForm;
}(_react2.default.Component);

ValidationForm.defaultProps = {
    className: "needs-validation",
    setFocusOnError: true,
    immediate: true,
    defaultErrorMessage: {}
};
ValidationForm.propTypes = {
    className: _propTypes2.default.string,
    defaultErrorMessage: _propTypes2.default.object,
    setFocusOnError: _propTypes2.default.bool,
    immediate: _propTypes2.default.bool,
    onSubmit: _propTypes2.default.func.isRequired,
    onErrorSubmit: _propTypes2.default.func
};
ValidationForm.childContextTypes = {
    validationForm: _propTypes2.default.object
};
ValidationForm.defaultErrorMessage = {
    required: "This field is required",
    pattern: "Input value does not match the pattern",
    type: "Input value does not match the type",
    step: "Step mismatch",
    minLength: "Please enter at least {minLength} characters",
    min: "Number is too low",
    max: "Number is too high",
    fileType: "File type mismatch",
    maxFileSize: "File size exceed limit",
    validator: "Validator check failed"
};