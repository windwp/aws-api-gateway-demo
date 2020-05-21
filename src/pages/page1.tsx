import React, { useEffect, useState } from "react";
import WsStatus from "../components/WsStatus";
import { Button } from "@material-ui/core";
import ws from "../services/ws-service";
const Page1: React.FC = () => {
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
  const callApi1 = () => {
    ws.sendMessage("api1", {
      message: "api1",
    });
  };

  const callGh = () => {
    ws.sendMessage("git", {
      message: "git",
    });
  };
  return (
    <>
      <WsStatus />
      <div>
        <h4>Page 1</h4>
        <Button onClick={callApi1} variant="contained" color="primary">
          Call Api
        </Button>

        <Button onClick={callGh} variant="contained" color="primary">
          Call git hub Api by gatewate
        </Button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default Page1;

