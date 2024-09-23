// src/Inbox.js
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const messagesData = [
  {
    id: 1,
    from: "Google",
    subject: "Get started with Google: Career Fair",
    body: `Hello,\n\nYou’re a near perfect fit for our organization! We are excited to invite you to an exclusive networking event with our team on October 15th.\n\n  Best Regards,\n  Sarah Johnson\n  Recruiter, Google\n  sarah.johnson@google.com\n  (555) 123-4567`,
  },
  {
    id: 2,
    from: "Microsoft",
    subject: "Career Opportunity",
    body: `Hi there,\n\nBased on your profile, we think you’d be a great match for our team! Join us for a virtual info session on September 28th to learn more about the opportunities we have.\n\n  Cheers,\n  Michael Lee\n  Talent Acquisition Specialist, Microsoft\n  michael.lee@microsoft.com\n  (555) 987-6543`,
  },
  {
    id: 3,
    from: "Amazon",
    subject: "Join Us for a Special Recruitment Event",
    body: `Dear Candidate,\n\nYou have the skills we’re looking for! We’d love for you to attend our upcoming recruitment event on October 5th. This is a great opportunity to meet our team and learn more about what we do.\n\n  Best,\n  Emily Chen\n  Recruiter, Amazon\n  emily.chen@amazon.com\n  (555) 555-0199`,
  },
  {
    id: 4,
    from: "Apple",
    subject: "Invitation to Innovation Day",
    body: `Hello,\n\nYou’re a great fit for our innovative culture! We invite you to our exclusive Innovation Day event on November 2nd. Join us to explore how you can contribute to our mission.\n\n  Warm Regards,\n  David Smith\n  Senior Recruiter, Apple\n  david.smith@apple.com\n  (555) 444-3322`,
  },
];

const InboxComponent = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <Box display="flex" height="100vh">
      <Box flex={1} borderRight={1} borderColor="divider" p={2}>
        <Typography variant="h6">Inbox</Typography>
        <List>
          {messagesData.map((message) => (
            <ListItem
              button
              key={message.id}
              onClick={() => handleSelectMessage(message)}
            >
              <ListItemText
                primary={message.subject}
                secondary={`From: ${message.from}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={2} p={2}>
        {selectedMessage ? (
          <>
            <Typography variant="h6">{selectedMessage.subject}</Typography>
            <Typography variant="subtitle1">
              From: {selectedMessage.from}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>{selectedMessage.body}</Typography>
          </>
        ) : (
          <Typography variant="body1">Select a message to read.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default InboxComponent;
