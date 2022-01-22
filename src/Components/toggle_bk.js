import React from 'react';
import '../Css/App.css'
import { setTheme } from  '../Utils/themes'

export default class Togglebk extends React.Component {
    constructor(props) {
        super(props)
        this.state = { togClass: 'dark' }
    }
    
    
    // theme = localStorage.getItem('theme');


    setTogClass =() => {   
        this.setState(prevState => {                          
            return {
                togClass: prevState.togClass === 'dark' ? 'light': 'dark'
            }
        })
    }

    componentDidMount (){

        this.state.togClass = 'dark';
        setTheme('theme-dark');
        
   

    }

    componentDidUpdate(){
        

        if (this.state.togClass === 'light') {
            setTheme('theme-light');
            
        } else {
            setTheme('theme-dark');
            
        }    

    }


    render(){
        return (                    
            <div className="container--toggle">
                <input type="checkbox" className="checkbox" id="checkbox" onClick={this.setTogClass}/>
                <label htmlFor="checkbox" className="label">
                    {/* <i class="fa-moon"></i>
                    <i class='fa-sun'></i> */}
                    <div className='ball' />
                </label>
   
 
            </div>
        )}

}
