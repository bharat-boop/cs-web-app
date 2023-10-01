import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getQueries } from "../axios/axios";
import Alert from "@mui/material/Alert";
import Query from "../components/Query";

const Agent = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  async function getQueriesData() {
    const data = await getQueries();
    if (data.status === "not ok") {
      setError(true);
    } else {
      setQueries(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    getQueriesData();
  }, []);
  console.log(queries);
  if (error) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return <Alert severity="error">You are not logged in</Alert>;
  }
  return (
    <>
      {loading ? (
        <Box
          display={"flex"}
          height={"97vh"}
          width={"97vw"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box marginTop={4} p={6}>
          <Stack spacing={4}>
            {queries.map((query) => {
              return (
                <Query
                  date={query.date}
                  message={query.message}
                  key={query._id}
                  messageId={query.messageId}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Agent;
