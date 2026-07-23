import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { SidebarProps } from './Sidebar.types';

const Sidebar = ({ items, onItemClick }: SidebarProps) => {
  return (
    <Box
      sx={{
        width: 260,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        py: 3,
        px: 2,
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.active}
            onClick={() => onItemClick?.(item.id)}
            sx={{
              borderRadius: '12px',
              color: item.active ? 'primary.main' : 'text.secondary',
              '&.Mui-selected': {
                bgcolor: '#EEF2FF',
                '&:hover': { bgcolor: '#E0E7FF' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{ primary: { fontWeight: item.active ? 600 : 500, fontSize: '0.925rem' } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
