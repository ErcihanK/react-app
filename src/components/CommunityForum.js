import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import './CommunityForum.css';

const CommunityForum = () => {
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [showThreadForm, setShowThreadForm] = useState(false);
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('https://nodejs-czjr-production.up.railway.app/threads');
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  const handlePostThread = async () => {
    if (newThreadTitle.trim() === '' || newThreadMessage.trim() === '') return;

    try {
      const response = await fetch('https://nodejs-czjr-production.up.railway.app/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user?.username || 'Anonymous',
          title: newThreadTitle,
          message: newThreadMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setThreads([...threads, data]);
        setNewThreadTitle('');
        setNewThreadMessage('');
        setShowThreadForm(false);
      } else {
        console.error('Failed to submit thread');
      }
    } catch (error) {
      console.error('Error submitting thread:', error);
    }
  };

  const handleThreadClick = (id) => {
    navigate(`/threads/${id}`);
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom className="forum-title">
        Community Forum
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setShowThreadForm(!showThreadForm)}>
        {showThreadForm ? 'Cancel' : 'Create a Thread'}
      </Button>
      {showThreadForm && (
        <Paper elevation={3} sx={{ padding: '16px', backgroundColor: '#f5f5f5', marginTop: '16px' }}>
          <TextField
            label="Thread Title"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            value={newThreadMessage}
            onChange={(e) => setNewThreadMessage(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostThread}
            sx={{ marginTop: '16px' }}
          >
            Post Thread
          </Button>
        </Paper>
      )}
      <Divider sx={{ marginY: '16px' }} />
      <List className="forum-list">
        {threads.map((thread, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleThreadClick(thread.id)} className="forum-list-item">
              <ListItemText
                primary={<span className="thread-title">{thread.title}</span>}
                secondary={
                  <>
                    <span>by {thread.userName}</span>
                    <span> - {new Date(thread.timestamp).toLocaleString()}</span>
                  </>
                }
              />
            </ListItem>
            {index < threads.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CommunityForum;
