import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Open_Sans } from 'next/font/google';
import { Layout } from '@/components';

/* The root component*/

const roboto = Open_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const theme = createTheme({
  typography: {
    fontFamily: [roboto.style.fontFamily, 'serif'].join(','),
    h1: {
      fontSize: '2rem',
      margin: '1rem 0'
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: [roboto.style.fontFamily, 'serif'].join(',')
        }
      },
      defaultProps: {
        underline: 'none'
      }
    }
  }
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
