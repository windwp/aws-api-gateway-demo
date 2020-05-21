import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WsStatus from "../components/WsStatus";
import ws from "../services/ws-service";

const Page2: React.FC = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const ref = ws.addMessageListener((data) => {
      console.log("data", data); // eslint-disable-line no-console
      setMessage(JSON.stringify(data));
    });
    return () => {
      ws.removeMessageListenere(ref);
    };
  }, []);
  const callApi2 = () => {
    ws.sendMessage("api2", {
      message: "api2",
    });
  };
  return (
    <>
      <WsStatus />
      <h4>Page 1</h4>
      <Button onClick={callApi2} variant="contained" color="primary">
        Call Api2
      </Button>
      <pre>{message}</pre>
    </>
  );
};

export default Page2;
