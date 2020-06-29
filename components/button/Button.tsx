import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';

export type ButtonTag = 'button' | 'link';
export type ButtonType = 'empty' | 'fill' | 'stroke';
export type ButtonTheme = 'default' | 'primary' | 'danger';
export type ButtonSize = 'normal' | 'tiny' | 'small' | 'large';
export type AnchorTarget = '_blank' | '_self' | '_parent' | '_top';

export interface BaseButtonProps {
    prefixCls?: string;
    /** 渲染类型 支持“仅文本、填充、描边”三种渲染 默认“仅文本” */
    type?: ButtonType;
    /** 标签类型 支持“按钮和链接”两种标签 默认“按钮” */
    tag?: ButtonTag;
    /** 主题 支持“主要按钮、次级按钮和危险按钮”三种主题 默认“次级按钮” */
    theme?: ButtonTheme;
    /** 尺寸 支持“超小、小、正常、大”四种尺寸 默认“真长” */
    size?: ButtonSize;
    /** 是否横向充满容器 */
    block?: boolean;
    /** 图标，会添加在按钮左侧 支持react组件或对应svg图标id */
    icon?: React.ReactElement | string;
    /** 是否不可用 */
    disabled?: boolean;
    /** 是否加载中 */
    loading?: boolean | string;
    /** class类名 */
    className?: string;
    /** 是否阻止冒泡 */
    stopPropagation?: boolean;
    /** 是否阻止默认事件 */
    preventDefault?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export interface AnchorProps extends BaseButtonProps {
    href?: string;
    target?: AnchorTarget;
}

export type ButtonProps = BaseButtonProps | AnchorProps;

const typeToClass = {
    empty: '',
    fill: 'fill',
    stroke: 'stroke',
};

const themeToClass = {
    default: '',
    primary: 'primary',
    danger: 'danger',
};

const sizeToClass = {
    normal: '',
    tiny: 'tiny',
    small: 'small',
    large: 'large',
};

const Button = (props: ButtonProps): React.ReactElement => {
    const {
        prefixCls = 'gc-button',
        children,
        className,
        type = 'stroke',
        tag = 'button',
        theme = 'default',
        size = 'normal',
        block,
        disabled,
        icon,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        loading,
        stopPropagation = false,
        preventDefault = false,
        ...anchorProps
    } = props;

    let currentType = type;
    // 默认primary为solid，default和danger为stroke
    if (!('type' in props) && theme === 'primary') {
        currentType = theme === 'primary' ? 'fill' : 'stroke';
    }

    const renderChildren = (): React.ReactNode => {
        const childList =
            React.Children.map(children, child =>
                ['string', 'number'].includes(typeof child) ? (
                    <span className={`${prefixCls}-ellipsis`}>{child}</span>
                ) : (
                    child
                ),
            ) || [];
        if ('icon' in props && icon !== undefined) {
            childList.unshift(
                typeof icon === 'string' ? (
                    <Icon key={icon} type={icon} className={`${prefixCls}-icon`} />
                ) : (
                    React.cloneElement(icon, {
                        className: classNames(`${prefixCls}-icon`, icon.props.className),
                    })
                ),
            );
        }
        if ('loading' in props && loading) {
            const loadingIcon = typeof loading === 'boolean' ? 'gc-icons-reload' : loading;
            childList.unshift(
                <Icon key={`${prefixCls}-loading-icon`} type={loadingIcon} className={`${prefixCls}-loading-icon`} />,
            );
        }
        return childList;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        if (disabled) {
            return;
        }
        stopPropagation && e.stopPropagation();
        preventDefault && e.preventDefault();
        onClick?.(e);
    };

    const getClassName = (): string => {
        return classNames(
            prefixCls,
            {
                [`${prefixCls}-block`]: block,
                [`${prefixCls}-iconOnly`]: !children,
                [`${prefixCls}-${sizeToClass[size]}`]: size !== 'normal',
                [`${prefixCls}-${typeToClass[currentType]}`]: currentType !== 'empty',
                [`${prefixCls}-${themeToClass[theme]}`]: theme !== 'default',
                [`${prefixCls}-loading`]: loading,
                [`${prefixCls}-disabled`]: disabled,
            },
            className,
        );
    };

    if (tag === 'link') {
        return (
            <a
                className={getClassName()}
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
                {...anchorProps}
            >
                {renderChildren()}
            </a>
        );
    } else {
        return (
            <button
                className={getClassName()}
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
            >
                {renderChildren()}
            </button>
        );
    }
};

export default Button;
