import React from 'react'
import { render, fireEvent, screen, getByDisplayValue } from '@testing-library/react'
import Calculator, { Display } from "./Calculator";
const each = require("jest-each").default;

test('Given calculator have display text "0" contain id= "zero"',()=>{
    //given
    render(<Calculator/>);
    expect(document.getElementById("zero").value).toBe("0");
})
test('Given calculator have id="display" shows output 0 onload',()=>{
    //given
    render(<Calculator/>);
    expect(screen.getByTestId("display").value).toEqual("0");
})
test('Given expression "9 + 4 ="  Then display is 13',()=>{
    //given
    render(<Calculator />)
    //when
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('='));
    //then
    expect(screen.getByTestId("display").value).toEqual(`13`);
})
test('Given expresion is "2/7" Then otput shows with at least 4 decimal places of precision',()=>{
//given
render(<Calculator />)
//when
fireEvent.click(screen.getByText('2'));
fireEvent.click(screen.getByTestId('divide'));
fireEvent.click(screen.getByText('7'));
fireEvent.click(screen.getByText('='));
//then
expect((/0?\.2857\d*/).test(screen.getByTestId("display").value)).toBe(true);

});
test('Given expression is "5-2=/2=" Then display is "1.5"',()=>{
    //given
    render(<Calculator/>);
    //when
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByTestId('divide'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByTestId("display").value).toBe('1.5');

});
test('When press clear button Then display is 0',()=>{
    //given
    render(<Calculator/>);
    //when
    fireEvent.click(screen.getByText('AC'));
    expect(screen.getByTestId("display").value).toBe("0");
});
test('Given  input values Then value shown in id= "display"',()=>{
    render(<Calculator/>);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    expect(screen.getByTestId("display").value).toBe("123");
});
test('Given the expression "3+5*6-2/4" When  hit on "=" Then display is "32.5 || 11.5"',()=>{
    //given
    render(<Calculator />);
    //when
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("x"));
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByTestId('divide'));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("="));
    //then
    expect(screen.getByTestId("display").value).toBe(`32.5` || `11.5`)
});
test('Given the expression "000" Then  displayed is "0"',()=>{
    //given
    render(<Calculator />);
    //when
    fireEvent.click(document.getElementById('zero'));
    fireEvent.click(document.getElementById('zero'));
    fireEvent.click(document.getElementById('zero'));
    fireEvent.click(document.getElementById('one'));
    //then
    expect(screen.getByTestId("display").value).toBe('1');
})
test('Given two decimals in a number ". .",Only diplay one "." ',()=>{
    render(<Calculator />)
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('0'));
    expect(screen.getByTestId("display").value).toBe('5.0')
})
describe("isDisplayed numbers with following Id", () => {
    each([
        ["1","one"],
        ["2","two"],
        ["3","three"],
        ["4","four"],
        ["5","five"],
        ["6","six"],
        ["7","seven"],
        ["8","eight"],
        ["9","nine"],
        ["x","multiply"],
        ["÷","divide"],
        ["+","add"],
        ["-","subtract"],["=","equals"],["AC","clear"],[".","decimal"]
    ]).it("When the display is '%s' contain id='%s'", (text, expected) => {
        render(<Calculator />)
        expect(screen.getByText(text)).toEqual(document.getElementById(expected));})
});
describe('Decimal number airthmetic operation "+ - * /"',()=>{
    beforeEach(() => render(<Calculator/>));
    test('Given "10.5 - 5.5" Then output is "5"',()=>{
            fireEvent.click(screen.getByText("1"));
            fireEvent.click(screen.getByText("0"));
            fireEvent.click(screen.getByText('.'));
            fireEvent.click(screen.getByText('5'));
            fireEvent.click(screen.getByText('-'));
            fireEvent.click(screen.getByText('5'));
            fireEvent.click(screen.getByText('.'));
            fireEvent.click(screen.getByText("5"));
            fireEvent.click(screen.getByText('='));
            expect(screen.getByTestId("display").value).toBe("5")
    }),
    test('Given "5 * 5.5" Then output is "27.5"',()=>{      
                fireEvent.click(screen.getByText("5"));
                fireEvent.click(screen.getByText('x'));
                fireEvent.click(screen.getByText('5'));
                fireEvent.click(screen.getByText('.'));
                fireEvent.click(screen.getByText("5"));
                fireEvent.click(screen.getByText('='));
                expect(screen.getByTestId("display").value).toBe("27.5") 
    }),
    test('Given "10.5 + 5.5" Then output is "4"',()=>{        
                fireEvent.click(screen.getByText("1"));
                fireEvent.click(screen.getByText("0"));
                fireEvent.click(screen.getByText('.'));
                fireEvent.click(screen.getByText('5'));
                fireEvent.click(screen.getByText('+'));
                fireEvent.click(screen.getByText('5'));
                fireEvent.click(screen.getByText('.'));
                fireEvent.click(screen.getByText("5"));
                fireEvent.click(screen.getByText('='));
                expect(screen.getByTestId("display").value).toBe("16") 
    }),
    test('Given "10 / 2.5" Then output is "4"',()=>{        
                fireEvent.click(screen.getByText("1"));
                fireEvent.click(screen.getByText("0"));
                fireEvent.click(screen.getByTestId('divide'));
                fireEvent.click(screen.getByText('2'));
                fireEvent.click(screen.getByText('.'));
                fireEvent.click(screen.getByText('5'));
                fireEvent.click(screen.getByText('='));
                expect(screen.getByTestId("display").value).toBe("4") 
    })
});
describe('When Two consecutively oprators Then perform last oprator (excluding the (-)sign)',()=>{
    beforeEach(()=> render(<Calculator/>));
    test('Given "5 * - 5" Then output value= "-25"',()=>{
        fireEvent.click(screen.getByText("5"));
        fireEvent.click(screen.getByText("x"));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('='));
        expect(screen.getByTestId("display").value).toBe("-25")
    }),
    test('Given "5 * - + 5" Then output value= "10"',()=>{
        fireEvent.click(screen.getByText("5"));
        fireEvent.click(screen.getByText("x"));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('='));
        expect(screen.getByTestId("display").value).toBe("10")
    }),
    test('Given "5 + + 5" Then output value= "10"',()=>{
        fireEvent.click(screen.getByText("5"));
        fireEvent.click(screen.getByText("x"));
        fireEvent.click(screen.getByText('-'));
        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('='));
        expect(screen.getByTestId("display").value).toBe("10")
    })
})

