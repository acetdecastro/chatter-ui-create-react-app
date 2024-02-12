import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { useCreateMessage } from "../../../hooks/useCreateMessage";
import { useGetMessages } from "../../../hooks/useGetMessages";
import { useMessageCreated } from "../../../hooks/useMessageCreated";
import { Message } from "../../../gql/graphql";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [createMessage] = useCreateMessage(chatId);
  const { data: existingMessages } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { data: latestMessage } = useMessageCreated({ chatId });

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  // Populate messages state on mount
  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages.messages);
    }
  }, [existingMessages]);

  // Update messages state when latest message
  useEffect(() => {
    const existingLatestMessageId = messages[messages.length - 1]?._id;
    // Add latest message to the messages state
    if (
      latestMessage?.messageCreated &&
      latestMessage.messageCreated._id !== existingLatestMessageId
    ) {
      setMessages([...messages, latestMessage.messageCreated]);
    }
  }, [latestMessage, messages]);

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1 className="">{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {[...messages]
          .sort(
            (messageA, messageB) =>
              new Date(messageA.createdAt).getTime() -
              new Date(messageB.createdAt).getTime()
          )
          .map((message) => (
            <Grid
              container
              alignItems="center"
              marginBottom="1rem"
              key={message._id}
            >
              <Grid item xs={2} lg={1}>
                <Avatar src="" sx={{ width: 52, height: 52 }} />
              </Grid>
              <Grid item xs={10} lg={11}>
                <Stack>
                  <Paper sx={{ width: "fit-content" }}>
                    <Typography sx={{ padding: "0.9rem" }}>
                      {message.content}
                    </Typography>
                  </Paper>
                  <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ m: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
