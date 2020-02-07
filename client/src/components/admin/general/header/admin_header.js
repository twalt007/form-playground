import React from 'react';
import './admin_header.scss'
import logo from '../../../../assets/images/temp_header.jpg';
import ColoredLine from './coloredLine';
import { BrandingColor } from '../helpers';

const AdminHeader = props => {
    return (
        <div className="admin-header-container">
            <div className='image-container'>
                <img className="logo" src={logo} alt='Dappled Logo'/>
            </div>
            <ColoredLine color = {BrandingColor} />
            <ColoredLine color = {BrandingColor} />
        </div>
    )
}

export default AdminHeader