import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { BooleanSliderComponent, OnClickProps } from "./components/Slider";


class BooleanSlider extends WidgetBase {
    // parameters configured in the modeler
    private dataAttribute: string;
    private onChangeMicroflow: string;
    private trueValue: string;
    private falseValue: string;
    private editable: boolean;

    // internal variables
    private contextObject: mendix.lib.MxObject;

    postCreate() {
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback: Function) {
        this.contextObject = object;
        this.resetSubscriptions();
        this.updateRendering();
        callback();
    }

    uninitialize(): boolean {
        unmountComponentAtNode(this.domNode);
        return true;
    }

    private updateRendering(callback?: Function) {
        const val = this.contextObject
            ? (this.contextObject.get(this.dataAttribute)) as boolean
            : false;
        this.falseValue = this.contextObject
            ? this.getValue(this.contextObject.get(this.falseValue) as string, "False")
            : "False";
        this.trueValue = this.contextObject
            ? this.getValue(this.contextObject.get(this.trueValue) as string, "True")
            : "True";

        render(createElement(BooleanSliderComponent, {
            classes: "",
            dataAttribute: val,
            editable: this.editable,
            falseValue: this.falseValue,
            microflowProps: this.createOnClickProps(),
            trueValue: this.trueValue
        }), this.domNode
        );
    }

    private getValue(attr: string, otherValue: string) {
        return attr ? attr : otherValue;
    }

    private createOnClickProps(): OnClickProps {
        return ({
            guid: this.contextObject ? this.contextObject.getGuid() : "",
            microflow: this.onChangeMicroflow
        }
        );
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                attr: this.dataAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
        }
    }
}

// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare(
    "com.mendix.widget.BooleanSlider.BooleanSlider",
    [ WidgetBase ],
    function (Source: any) {
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    } (BooleanSlider));
