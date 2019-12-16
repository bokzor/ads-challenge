import { calculNbOfSteps, validateInput } from './calculNbSteps'
import { ExceptionStepsPerStride, ExceptionFlightOfStairs, ExceptionNbFlightOfstairs } from './exceptions';


describe('Should validate boundaries', () => {
    test('StepsPerStride should not be lower than 2', () => {
        expect(() => validateInput({flightOfStairs: [15,15], stepsPerStride:0})).toThrowError(ExceptionStepsPerStride);
    })

    test('StepsPerStride should not be bigger than 5', () => {
        expect(() => validateInput({flightOfStairs: [15,15], stepsPerStride:6})).toThrowError(ExceptionStepsPerStride);
    })

    test('FlightOfStairs should not be lower than 5', () => {
        expect(() => validateInput({flightOfStairs: [15,4], stepsPerStride:5})).toThrowError(ExceptionFlightOfStairs);
    })

    test('FlightOfStairs should not be bigger than 30', () => {
        expect(() => validateInput({flightOfStairs: [15, 31], stepsPerStride:5})).toThrowError(ExceptionFlightOfStairs);
    })
    
    test('Nb of FlightOfStairs should not be bigger than 50', () => {
        expect(() => validateInput({flightOfStairs: Array(51).fill(5), stepsPerStride:5})).toThrowError(ExceptionNbFlightOfstairs);
    })

    test('Nb of FlightOfStairs should not be lower than 1', () => {
        expect(() => validateInput({flightOfStairs: Array(0), stepsPerStride:5})).toThrowError(ExceptionNbFlightOfstairs);
    })

});

describe('Should validate output', () => {
    test('Test 2 : should validate the output', () => {
        expect(calculNbOfSteps({flightOfStairs: [15,15], stepsPerStride: 2})).toBe(18);
    })

    test('Test 2 : should validate the output', () => {
        expect(calculNbOfSteps({flightOfStairs: [15,15], stepsPerStride: 2})).toBe(18);
    })

    test('Test 3 : should validate the output', () => {
        expect(calculNbOfSteps({flightOfStairs: [5,11,9,13,8,30,14], stepsPerStride: 3})).toBe(44);
    })
});