import React from "react";
import calculatorService from "../services/calculatorService";
import ComponentCalculatorView from "./componentCalculatorView";
import ComponentCalculatorKeyboard from "./componentCalculatorKeyboard";

export default function ComponentCalculator() {
  const [objCalc, setObjCalct] = React.useState({
    numbers: [0],
    operations: [],
    result: 0
  });
  const [isFinish, setIsFinish] = React.useState(false);

  function shouldChange() {
    return objCalc.numbers[objCalc.numbers.length - 1] === 0;
  }

  function sendNumber(data) {
    let objCalcTemp = objCalc;
    if (shouldChange()) {
      objCalcTemp.numbers[objCalcTemp.numbers.length - 1] = data;
    } else {
      objCalcTemp.numbers[objCalcTemp.numbers.length - 1] = `${
        objCalcTemp.numbers[objCalcTemp.numbers.length - 1]
      }${data}`;
    }

    objCalcTemp.result = calculatorService(
      objCalcTemp.result,
      objCalcTemp.numbers[objCalc.numbers.length - 1],
      objCalcTemp.operations[objCalc.operations.length - 1]
    );

    setObjCalct(prevState => {
      return { ...prevState, ...objCalcTemp };
    });
  }

  function sendOperator(data) {
    let objCalcTemp = objCalc;
    objCalcTemp.operations.push(data);
    objCalcTemp.numbers.push(0);

    objCalcTemp.result = calculatorService(
      objCalcTemp.result,
      objCalcTemp.numbers[objCalc.numbers.length - 1],
      objCalcTemp.operations[objCalc.operations.length - 1]
    );

    setObjCalct(prevState => {
      return { ...prevState, ...objCalcTemp };
    });
  }

  function deleteAll() {
    const inicialCalcState = {
      numbers: [0],
      operations: [],
      result: 0
    };

    setObjCalct(prevState => {
      return { ...prevState, ...inicialCalcState };
    });
  }

  function deleteLast() {
    let temp = objCalc;

    console.log("temp", temp);

    setObjCalct(prevState => {
      return { ...prevState, ...temp };
    });
  }

  function sendSpecialFunction(data) {
    switch (data) {
      case "DeleteLast":
        deleteLast();
        break;
      case "DeleteAll":
        deleteAll();
        break;
      default:
        alert("Function not register", data);
        break;
    }
  }

  function finishOperation(data) {
    setIsFinish(data);
  }

  return (
    <>
      <ComponentCalculatorView calc={objCalc} finishCalc={isFinish} />
      <ComponentCalculatorKeyboard
        callbackSendNumber={sendNumber}
        callbackSendOperator={sendOperator}
        callbackSendSpecialFunction={sendSpecialFunction}
        callbackFinishOperation={finishOperation}
      />
    </>
  );
}
