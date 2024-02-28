import { ChangeEvent, useState } from 'react'
import './App.css'
import CustomBtn from "./components/customBtn.tsx"

function App() {

  const [display, setDisplay] = useState<string>("12");
  // const [operator, setOperator] = useState<string>();
  const [formula, setFormula] = useState<string[]>([]);
  const [justOped, setJustOped] = useState<boolean>(false);
  const [afterEqual, setAfterEqual] = useState<boolean>(false);

  function updateDisplay(input: string) {
    input = (display.length === 0 || justOped) && input === "." ? "0." : input;
    setJustOped(false);
    // if just added operator or previos display === 0, then update display with input, else add the digit to previous display
    setDisplay(justOped || (display.length === 1 && parseFloat(display) === 0) ? input : [display.split(","), input].join(""))
    console.log("Display", display, input);
  }

  function handlePositive() {
    setDisplay(display[0] === "-" ? display.substring(1) : ["-", display].join(""));
  }
  function checkOperator(): boolean {
    return !(formula[formula.length - 1] === "+" || formula[formula.length - 1] === "-" || formula[formula.length - 1] === "*" || formula[formula.length - 1] === "/");
  }

  function reset() {
    setDisplay("0");
    if (checkOperator()) {
      setFormula([]);
      setJustOped(false);
    }

  }

  function handleOperator(operator: string) {
    console.log("ABC", justOped, operator, [...formula.map((v, i) => { return i === formula.length - 1 ? operator : v })])
    const tempFormula: string[] = justOped ? [...formula.map((v, i) => { return i === formula.length - 1 ? operator : v })] : afterEqual ? [...formula, operator] : [...formula, parseFloat(display).toString(), operator];
    setAfterEqual(false);
    setJustOped(true);
    setFormula(tempFormula);
  }

  function handleChange(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement
    setDisplay(value);
    console.log("EVENT", value);
  }

  function handlePercent() {
    var source: string = justOped ? calculation(formula.filter((v, i) => { return i !== formula.length - 1 }))[0] : display;
    const cal: number = (formula[formula.length - 1] === "-" || formula[formula.length - 1] === "+") ? parseFloat(source) * (parseFloat(source) / 100) : parseFloat(source) / 100;
    setFormula([...formula, cal.toString()]);
    console.log("FFFF", formula);
    setDisplay(cal.toString());
  }

  function calculation(tempFormula: string[]): string[] {
    while (tempFormula.includes("*") || tempFormula.includes("/")) {
      // const newFormula = await catchMD(tempFormula);
      tempFormula = catchMD(tempFormula);
      console.log("While formula", tempFormula);
    };

    while (tempFormula.length > 1) {
      tempFormula = handlePM(tempFormula);
      console.log("Plus formula", tempFormula);
    };
    return tempFormula;
  }
  function handleEqual() {
    var tempFormula: string[] = justOped ? formula : [...formula, display];

    // while (tempFormula.includes("*") || tempFormula.includes("/")) {
    //   // const newFormula = await catchMD(tempFormula);
    //   tempFormula = catchMD(tempFormula);
    //   console.log("While formula", tempFormula);
    // };

    // while (tempFormula.length > 1) {
    //   tempFormula = handlePM(tempFormula);
    //   console.log("Plus formula", tempFormula);
    // };
    tempFormula = calculation(tempFormula);
    setFormula(tempFormula);
    setDisplay((Math.round(parseFloat(tempFormula[0]) * 100) / 100).toString());
    setAfterEqual(true);
    return tempFormula

  }

  function catchMD(tFormula: string[]): string[] {
    // console.log("AAAAA", tFormula.indexOf("*"));
    const mIndex: number = tFormula.indexOf("*");
    const dIndex: number = tFormula.indexOf("/");

    const oIndex: number | null = (mIndex < 0 && dIndex < 0) ? null : mIndex < 0 ? dIndex : dIndex < 0 ? mIndex : (mIndex < dIndex) ? mIndex : dIndex;
    console.log("Index", oIndex, mIndex, dIndex)
    if (oIndex != null) {
      // const ans: number = handleProcess(parseFloat(tFormula[oIndex - 1]), parseFloat(tFormula[oIndex + 1]), tFormula[oIndex]);
      // console.log("Ans", ans)
      // // add ans to replace the cal
      // // var newFormula = tFormula.map((v, i) => { return i === oIndex ? ans.toString() : v });
      // // newFormula = newFormula.filter((v, i) => { return !(i === oIndex - 1 || i === oIndex + 1) });
      // tFormula = tFormula.map((v, i) => { return i === oIndex ? ans.toString() : v });
      // tFormula = tFormula.filter((v, i) => { return !(i === oIndex - 1 || i === oIndex + 1) });
      tFormula = replaceAns(tFormula, oIndex);
    }
    console.log("tFormula", tFormula);
    return tFormula
  }

  function handlePM(tFormula: string[]): string[] {
    tFormula = replaceAns(tFormula, 1);
    return tFormula;
  }

  function replaceAns(tFormula: string[], oIndex: number) {
    const ans: number = handleProcess(parseFloat(tFormula[oIndex - 1]), parseFloat(tFormula[oIndex + 1]), tFormula[oIndex]);
    console.log("Ans", ans)
    // add ans to replace the cal
    tFormula = tFormula.map((v, i) => { return i === oIndex ? ans.toString() : v });
    tFormula = tFormula.filter((v, i) => { return !(i === oIndex - 1 || i === oIndex + 1) });
    return tFormula;
  }

  function handleProcess(a: number, b: number, operator: string): number {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        console.log("ERROR")
        return 1234567890;
    }
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className='flex justify-center content-center'>
        <div key="bg" className='bg-slate-800 rounded p-4 flex flex-col'>
          <input type="text" className='rounded grow text-4xl text-end remove-arrow px-2 py-3' value={display} onChange={(e) => handleChange(e)} readOnly />
          <div className='grid grid-cols-4 grid-flow-row gap-2 my-4'>
            <CustomBtn label={display.length === 1 && parseFloat(display) === 0 ? "AC" : "C"} classes='' onClick={() => reset()} />
            <CustomBtn label="±" onClick={() => handlePositive()} />
            {/* <CustomBtn label="%" onClick={() => handlePercent(formula.length !== 0, parseFloat(formula.length !== 0 ? formula[0] : display))} /> */}
            <CustomBtn label="%" onClick={() => handlePercent()} />
            <CustomBtn label="÷" onClick={() => handleOperator("/")} />
            <CustomBtn label="7" onClick={() => updateDisplay("7")} />
            <CustomBtn label="8" onClick={() => updateDisplay("8")} />
            <CustomBtn label="9" onClick={() => updateDisplay("9")} />
            <CustomBtn label="×" onClick={() => handleOperator("*")} />
            <CustomBtn label="4" onClick={() => updateDisplay("4")} />
            <CustomBtn label="5" onClick={() => updateDisplay("5")} />
            <CustomBtn label="6" onClick={() => updateDisplay("6")} />
            <CustomBtn label="-" onClick={() => handleOperator("-")} />
            <CustomBtn label="1" onClick={() => updateDisplay("1")} />
            <CustomBtn label="2" onClick={() => updateDisplay("2")} />
            <CustomBtn label="3" onClick={() => updateDisplay("3")} />
            <CustomBtn label="+" onClick={() => handleOperator("+")} />
            <CustomBtn label="0" classes="col-span-2" onClick={() => updateDisplay("0")} />
            <CustomBtn label="." onClick={() => updateDisplay(".")} />
            <CustomBtn label="=" onClick={() => handleEqual()} />

          </div>

        </div>
      </div>


    </>
  )
}

export default App
