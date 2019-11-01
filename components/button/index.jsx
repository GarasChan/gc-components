import React, { Component } from 'react';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    onClick = e => {
        const { onClick, disabled } = this.props;
        !disabled && onClick && onClick(e);
    }

    render() {
        const { className, children, href, target, disabled } = this.props;
        // let cls = className ? `gc-button ${className}` : 'gc-button';
        // cls = disabled ? `${cls} disabled` : cls;
        const cls = classNames('gc-button', { className, disabled });

        if (href && children) {
            return <a className={cls} href={href} target={target || '_blank'}>{children}</a>
        } else if (children) {
            return <button className={cls} onClick={this.onClick}>{children}</button>
        } else {
            return null
        }
    }
}

export default Button;