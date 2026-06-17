import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { allProductsQuery } from "@/sanity/lib/queries";
import type { ProductPackage } from "@/types/sanity";
import { TextReveal, FadeIn } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { EmptyState } from "@/components/ui/empty-state";

export const revalidate = 3600;

export const metadata = {
  title: "Shop",
  description: "Limited edition prints and digital collections.",
};

export default async function ShopPage() {
  let products: ProductPackage[] = [];
  try {
    products = await sanityFetch<ProductPackage[]>({
      query: allProductsQuery,
      tags: ["productPackage"],
    });
  } catch {}

  return (
    <>
      <section className="bg-bone pt-40 pb-24 lg:pt-56 lg:pb-32">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-taupe">
              Shop
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-serif text-7xl leading-[0.9] lg:text-[12rem]"
          >
            Hold the light.
          </TextReveal>
          <FadeIn delay={0.3} className="mt-12 max-w-2xl">
            <p className="font-serif text-2xl italic leading-relaxed text-ink/70">
              Limited edition prints and digital collections, hand-prepared and
              shipped from the studio.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-6 py-12 lg:px-12 lg:py-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <FadeIn key={product._id} delay={i * 0.08}>
                <article className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-mist">
                    {product.previewImage && (
                      <Image
                        src={imageUrl(product.previewImage, {
                          width: 1000,
                          quality: 85,
                          auto: "format",
                        })}
                        alt={product.title}
                        width={1000}
                        height={1250}
                        className="h-full w-full object-cover transition-transform duration-[1.8s] ease-editorial group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.3em] text-taupe">
                    {product.productType}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">{product.title}</h3>
                  {product.description && (
                    <p className="mt-2 font-serif text-base text-ink/70">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-6 flex items-end justify-between">
                    <p className="font-serif text-2xl">
                      ${product.basePrice.toLocaleString()}
                      <span className="ml-2 font-sans text-xs uppercase tracking-[0.2em] text-taupe">
                        {product.currency}
                      </span>
                    </p>
                    <button className="font-sans text-xs uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold">
                      Add to Cart →
                    </button>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState message="Products will appear here once published in the studio. Wire up Stripe Checkout when ready." />
        )}
      </section>
    </>
  );
}