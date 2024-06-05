"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// build/baseStyles.js
var require_baseStyles = __commonJS({
  "build/baseStyles.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BaseStyles = void 0;
    var component = {
      marginRight: "4rem",
      marginBottom: "3rem",
      backgroundColor: "#f7f7f7",
      maxWidth: "960px"
    };
    var section = {
      display: "block",
      justifyContent: "space-around",
      margin: "4rem"
    };
    var topNav = {
      paddingTop: "4rem",
      listStyleType: "none",
      borderBottom: "1px solid silver"
    };
    var topNavStep = {
      color: "silver",
      cursor: "pointer"
    };
    var todo = {
      color: "gray"
    };
    var doing = {
      color: "#1EAEDB"
    };
    var prevButton = {
      color: "#1EAEDB",
      backgroundColor: "white",
      border: "0",
      fontSize: "3rem",
      marginLeft: "2rem",
      paddingTop: "4rem"
    };
    var nextButton = {
      color: "#1EAEDB",
      backgroundColor: "white",
      border: "0",
      fontSize: "3rem",
      marginRight: "2rem",
      paddingTop: "4rem",
      float: "right"
    };
    exports2.BaseStyles = {
      component,
      section,
      topNav,
      topNavStep,
      prevButton,
      nextButton,
      todo,
      doing
    };
  }
});

// build/MultiStep.js
var require_MultiStep = __commonJS({
  "build/MultiStep.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var jsx_runtime_1 = require("react/jsx-runtime");
    var react_1 = __importStar(require("react"));
    var baseStyles_1 = require_baseStyles();
    var getTopNavStyles = (activeStep, length) => {
      const styles = [];
      for (let i = 0; i < length; i++) {
        i === activeStep ? styles.push("doing") : styles.push("todo");
      }
      return styles;
    };
    var getBottomNavState = (activeStep, length, stepIsValid) => {
      if (activeStep === 0) {
        return {
          prevDisabled: true,
          nextDisabled: !stepIsValid,
          hideLast: false
        };
      }
      if (activeStep > 0 && activeStep < length - 1) {
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
      const styles = typeof props.styles === "undefined" ? baseStyles_1.BaseStyles : props.styles;
      const prevButtonCustomProps = props.nextButtonCustomProps ? props.nextButtonCustomProps : {};
      const nextButtonCustomProps = props.nextButtonCustomProps ? props.nextButtonCustomProps : {};
      const [activeChild, setActive] = (0, react_1.useState)(0);
      const [childIsValid, setChildIsValid] = (0, react_1.useState)(false);
      const [topNavState, setTopNavState] = (0, react_1.useState)(getTopNavStyles(activeChild, children.length));
      const [bottomNavState, setBottomNavState] = (0, react_1.useState)(getBottomNavState(activeChild, children.length, childIsValid));
      (0, react_1.useEffect)(() => {
        setTopNavState(getTopNavStyles(activeChild, children.length));
        setBottomNavState(getBottomNavState(activeChild, children.length, childIsValid));
      }, [activeChild, childIsValid]);
      const childStateChanged = (childState) => setChildIsValid(() => childState.isValid);
      children = react_1.default.Children.map(children, (child) => react_1.default.cloneElement(child, { signalParent: childStateChanged }));
      const handleNext = () => setActive(activeChild === children.length - 1 ? activeChild : activeChild + 1);
      const handlePrevious = () => setActive(activeChild > 0 ? activeChild - 1 : activeChild);
      const handleOnClick = (i) => childIsValid ? setActive(i) : console.log("Error: Invalid state");
      const renderTopNav = () => (0, jsx_runtime_1.jsx)("ol", { style: styles.topNav, children: children.map((c, i) => {
        var _a, _b;
        return (0, jsx_runtime_1.jsx)("li", { style: styles.topNavStep, onClick: () => handleOnClick(i), children: topNavState[i] === "doing" ? (0, jsx_runtime_1.jsx)("span", { style: styles.doing, children: (_a = c.props.title) !== null && _a !== void 0 ? _a : i + 1 }) : (0, jsx_runtime_1.jsx)("span", { style: styles.todo, children: (_b = c.props.title) !== null && _b !== void 0 ? _b : i + 1 }) }, i);
      }) });
      const renderBottomNav = () => (0, jsx_runtime_1.jsxs)("div", { style: styles.section, children: [(0, jsx_runtime_1.jsx)("button", { onClick: handlePrevious, style: styles.prevButton, disabled: bottomNavState.prevDisabled, children: (0, jsx_runtime_1.jsx)("span", { children: "<" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleNext, style: bottomNavState.hideLast ? { display: "none" } : styles.nextButton, disabled: bottomNavState.nextDisabled, children: (0, jsx_runtime_1.jsx)("span", { children: ">" }) })] });
      return (0, jsx_runtime_1.jsxs)("div", { style: styles.component, children: [renderTopNav(), (0, jsx_runtime_1.jsx)("div", { style: styles.section, children: children[activeChild] }), renderBottomNav()] });
    }
    exports2.default = MultiStep;
  }
});

// build/index.js
var __importDefault = exports && exports.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MultiStep_1 = __importDefault(require_MultiStep());
exports.default = MultiStep_1.default;
