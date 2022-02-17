/* toggle_bk.js - toggle light/dark theme
Edited by Libo Sun, Jan 2022 
Auburn University */

import React from 'react';
import '../Css/App.css'
import { setTheme} from  '../Utils/themes'

export default class Togglebk extends React.Component {
    constructor(props) {
        super(props)
        let themeload = localStorage.getItem('theme')
        this.state = { 
            theme: themeload ? themeload: "theme-dark" ,
            checked: themeload==="theme-light"? true: false
        }
    }

    setTogClass =() => {   
        this.setState(prevState => {                          
            return {
                theme: prevState.theme === 'theme-dark' ? 'theme-light': 'theme-dark',
                checked: prevState.checked === false? true: false
            }
        })
    }

    componentDidMount (){

        if (localStorage.getItem('theme')){
            this.setState(()=> {                          
                return {
                    theme: localStorage.getItem('theme')
                }
            })

        }
        else{
            this.setState( ()=> {                          
                return {
                    theme: "theme-dark"
                }
            })
        }

        setTheme(this.state.theme); 

    }

    componentDidUpdate(){
        setTheme(this.state.theme )   

    }


    render(){
        return (                    
            <div className="container-toggle">
                <input type="checkbox" className="checkbox" id="checkbox" checked={this.state.checked} onClick={this.setTogClass} readOnly/>
                <label htmlFor="checkbox" className="label">
                    <div className='ball' />
                </label>
   
 
            </div>
        )}

}
