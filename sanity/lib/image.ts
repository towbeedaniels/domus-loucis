import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function imageUrl(
  source: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    blur?: number;
    auto?: "format";
  } = {}
): string {
  let builderInstance = urlFor(source);
  if (options.width) builderInstance = builderInstance.width(options.width);
  if (options.height) builderInstance = builderInstance.height(options.height);
  if (options.quality) builderInstance = builderInstance.quality(options.quality);
  if (options.blur) builderInstance = builderInstance.blur(options.blur);
  if (options.auto) builderInstance = builderInstance.auto(options.auto);
  return builderInstance.url();
}