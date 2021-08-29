import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import API_URL from "config";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [formType, setFormType] = useState('Admin');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const history = useHistory();

  const login = async () => {
    setError(false);
    if(formType === 'Admin'){
        try{
            let result = await axios.post(`${API_URL}/admin/login`, formData);
            if(result.status === 200){
                history.push('/admin/dashboard')
            }
        } catch(e) {
            setError(true)
        }
    } else {
        try{
            let result = await axios.post(`${API_URL}/client/loginrequest`, formData);
            if(result.data.requestId){
                history.push({
                    pathname: '/waiting',
                    state: {requestId: result.data.requestId}
                })
            }
        } catch(e) {
            console.log(e);
        }
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Button color="primary" disabled={formType === 'Admin'} onClick={() => setFormType('Admin')}>Login As Admin</Button>
                    <Button color="primary" disabled={formType !== 'Admin'} onClick={() => setFormType('Client')}>Login As Client</Button>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {formType === 'Admin' ? <CustomInput
                    inputProps={{
                        onChange : (e) => setFormData({...formData, "username": e.target.value})
                    }}
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  /> : <CustomInput
                    inputProps={{
                        onChange : (e) => setFormData({...formData, "fullname": e.target.value})
                    }}
                    labelText="Full Name"
                    id="fullname"
                    formControlProps={{
                        fullWidth: true,
                    }}
                  />}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {formType === 'Admin' ? <CustomInput
                    inputProps={{
                        onChange : (e) => setFormData({...formData, "password": e.target.value}),
                        type: "password"
                    }}
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                  /> : <CustomInput
                    inputProps={{
                        onChange : (e) => setFormData({...formData, "company": e.target.value})
                    }}
                    labelText="Company Name"
                    id="company"
                    formControlProps={{
                        fullWidth: true,
                    }}
                  />}
                </GridItem>
              </GridContainer>
            </CardBody>
            {error ? <div style={{marginLeft: '6%', color: 'red'}}>
                Invalid Username/Password
            </div> : null}
            <CardFooter>
              <Button color="primary" onClick={() => login()}>Login</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
