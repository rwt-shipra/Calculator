
import React from 'react';
import calCss from "../Calculator/Calculator.module.scss";
export default class Display extends React.Component{
   
    render(){
        return(
            <input  className={calCss.display} id="display" autoFocus={true} data-testid="display"  value={this.props.view} readOnly/>
        )
    }
}
