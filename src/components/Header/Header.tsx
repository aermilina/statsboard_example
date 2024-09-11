import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconBird from '@/components/assets/iconbird.svg';
import Image from 'next/image';
import { pages } from '@/constants';

/* The component renders the header of the project*/

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
          <Box sx={{ display: 'flex' }}>
            <Image
              width={32}
              height={32}
              src={IconBird.src}
              alt="Logo"
              style={{ marginRight: 12 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none'
              }}>
              Statistics interface
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page) => {
                const { name, href } = page;
                return (
                  <MenuItem key={href} onClick={handleCloseNavMenu}>
                    <Link href={href}>
                      <Typography variant="body1" sx={{ textTransform: 'uppercase' }}>
                        {name}
                      </Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 5 }}>
            {pages.map((page) => {
              const { name, href } = page;
              const selected = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    textDecoration: 'none',
                    padding: ' 1rem',
                    backgroundColor: selected ? '#094a8b' : 'transparent'
                  }}>
                  <Typography variant="body1" sx={{ color: '#fff', textTransform: 'uppercase' }}>
                    {name}
                  </Typography>
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
