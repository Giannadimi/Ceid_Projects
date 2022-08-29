import React from 'react';
import './AdminDashboard.css';

class AdminDashboard extends React.Component {
    constructor(props){
       super(props);

       this.state={

       }
    }
    //----------------------------------------------------
    componentDidMount(){
       console.log("<===[compentDidMount][AdminDashboard]==>")
    }
    //----------------------------------------------------
    componentDidUpdate(previousProps,previousState){
       console.log("<===[componentDidUpdate][AdminDashboard]==>")

    }
    //----------------------------------------------------
   render(){
       return (
        <div className="admin-dashboard">
        hi AdminDashboard</div>
       );
   }
 }

 export default AdminDashboard;