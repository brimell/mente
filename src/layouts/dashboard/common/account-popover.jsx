import { useContext, useState } from 'react';

import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SettingsModal from './settings-modal';
import { MainContext } from '@contexts/MainContext';

import { logoutUser, setDisplayName } from '@utils/auth';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const { currentUser } = useContext(MainContext);

  if (!currentUser) {
    return null;
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser();
  };

  const handleOpenSettingsModal = () => {
    setOpen(null);
    setOpenSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  const handleSaveSettings = (displayName) => {
    setDisplayName(displayName);
    console.log('New display name:', displayName);

    handleCloseSettingsModal();
  };

  return (
    <>
      <SettingsModal
        open={openSettingsModal}
        onClose={handleCloseSettingsModal}
        onSave={handleSaveSettings}
      />
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={currentUser.photoURL}
          alt={currentUser.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {currentUser.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleOpenSettingsModal}>Settings</MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
