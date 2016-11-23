import { DOM } from "react";

export interface OnClickProps {
    microflow: string;
    guid: string;
}

export interface BooleanSliderProps {
    microflowProps?: OnClickProps;
    checked?: boolean;
    classes?: string;
    dataAttribute?: boolean;
    trueValue?: string;
    falseValue?: string;
    editable?: boolean;
    onClick?: Function;
}

export function BooleanSliderComponent(props: BooleanSliderProps) {
    let classn = "wgt-BooleanSlider_control form-control " as string;
    if (props.dataAttribute !== null && props.dataAttribute) {
        classn += "btn btn-primary";
    } else {
        classn += "btn btn-default";
    }

    return (
        DOM.div({ className: "wgt-BooleanSlider" },
            DOM.div({ className: classn },
                DOM.input({
                    className: "wgt-BooleanSlider__input",
                    onClick: () => executeMicroflow(props.microflowProps.microflow, props.microflowProps.guid),
                    type: "checkbox"
                }),
                DOM.div({
                    className: "wgt-BooleanSlider__toggle"
                },
                    DOM.span({
                        className: "wgt-BooleanSlider__toggletrue"
                    },
                        "Yes"),
                    DOM.span({
                        className: "wgt-BooleanSlider__togglefalse"
                    }, "No"
                    )
                )
            )
        )
    );
}

const executeMicroflow = (actionname: string, guids: string) => {
    if (actionname) {
        window.mx.data.action({
            error: (error) => {
                window.mx.ui.error(`Error while executing MicroFlow: ${actionname}: ${error.message}`);
            },
            params: {
                actionname,
                applyto: "selection",
                guids: [ guids ]
            }
        });
    }
};
