import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
  This is an awesome looking button for React.
*/
class Button extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {}

    static propTypes = {
        /** 类名 */
        className: PropTypes.string,
        /** 主题 */
        type: PropTypes.string,
        /** 显示内容 */
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element
        ]).isRequired, 
        /** 超链接地址 */
        href: PropTypes.string,
        /** 超链接跳转方式 */
        target: PropTypes.string,
        /** 是否可用 */
        disabled: PropTypes.bool
    }

    onClick = e => {
        const { onClick, disabled } = this.props;
        !disabled && onClick && onClick(e);
    }

    render() {
        const { className, children, href, target, disabled, type } = this.props;
        const cls = classNames('gc-button', { [type]: type, disabled, className });

        if (href && children) {
            return <a className={cls} href={href} target={target || '_blank'}>{children}</a>
        } else if (children) {
            return <button className={cls} onClick={this.onClick}>{children}</button>
        } else {
            return null
        }
    }
}

// Button.propTypes = {
//     className: PropTypes.string,
//     type: PropTypes.string,
//     children: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.node,
//         PropTypes.element
//     ]).isRequired, 
//     href: PropTypes.string,
//     target: PropTypes.string,
//     disabled: PropTypes.bool,
// }

export default Button;