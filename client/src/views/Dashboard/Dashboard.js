import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import API_URL from "config";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    setInterval(() => {
      getAllPendingRequests()
    },5000)
  },[]);

  const approveRequest = async (requestId) => {
    let result = await axios.post(`${API_URL}/admin/updatestatus`, {requestId, action: "approved"});
    if(result.data.ok){
      getAllPendingRequests()
    }
  }

  const rejectRequest = async (requestId) => {
    let result = await axios.post(`${API_URL}/admin/updatestatus`, {requestId, action: "rejected"});
    if(result.data.ok){
      getAllPendingRequests()
    }
  }

  const getAllPendingRequests = async () => {
    let requests = await axios.get(`${API_URL}/admin/getAllPendingRequests`);
    let resArr = [];
    for(let i = 0; i < requests.data.requests.length; i++){
      requests.data.requests[i] = {...requests.data.requests[i], action: <div>
        <Button color="primary" onClick={() => approveRequest(requests.data.requests[i].requestId)}>Accept</Button>
        <Button color="warning" onClick={() => rejectRequest(requests.data.requests[i].requestId)}>Reject</Button>
      </div>}
      resArr.push(Object.values(requests.data.requests[i]))
    }
    if(!arrayEquals(resArr, requests)){
      setRequests(resArr);
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Login Requests</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Full Name", "Company", "RequestId", "Action"]}
                tableData={
                  requests ? requests : []}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}