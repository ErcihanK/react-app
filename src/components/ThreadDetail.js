import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, Reply } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Navbar from './Navbar';
import './ThreadDetail.css';

const ThreadDetail = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`https://nodejs-czjr-production.up.railway.app/threads/${id}`);
        const data = await response.json();
        setThread(data);
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
    };

    fetchThread();
  }, [id]);

  const handlePostReply = async (parentId) => {
    const replyMessage = replyInputs[parentId] || '';

    if (replyMessage.trim() === '') return;

    try {
      const response = await fetch(`https://nodejs-czjr-production.up.railway.app/threads/${id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user?.username || 'Anonymous',
          message: replyMessage,
          replyTo: parentId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedReplies = thread.replies.map(reply => ({ ...reply }));

        if (parentId) {
          const addReplyToParent = (replies) => {
            for (let reply of replies) {
              if (reply.id === parentId) {
                reply.children = reply.children || [];
                reply.children.push(data);
                return;
              }
              if (reply.children) {
                addReplyToParent(reply.children);
              }
            }
          };
          addReplyToParent(updatedReplies);
        } else {
          updatedReplies.push(data);
        }
        setThread({ ...thread, replies: updatedReplies });
        setNewReply('');
        setReplyTo(null);
        setReplyInputs({});
      } else {
        const errorText = await response.text();
        console.error('Failed to submit reply:', errorText);
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleLike = async (replyId) => {
    try {
      const response = await fetch(`https://nodejs-czjr-production.up.railway.app/threads/${id}/replies/${replyId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: user?.username || 'Anonymous' }),
      });

      if (response.ok) {
        const updatedReply = await response.json();
        setThread({
          ...thread,
          replies: thread.replies.map(reply => reply.id === replyId ? updatedReply : reply),
        });
      } else {
        console.error('Failed to like reply');
      }
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const handleDislike = async (replyId) => {
    try {
      const response = await fetch(`https://nodejs-czjr-production.up.railway.app/threads/${id}/replies/${replyId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: user?.username || 'Anonymous' }),
      });

      if (response.ok) {
        const updatedReply = await response.json();
        setThread({
          ...thread,
          replies: thread.replies.map(reply => reply.id === replyId ? updatedReply : reply),
        });
      } else {
        console.error('Failed to dislike reply');
      }
    } catch (error) {
      console.error('Error disliking reply:', error);
    }
  };

  const renderReplies = (replies) => {
    return replies.map(reply => (
      <React.Fragment key={reply.id}>
        <ListItem className="reply-item" style={{ marginLeft: reply.replyTo ? 20 : 0 }}>
          <ListItemText
            primary={
              <>
                <span className="reply-message">{reply.message}</span>
                <div className="reply-actions">
                  <IconButton onClick={() => handleLike(reply.id)} size="small">
                    <ThumbUp fontSize="small" />
                  </IconButton>
                  {reply.likes}
                  <IconButton onClick={() => handleDislike(reply.id)} size="small">
                    <ThumbDown fontSize="small" />
                  </IconButton>
                  {reply.dislikes}
                  <IconButton onClick={() => setReplyTo(reply.id)} size="small">
                    <Reply fontSize="small" />
                  </IconButton>
                </div>
              </>
            }
            secondary={
              <>
                <span className="reply-user">{reply.userName}</span>
                {' - '}
                <span className="reply-timestamp">{new Date(reply.timestamp).toLocaleString()}</span>
              </>
            }
          />
          {reply.id === replyTo && (
            <Box sx={{ mt: 2, ml: 4 }}>
              <TextField
                className="reply-textarea"
                label="Reply"
                multiline
                rows={2}
                value={replyInputs[reply.id] || ''}
                onChange={(e) => setReplyInputs({ ...replyInputs, [reply.id]: e.target.value })}
                fullWidth
                variant="outlined"
              />
              <Button
                className="reply-button"
                variant="contained"
                color="primary"
                onClick={() => handlePostReply(reply.id)}
                sx={{ mt: 1 }}
              >
                Post Reply
              </Button>
            </Box>
          )}
        </ListItem>
        {reply.children && renderReplies(reply.children)}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {thread && (
          <>
            <Typography className="thread-title" variant="h4" gutterBottom>
              {thread.title}
            </Typography>
            <Typography className="thread-message" variant="body1" gutterBottom>
              {thread.userName}: {thread.message}
            </Typography>
            <Divider sx={{ marginY: '16px' }} />
            <TextField
              className="reply-textarea"
              label="Reply"
              multiline
              rows={4}
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              className="reply-button"
              variant="contained"
              color="primary"
              onClick={() => handlePostReply(null)}
              sx={{ marginTop: '16px' }}
            >
              Post Reply
            </Button>
            <Divider sx={{ marginY: '16px' }} />
            <List className="reply-list">
              {renderReplies(thread.replies)}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ThreadDetail;
