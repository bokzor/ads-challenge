import { ExceptionStepsPerStride, ExceptionFlightOfStairs, ExceptionNbFlightOfstairs } from "./exceptions";

export const calculNbOfSteps = (params : {flightOfStairs: number[],  stepsPerStride: number}): number => {
    const numberOfStepsToTurn = 2;

    validateInput(params);

    const reducer = (accumulator: number, flightOfStairs: number) => {
        return accumulator +  Math.ceil(flightOfStairs/params.stepsPerStride)
    }

    const stepToTurn = (params.flightOfStairs.length - 1) * numberOfStepsToTurn;
    const total = params.flightOfStairs.reduce(reducer, 0) + stepToTurn
    return total;
}

export const validateInput = (params : {flightOfStairs: number[],  stepsPerStride: number}) => {
    if(!params.stepsPerStride || (params.stepsPerStride < 2 || params.stepsPerStride > 5)) {
        // we assume it's a int
        throw new ExceptionStepsPerStride("StepsPerStride is not in the range")
    }

    if(!params.flightOfStairs || params.flightOfStairs.length < 1 || params.flightOfStairs.length > 50) {
        throw new ExceptionNbFlightOfstairs("The number of flight of stairs is not in range");
    }
    
    params.flightOfStairs.forEach((element, index) => {
        if(!isNumber(element) || element < 5 || element > 30 ) {
            throw new ExceptionFlightOfStairs(`The step ${index} is not in the range`)
        }
    });
}


25

const isNumber = (value: string | number): boolean =>
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}