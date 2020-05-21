import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

const WsStatus: React.FC = () => {
  const status = useSelector((state:RootState)=>state.ws.status)
  const errorMessage = useSelector((state:RootState)=>state.ws.errorMessage)
  return (
    <>
    <div className="m-y-10">
      {status}
    </div>
    {errorMessage &&
      <div> {errorMessage} </div>
    }
    </>
  );
}

export default WsStatus;