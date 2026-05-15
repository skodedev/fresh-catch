import { BannerDuo } from '@/components/BannerDuo';
import { Categories } from '@/components/Categories';
import { DealOfTheDay } from '@/components/DealOfTheDay';
import { Hero } from '@/components/Hero';
import { MobileHome } from '@/components/MobileHome';
import { Newsletter } from '@/components/Newsletter';
import { ProductShelf } from '@/components/ProductShelf';
import { Reviews } from '@/components/Reviews';
import { Shell } from '@/components/Shell';
import { TrustRibbon } from '@/components/TrustRibbon';
import { PRODUCTS, TRENDING } from '@/lib/data';

export default function Home() {
  return (
    <Shell mobileHome={<MobileHome />}>
      <Hero />
      <TrustRibbon />
      <Categories />
      <ProductShelf
        title="Today's catch, freshest picks"
        subtitle="Hand-graded this morning. Hand-prepped to your spec. Delivered tomorrow."
        products={PRODUCTS}
      />
      <BannerDuo />
      <DealOfTheDay products={PRODUCTS} />
      <ProductShelf
        title="Frozen favourites"
        subtitle="Sustainably sourced. Flash-frozen at peak freshness. Ready when you are."
        products={TRENDING.slice(0, 8)}
      />
      <Reviews />
      <Newsletter />
    </Shell>
  );
}
