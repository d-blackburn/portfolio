import React from 'react';
import { LabelTag } from './LabelTag.tsx';
import { Stack, Typography, Box } from '@mui/joy';

// This is a test component to demonstrate the Label component with various props
export default function LabelTest() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography level="h2" sx={{ mb: 2 }}>Label Component Test</Typography>
      
      <Typography level="title-md" sx={{ mt: 3, mb: 1 }}>Basic Labels (different colors)</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <LabelTag label="Default" />
        <LabelTag label="Primary" color="primary" />
        <LabelTag label="Neutral" color="neutral" />
        <LabelTag label="Danger" color="danger" />
        <LabelTag label="Success" color="success" />
        <LabelTag label="Warning" color="warning" />
        <LabelTag label="Info" color="info" />
      </Stack>
      
      <Typography level="title-md" sx={{ mt: 3, mb: 1 }}>Different Variants</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <LabelTag label="Soft" variant="soft" />
        <LabelTag label="Solid" variant="solid" />
        <LabelTag label="Outlined" variant="outlined" />
        <LabelTag label="Plain" variant="plain" />
      </Stack>
      
      <Typography level="title-md" sx={{ mt: 3, mb: 1 }}>With Type</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <LabelTag label="React" type="Framework" />
        <LabelTag label="TypeScript" type="Language" color="info" />
        <LabelTag label="Critical" type="Priority" color="danger" variant="solid" />
        <LabelTag label="In Progress" type="Status" color="warning" variant="outlined" />
      </Stack>
      
      <Typography level="title-md" sx={{ mt: 3, mb: 1 }}>Custom Styling</Typography>
      <Stack direction="row" spacing={1}>
        <LabelTag 
          label="Custom" 
          type="Style" 
          color="primary" 
          sx={{ 
            borderRadius: '4px',
            boxShadow: 'sm'
          }} 
        />
        <LabelTag 
          label="Large" 
          type="Size" 
          color="success" 
          sx={{ 
            fontSize: '1rem',
            height: '32px'
          }} 
        />
      </Stack>
    </Box>
  );
}