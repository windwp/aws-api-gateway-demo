import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import WsStatus from "../components/WsStatus";
import { connect, disconnect } from "../store/ws-store";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const wsconnect = () => {
    console.log("home connect");
    dispatch(connect());
  };
  const closeWs = () => {
    dispatch(disconnect());
  };
  return (
    <div className="">
      <WsStatus />
      <div>
        <Button onClick={wsconnect} variant="contained">
          Connect
        </Button>
      </div>
      <div>
        <Button onClick={closeWs} variant="contained">
          disconnect
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
