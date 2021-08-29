import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import loading from "assets/img/loading.gif"
import axios from "axios";
import API_URL from "config";

export const Waiting = (props) => {
    const history = useHistory();
    useEffect(() => {
        props.location.state.requestId
        let interval = setInterval(async () => {
            let result = await axios.get(`${API_URL}/client/loginstatus?requestId=${props.location.state.requestId}`);
            if(result.data.login){
                sessionStorage.setItem("token",result.data.sessiontoken)
                clearInterval(interval);
                history.push('/client/user')
            } else if (result.data.status === "rejected") {
                clearInterval(interval);
                history.push('/login')
            }
        }, 5000)
    },[])
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h2>Please wait while your login request is approved.....</h2>
            <img src={loading} alt="..." />
        </div>
    )
}

Waiting.propTypes = {
    location: PropTypes.any
};

export default Waiting;
