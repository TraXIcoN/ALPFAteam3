// src/Inbox.js
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const messagesData = [
    {
      id: 1,
      from: 'Google',
      subject: 'Exclusive Event Invitation',
      body: `Hello,\n\nYou’re a near perfect fit for our organization! We are excited to invite you to an exclusive networking event with our team on October 15th.\n\n  Best Regards,\n  Sarah Johnson\n  Recruiter, Google\n  sarah.johnson@google.com\n  (555) 123-4567`,
    },
    {
      id: 2,
      from: 'Microsoft',
      subject: 'Career Opportunity',
      body: `Hi there,\n\nBased on your profile, we think you’d be a great match for our team! Join us for a virtual info session on September 28th to learn more about the opportunities we have.\n\n  Cheers,\n  Michael Lee\n  Talent Acquisition Specialist, Microsoft\n  michael.lee@microsoft.com\n  (555) 987-6543`,
    },
    {
      id: 3,
      from: 'Amazon',
      subject: 'Join Us for a Special Recruitment Event',
      body: `Dear Candidate,\n\nYou have the skills we’re looking for! We’d love for you to attend our upcoming recruitment event on October 5th. This is a great opportunity to meet our team and learn more about what we do.\n\n  Best,\n  Emily Chen\n  Recruiter, Amazon\n  emily.chen@amazon.com\n  (555) 555-0199`,
    },
    {
      id: 4,
      from: 'Apple',
      subject: 'Invitation to Innovation Day',
      body: `Hello,\n\nYou’re a great fit for our innovative culture! We invite you to our exclusive Innovation Day event on November 2nd. Join us to explore how you can contribute to our mission.\n\n  Warm Regards,\n  David Smith\n  Senior Recruiter, Apple\n  david.smith@apple.com\n  (555) 444-3322`,
    },
    {
      id: 5,
      from: 'Facebook',
      subject: 'Exclusive Career Fair',
      body: `Hi,\n\nWe believe you could thrive at Facebook! Join us for an exclusive career fair tailored for top candidates on October 20th. This is a chance to meet our hiring managers and learn about exciting opportunities.\n\n  Sincerely,\n  Jessica Brown\n  Recruitment Manager, Facebook\n  jessica.brown@facebook.com\n  (555) 111-2233`,
    },
    {
      id: 6,
      from: 'IBM',
      subject: 'Special Invitation to Meet Our Team',
      body: `Dear [Your Name],\n\nYour profile caught our attention! We invite you to a special meet-and-greet event with our team on September 30th. This is an excellent opportunity to network and learn about our projects.\n\n  Regards,\n  Thomas Green\n  Lead Recruiter, IBM\n  thomas.green@ibm.com\n  (555) 333-4455`,
    },
    {
      id: 7,
      from: 'Salesforce',
      subject: 'You’re Invited!',
      body: `Hello,\n\nYou’re a near perfect fit for Salesforce! Join us for a special recruitment event on October 10th to learn more about our culture and the roles we are looking to fill.\n\n  Best,\n  Laura White\n  Recruiting Specialist, Salesforce\n  laura.white@salesforce.com\n  (555) 222-6677`,
    },
    {
      id: 8,
      from: 'Adobe',
      subject: 'Invitation to Creative Connect',
      body: `Hi,\n\nWe think you’d be an amazing addition to our team! Join us at Creative Connect on November 1st to explore opportunities with Adobe.\n\n  Best Regards,\n  Oliver King\n  Talent Acquisition Partner, Adobe\n  oliver.king@adobe.com\n  (555) 888-7766`,
    },
    {
      id: 9,
      from: 'LinkedIn',
      subject: 'Exclusive Networking Event',
      body: `Dear [Your Name],\n\nYou’re a strong candidate for our organization! We invite you to an exclusive networking event on October 12th where you can meet our team and learn more about our mission.\n\n  Warm Regards,\n  Sophia Lewis\n  Recruitment Consultant, LinkedIn\n  sophia.lewis@linkedin.com\n  (555) 999-8888`,
    },
    {
      id: 10,
      from: 'Tesla',
      subject: 'Join Us for a Recruitment Session',
      body: `Hello,\n\nWe see great potential in you! Join us for an exclusive recruitment session with our team at Tesla on October 25th. This is a fantastic chance to discuss your future with us.\n\n  Best,\n  James Wright\n  Senior Recruiter, Tesla\n  james.wright@tesla.com\n  (555) 777-5544`,
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
              <ListItem button key={message.id} onClick={() => handleSelectMessage(message)}>
                <ListItemText primary={message.subject} secondary={`From: ${message.from}`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex={2} p={2}>
          {selectedMessage ? (
            <>
              <Typography variant="h6">{selectedMessage.subject}</Typography>
              <Typography variant="subtitle1">From: {selectedMessage.from}</Typography>
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
