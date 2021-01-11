import React, {useState }from "react";
import calCss from "./Calculator.module.scss";
import Display from "../Display/Display";

   
// this regex is used to do what
const REGEX = /[*/+-]/;
const Regex1 = /[?*/+]/;
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNumber: [],
      calCulatedValue: 0,
      prevVal: 0,
    };
    this.opration = "";
    this.operationsClickHandler = this.operationsClickHandler.bind(this);
    this.calculateHandler = this.calculateHandler.bind(this);
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.numbersClickHandler = this.numbersClickHandler.bind(this);
    this.clearButtonHandler = this.clearButtonHandler.bind(this);
  }

  findEventValue=(e)=>{
    switch(e.key){
      case String((e.key).match(/^\d+$/)):
        this.numbersClickHandler(e.key);
        break;
      case String((e.key).match(REGEX)):
          this.operationsClickHandler(e.key);
          break;
      case "=":
        this.calculateHandler();
        break;
      case "Enter":
          this.calculateHandler();
          break;
      default:
        console.log("You are in default section")
    }
  }

  BackSpaceEventHandler=(e)=>{
      if(e.key === "Backspace"){this.clearLastValueHandler();}
  }

  componentDidMount(){
    window.addEventListener("keypress",this.findEventValue)
    window.addEventListener("keydown",this.BackSpaceEventHandler)
  }
  componentWillUnmount(){
    window.removeEventListener("keypress",this.findEventValue);
    window.addEventListener("keydown",this.BackSpaceEventHandler);
  }
  numbersClickHandler = (e) => {
    let displayNumber = [...this.state.displayNumber];
    let displaylength = displayNumber.length - 1;
    let tempDisplay = displaylength >= 0 && displayNumber[displaylength];
    let number = e.target ===undefined ?e : e.target.value;
    if (tempDisplay.length < 9 || tempDisplay.length === undefined) {
      displayNumber.length === 0 || REGEX.test(displayNumber[displaylength])
        ? displayNumber.push(number)
        : (displayNumber[displaylength] =
            displayNumber[displaylength] + number);
      this.setState({
        displayNumber: displayNumber,
      });
    } else {
      this.maxDigitWarning();
    }
  };
  maxDigitWarning = () => {
    this.setState({
      prevVal: this.state.displayNumber,
      displayNumber: "Digit limit",
    });
    setTimeout(() => {
      this.setState({
        displayNumber: this.state.prevVal,
      });
    }, 1000);
  };

  clearButtonHandler = () => {
    
    this.setState({ displayNumber: [], calCulatedValue: 0 });
  };
  clearLastValueHandler=()=>{
    let displayNumber = [...this.state.displayNumber];
    displayNumber = displayNumber.slice(0,-1);
    this.setState({ displayNumber:displayNumber});
  }
  operationsClickHandler = (number) => {
    let { calCulatedValue } = this.state;
    let displayNumber = [...this.state.displayNumber];
    let displaylength = displayNumber.length - 1;
    if (!REGEX.test(displayNumber[displaylength])) {
      displayNumber.push(number);
    } else if (Regex1.test(displayNumber[displaylength])) {
      number === "-"
        ? (displayNumber[displaylength] += number)
        : (displayNumber[displaylength] = number);
    } else if (displayNumber[displaylength] === "-") {
      displayNumber = displayNumber.slice(0, displaylength);
      displayNumber.push(number);
    } else {
      displayNumber[displaylength] = number;
    }
    this.setState({
      displayNumber: displayNumber,
      calCulatedValue: calCulatedValue,
    });
  };
  modeClickHandler=()=>{
    let displayNumber = [...this.state.displayNumber];
    displayNumber = parseFloat(displayNumber.join("")) / 100;
    this.setState({
        displayNumber: displayNumber,
      });
  }

  calculateHandler = () => {
    let outPut = 0;
    let displayNumber = [...this.state.displayNumber];
    let displaylength = displayNumber.length - 1;
    displayNumber = REGEX.test(displayNumber[displaylength])
      ? displayNumber.slice(0, -1)
      : displayNumber;
    outPut =
      Math.round(1000000000000 * eval(displayNumber.join(""))) / 1000000000000;
    // outPut=outPut.toLocaleString('en-IN',{maximumSignificantDigits:3})
    displayNumber = [];
    displayNumber.push(outPut);
    this.setState({ displayNumber: displayNumber });
  };
  render() {
    const { displayNumber } = this.state;
    let tempView =
      typeof displayNumber === "object"
        ? displayNumber.length === 0
          ? 0
          : displayNumber.join("")
        : displayNumber;

    let singleDecimal = /[.]/.test(displayNumber[displayNumber.length - 1]);
    return (
      <div className={calCss.wrapper}>
          <Display  view={tempView}>
          </Display>
        <div className={calCss.buttonDivs}>
          <div>
            <button
              className={calCss.clearStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.clearButtonHandler()
              }
              id="clear"
            >
              AC
            </button>
            <button
              className={calCss.clearStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.clearLastValueHandler()
              }
              id="clearLastValue"
            >
              C
            </button>
            <button
              className={calCss.modeStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.modeClickHandler()
              }
              id="mode"
            >
            %
            </button>
            <button
              className={calCss.operatorStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.operationsClickHandler("-")
              }
              id="divide"
              data-testid="divide"
            >
              &#xf7;
            </button>
            
          </div>
          <div>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="7"
              id="seven"
            >
              7
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="8"
              id="eight"
            >
              8
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="9"
              id="nine"
            >
              9
            </button>
            <button
              className={calCss.operatorStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.operationsClickHandler("*")
              }
              id="multiply"
            >
             x
            </button>
            
          </div>
          <div>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="4"
              id="four"
            >
              4
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="5"
              id="five"
            >
              5
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="6"
              id="six"
            >
              6
            </button>
            <button
              className={calCss.operatorStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.operationsClickHandler("+")
              }
              id="add"
            >
              +
            </button>
          </div>
          <div>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="1"
              id="one"
            >
              1
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="2"
              id="two"
            >
              2
            </button>
            <button
              className={calCss.inputButton}
              onClick={this.numbersClickHandler}
              value="3"
              id="three"
            >
              3
            </button>
            <button
              className={calCss.operatorStyle}
              onClick={() =>
                displayNumber.length !== 0 && this.operationsClickHandler("-")
              }
              id="subtract"
            >
              -
            </button>
          </div>
          <div>
            <button
              className={calCss.zeroButton}
              onClick={(event) => {
                displayNumber.length !== 0 && this.numbersClickHandler(event);
              }}
              value="0"
              id="zero"
            >
              0
            </button>
            <button
            className={calCss.inputButton}
              onClick={() =>
                displayNumber.length !== 0 && singleDecimal === false
                  ? this.operationsClickHandler(".")
                  : ""
              }
              id="decimal"
            >
              .
            </button>
            <button
              onClick={displayNumber.length !== 0 ? this.calculateHandler : undefined}
              id="equals"
              className={calCss.operatorStyle}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
