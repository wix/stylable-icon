import * as React from 'react';
import {IconDef} from './icon';

export const contextSymbol = `iconContext`;

export type IconDic =  {[k:string]:IconDef};

export interface IconProps {
    children: JSX.Element;
};

export function IconContextValidator(context:any, id:string){
    return context[id] instanceof IconContextProviderBase ? null : false;
}

function getIconDefFromContext(iconDic: IconDic, id: string):IconDef {
    return iconDic[id]; // ToDo: fallback
}

export class IconContextProviderBase extends React.Component<{children:JSX.Element|JSX.Element[]}, {iconDic: IconDic}> {
    static childContextTypes = {
        [contextSymbol]:IconContextValidator
    }
    state = {
        iconDic: {}
    };
    getChildContext() {
        return {[contextSymbol]: getIconDefFromContext.bind(null, this.state.iconDic)};
    }
    render() {
        return <>{this.props.children}</>;
    }
};

export const createIconProvider = (iconDic:IconDic) => {
    return class IconContextProvider extends IconContextProviderBase {
        state = {
            iconDic: iconDic
        };
    }
};