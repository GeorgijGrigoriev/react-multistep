"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const baseStyles_1 = require("./baseStyles");
const getTopNavStyles = (activeStep, length) => {
    const styles = [];
    for (let i = 0; i < length; i++) {
        i === activeStep ? styles.push('doing') : styles.push('todo');
    }
    return styles;
};
const getBottomNavState = (activeStep, length, stepIsValid) => {
    if (activeStep === 0) {
        return {
            prevDisabled: true,
            nextDisabled: !stepIsValid,
            hideLast: false
        };
    }
    if (activeStep > 0 && activeStep < (length - 1)) {
        return {
            prevDisabled: false,
            nextDisabled: !stepIsValid,
            hideLast: false
        };
    }
    return {
        prevDisabled: false,
        nextDisabled: !stepIsValid,
        hideLast: true
    };
};
function MultiStep(props) {
    let { children } = props;
    if (!children)
        throw TypeError("Error: Application has no children Components configured");
    const styles = typeof props.styles === 'undefined' ? baseStyles_1.BaseStyles : props.styles;
    const [activeChild, setActive] = (0, react_1.useState)(0);
    const [childIsValid, setChildIsValid] = (0, react_1.useState)(false);
    const [topNavState, setTopNavState] = (0, react_1.useState)(getTopNavStyles(activeChild, children.length));
    const [bottomNavState, setBottomNavState] = (0, react_1.useState)(getBottomNavState(activeChild, children.length, childIsValid));
    (0, react_1.useEffect)(() => {
        setTopNavState(getTopNavStyles(activeChild, children.length));
        setBottomNavState(getBottomNavState(activeChild, children.length, childIsValid));
    }, [activeChild, childIsValid]);
    const childStateChanged = (childState) => setChildIsValid(() => childState.isValid);
    children = react_1.default.Children.map(children, child => react_1.default.cloneElement(child, { signalParent: childStateChanged }));
    const handleNext = () => setActive(activeChild === children.length - 1 ? activeChild : activeChild + 1);
    const handlePrevious = () => setActive(activeChild > 0 ? activeChild - 1 : activeChild);
    const handleOnClick = (i) => childIsValid ? setActive(i) : console.log('Error: Invalid state');
    const renderTopNav = () => (0, jsx_runtime_1.jsx)("ol", { style: styles.topNav, children: children.map((c, i) => {
            var _a, _b;
            return (0, jsx_runtime_1.jsx)("li", { style: styles.topNavStep, onClick: () => handleOnClick(i), children: topNavState[i] === 'doing' ? (0, jsx_runtime_1.jsx)("span", { style: styles.doing, children: (_a = c.props.title) !== null && _a !== void 0 ? _a : i + 1 }) :
                    (0, jsx_runtime_1.jsx)("span", { style: styles.todo, children: (_b = c.props.title) !== null && _b !== void 0 ? _b : i + 1 }) }, i);
        }) });
    const renderBottomNav = () => (0, jsx_runtime_1.jsxs)("div", { style: styles.section, children: [(0, jsx_runtime_1.jsx)("button", { onClick: handlePrevious, style: styles.prevButton, disabled: bottomNavState.prevDisabled, children: (0, jsx_runtime_1.jsx)("span", { children: "<" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleNext, style: bottomNavState.hideLast ? { display: 'none' } : styles.nextButton, disabled: bottomNavState.nextDisabled, children: (0, jsx_runtime_1.jsx)("span", { children: ">" }) })] });
    return ((0, jsx_runtime_1.jsxs)("div", { style: styles.component, children: [renderTopNav(), (0, jsx_runtime_1.jsx)("div", { style: styles.section, children: children[activeChild] }), renderBottomNav()] }));
}
exports.default = MultiStep;
