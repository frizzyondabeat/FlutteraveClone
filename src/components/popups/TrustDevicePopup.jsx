import React from 'react';
import useAuth from '../../hooks/useAuth';

const TrustDevicePopup = ({ onClose }) => {

    const {setPersistedAuth} = useAuth()

    const handleTrustDevice = () => {
        setPersistedAuth(true)
        onClose()
    }

    const handleCancel = () => {
        setPersistedAuth(false)
        onClose()
    }

    return (
        <div className="">
            
        </div>
    );
};

export default TrustDevicePopup;