import { ChangeEvent, useState } from 'react'
import './App.css'
import CustomBtn from "./components/customBtn.tsx"

function App() {

  const [display, setDisplay] = useState<string>("12");
  // const [operator, setOperator] = useState<string>();
  const [formula, setFormula] = useState<string[]>([]);
  const [justOped, setJustOped] = useState<boolean>(false);

  function updateDisplay(input: string) {
    setDisplay(justOped ? input : [display.split(","), input].join(""))
    setJustOped(false);
    console.log("Display", display, input);
  }
  function reset() {
    setDisplay("");
    if (!justOped) {
      setFormula([]);
      setJustOped(false);
    }

  }

  function handleOperator(operator: string) {
    // if (oped) {
    //   formula?.pop();
    // }
    // setOped(true);
    // setFormula([parseFloat(display).toString(), operator]);
    setJustOped(true);
    if (formula.length > 2) {
      setFormula([parseFloat(display).toString(), operator, formula[2]]);
    } else {
      setFormula([parseFloat(display).toString(), operator]);
    }
  }

  function handleChnage(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement
    setDisplay(value);
    console.log("EVENT", value);
  }

  function handlePercent(formed: boolean, source: number) {
    // const formed: boolean = 
    console.log("SSSS", formed, formula, display, source);
    const cal: number = (formed && (formula[1] === "-" || formula[1] === "+")) ? source * (source / 100) : source / 100;
    setDisplay(cal.toString())
    // const tempFormula = formula.map((data, i) => { return i === 0 ? cal.toString() : data });
    setFormula([...formula, cal.toString()]);
  }

  function handleEqual(): void {
    const ans: string = (Math.round(handleProcess() * 100) / 100).toString();
    setDisplay(ans);
    const tempFormula = formula.map((data, i) => { return i === 0 ? ans : data });
    setFormula([...tempFormula]);

  }
  function handleProcess(): number {
    const a: number = parseFloat(formula[0]);
    const b: number = parseFloat(justOped ? formula[2] : display);
    switch (formula[1]) {
      case "+":
        return a + b;

      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 12345678;
    }
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className='flex justify-center content-center'>
        <div key="bg" className='bg-slate-800 rounded p-4 flex flex-col'>
          <input type="text" className='rounded grow text-4xl text-end remove-arrow px-2 py-3' value={display} onChange={(e) => handleChnage(e)} readOnly />
          <div className='grid grid-cols-4 grid-flow-row gap-2 my-4'>
            <CustomBtn label={display.length < 1 ? "AC" : "C"} classes='' onClick={() => reset()} />
            <CustomBtn label="±" onClick={() => console.log("Clicked")} />
            <CustomBtn label="%" onClick={() => handlePercent(formula.length !== 0, parseFloat(formula.length !== 0 ? formula[0] : display))} />
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
