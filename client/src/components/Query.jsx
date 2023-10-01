import { Box, Button, Input } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { sendResponse } from "../axios/axios";

const Query = ({ date, message, messageId }) => {
  const d = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [reply, setReply] = useState("");
  const dat = d.toLocaleDateString(undefined, options);
  const handleSendResponse = async () => {
    const data = await sendResponse(reply, messageId);
    console.log(data)
    if(data.response_status === "responded"){
      window.location.reload();
    }
  };
  return (
    <Box
      padding={4}
      border={"1px solid black"}
      borderRadius={5}
      borderColor={"greenyellow"}
    >
      <Box fontSize={"1.45rem"}> {message} </Box>
      <Box>{dat}</Box>
      <Box marginTop={2} />
      <Input
        placeholder="Reply"
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
        }}
        fullWidth
      />
      <Box marginTop={2} />
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          handleSendResponse();
        }}
        fullWidth
      >
        Send
      </Button>
    </Box>
  );
};

Query.propTypes = {
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
};

export default Query;
