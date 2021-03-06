import React from 'react';
import logo from '../../../../assets/images/logo.png';
import ColoredLine from '../../../general/coloredLine';
import { BrandingColor } from '../../../general/helpers';
import './adminHeader.scss'

const AdminHeader = props => {
    const {mainHistory} = props;
    const reroute = () =>{
        mainHistory.push('/');
    }
    return (
        <div className="header-container">
            <div className='center'>
                <img className="logo" src={logo} alt='Dappled Logo' onClick={reroute}/>
            </div>
            <ColoredLine color = {BrandingColor} />
            <ColoredLine color = {BrandingColor} />
        </div>
    )
}

export default AdminHeader