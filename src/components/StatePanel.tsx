import { Button, Card, MessageBar, MessageBarBody, MessageBarTitle, Skeleton, SkeletonItem, Text, Title2 } from '@fluentui/react-components';
import { ArrowClockwiseRegular, BoxRegular, WarningRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useStore } from '../context/StoreContext';

export function CatalogGate({ children }: { children: ReactNode }) {
  const { catalogStatus, catalogError, refresh } = useStore();
  if (catalogStatus === 'loading') {
    return <main className="page-main state-main" aria-live="polite" aria-label="Loading AccessKart catalog"><div className="state-skeleton-intro"><SkeletonItem shape="rectangle" /><SkeletonItem shape="rectangle" /></div><div className="product-grid state-skeleton-grid">{[1, 2, 3].map((item) => <Card key={item}><Skeleton><SkeletonItem shape="rectangle" /><SkeletonItem shape="rectangle" /><SkeletonItem shape="rectangle" /></Skeleton></Card>)}</div></main>;
  }
  if (catalogStatus === 'error') {
    return <main className="page-main state-main"><MessageBar intent="error"><MessageBarBody><MessageBarTitle>We couldn’t load the catalog</MessageBarTitle>{catalogError}</MessageBarBody><Button icon={<ArrowClockwiseRegular />} onClick={refresh}>Try again</Button></MessageBar></main>;
  }
  if (catalogStatus === 'empty') {
    return <main className="page-main state-main"><Card className="empty-panel"><span className="empty-icon"><BoxRegular /></span><Title2>Nothing to browse just yet</Title2><Text>Our catalog is taking a quiet moment. Check back soon or explore your saved items.</Text><Link className="fui-Button fui-Button--primary" to="/wishlist">Go to wishlist</Link></Card></main>;
  }
  return children;
}

export function InlineError({ message, retry }: { message: string; retry: () => void }) {
  return <MessageBar intent="error"><WarningRegular /><MessageBarBody><MessageBarTitle>Something went wrong</MessageBarTitle>{message}</MessageBarBody><Button appearance="subtle" onClick={retry}>Retry</Button></MessageBar>;
}
