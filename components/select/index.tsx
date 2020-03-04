import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import classNames from 'classnames';
import Tooltip from "rc-tooltip";
import { TooltipProps } from 'rc-tooltip/es/Tooltip';
import Icon from '../icon';
import _Util from '../_util/Util';

export interface SelectProps {
    prefixCls?: string;
    align?: TooltipProps['align'];
    children?: React.ReactNode;
    options?: SelectOption[];
    defaultValue?: string;
    value?: string;
    renderSelectedComponent?: () => React.ReactElement;
    onChange?: (option: SelectItem) => void;
    hideOnClick?: string;
    dropdownStyle?: React.CSSProperties;
}

export interface OptionProps {
    children?: React.ReactNode;
    [optional: string]: any;
}

export type SelectOption = {
    label?: string,
    value?: string
} & string;

export interface SelectItem {
    value?: string;
}

/**
 * 按钮
 */
function Select(props: SelectProps) {
    const {
        prefixCls = 'gc-select',
        align = {},
        children,
        options,
        defaultValue,
        value,
        renderSelectedComponent,
        onChange,
        hideOnClick = true,
        dropdownStyle = {}
    } = props;
    if (!_Util.isArray(options) && children === undefined) {
        console.error('The param "options" or "children" must exist, but not found.');
        return null;
    }

    const [width, setWidth] = useState(dropdownStyle.width);
    const [selectedValue, setSelectedValue] = useState(defaultValue || value);
    const [isDropdownShow, setDropdownStatus] = useState(false);
    const selectValueRef: React.Ref<HTMLDivElement> = React.createRef();

    useEffect(() => {
        if ('value' in props && props.value !== selectedValue) {
            setSelectedValue(props.value);
        }
        if (!width && selectValueRef.current) {
            setWidth(selectValueRef.current.clientWidth);
        }
    }, [value])

    const handleClick = (option: SelectItem) => {
        if (!('value' in props)) {
            setSelectedValue(option.value);
        }
        hideOnClick && toggleDropdownStatus(false);
        onChange && onChange(option);
    }

    const toggleDropdownStatus = (isShow?: boolean) => {
        if (isShow !== undefined) {
            setDropdownStatus(isShow);
        } else {
            setDropdownStatus((isDropdownShow) => {
                return !isDropdownShow;
            });
        }
    }

    const handleVisibleChange = (visible: boolean) => {
        setDropdownStatus(visible);
    }

    const renderValue = () => {
        const innnerCls = `${prefixCls}-value-inner`;
        let valueComponent: React.ReactElement | string | undefined = selectedValue;
        if (options && _Util.isArray(options)) {
            const option = options.find(option => option.value === selectedValue);
            option && (valueComponent = option.label);
            // valueComponent = option?.label;
        }
        // valueComponent = _Util.isArray(options) ? options?.find(option => option.value === selectedValue)?.label : selectedValue;
        if ('renderSelectedComponent' in props && renderSelectedComponent && _Util.isFunction(renderSelectedComponent)) {
            valueComponent = renderSelectedComponent();
        }
        if (React.isValidElement(valueComponent)) {
            const { className } = valueComponent.props;
            valueComponent = React.cloneElement(valueComponent, {
                className: innnerCls + className
            });
        }
        if (_Util.isString(valueComponent)) {
            valueComponent = <span className={innnerCls}>{valueComponent}</span>;
        }
        return valueComponent;
    }

    const getOptions = () => {
        if (!options) {
            return [];
        }
        return options.map(option => {
            if (!_Util.isObject(option)) {
                return {
                    label: option,
                    value: option
                }
            }
            return option;
        })
    }

    const renderDropdown = () => {
        if (children !== undefined) {
            return React.Children.map(children, (child: any) => {
                const { className, value } = child.props;
                if (!React.isValidElement(child)) {
                    return null;
                }
                const option = _Util.filterProps(child.props, ['children', 'className']);
                const childProps = {
                    onClick: () => { handleClick(option) },
                    className: classNames(
                        `${prefixCls}-dropdown-item`,
                        {
                            [className]: className,
                            [`${prefixCls}-dropdown-active`]: selectedValue === value
                        }
                    )
                }
                return React.cloneElement(child, childProps);
            })
        }
        return getOptions().map((option) => {
            const { label, value } = option;
            return (
                <Option
                    className={
                        classNames(`${prefixCls}-dropdown-item`,
                            {
                                // [className]: className,
                                [`${prefixCls}-dropdown-active`]: selectedValue === value
                            }
                        )}
                    value={value}
                    onClick={() => { handleClick(option) }}
                >
                    {label}
                </Option>
            )
        })
    }

    const getDropdownStyle = () => {
        const style = { ...dropdownStyle };
        if (width) {
            style.width = `${width}px`;
        }
        return style;
    }

    return (
        <Tooltip
            trigger='click'
            placement='bottomLeft'
            prefixCls={`${prefixCls}-dropdown`}
            transitionName='gc-zoom'
            overlay={
                <Scrollbars className='gc-scrollbars'>
                    <ul className={`${prefixCls}-dropdown-wrapper`}>
                        {renderDropdown()}
                    </ul>
                </Scrollbars>
            }
            overlayStyle={getDropdownStyle()}
            visible={isDropdownShow}
            onVisibleChange={handleVisibleChange}
            align={align}
        >
            <div ref={selectValueRef} className={classNames(prefixCls, { [`${prefixCls}-hidden`]: !isDropdownShow })}>
                <div className={`${prefixCls}-value`} onClick={() => {toggleDropdownStatus()}}>
                    {renderValue()}
                    <Icon
                        type='arrow-up'
                        className={`${prefixCls}-value-arrow`}
                    />
                </div>
            </div>
        </Tooltip>
    )
}

export function Option(props: OptionProps) {
    const { children, onClick, ...restProps } = props;

    const renderChildren = () => {
        if (React.isValidElement(children)) {
            return children;
        } else {
            return <span>{children}</span>;
        }
    }

    return (
        <li onClick={onClick} {...restProps}>{renderChildren()}</li>
    )
}

export default Select;