import { Paper } from '@mui/material';
import PageLoader from 'modules/Elements/PageLoader';
import { ComponentProps, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

export const LazyConvert = lazy(() =>
  import('routes/ManageSongs/SongManagement').then((modules) => {
    return { default: modules.Convert };
  }),
);

const Convert = (props: ComponentProps<typeof LazyConvert>) => (
  <Suspense fallback={<PageLoader />}>
    <Helmet>
      <title>Convert Song</title>
    </Helmet>
    <Paper elevation={2} sx={{ minHeight: '100vh', width: '1260px', margin: '0 auto', paddingTop: '30px' }}>
      <LazyConvert {...props} />
    </Paper>
  </Suspense>
);

export default Convert;
