/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Dashboard section: advertising pipeline creative thumbnails (e.g. Mekhala Orchard).
 */

import React, { useState, useCallback } from 'react';
import { ImageIcon, Video, ExternalLink, Megaphone } from 'lucide-react';
import type { AdAsset } from '../data';

interface AdCreativeThumbnailsProps {
  assets: AdAsset[];
  loading?: boolean;
  title?: string;
  subtitle?: string;
}

function ThumbnailPlaceholder({ type }: { type: 'image' | 'video' }) {
  return (
    <div className="w-full h-full min-h-[120px] bg-slate-800/80 rounded-lg flex items-center justify-center border border-border-dark">
      {type === 'video' ? (
        <Video className="w-10 h-10 text-slate-500" />
      ) : (
        <ImageIcon className="w-10 h-10 text-slate-500" />
      )}
    </div>
  );
}

export function AdCreativeThumbnails({
  assets,
  loading = false,
  title = 'Campaign creatives',
  subtitle = 'Advertising pipeline – digital ads & video (Mekhala Orchard)',
}: AdCreativeThumbnailsProps) {
  const [failedImageUrls, setFailedImageUrls] = useState<Set<string>>(new Set());
  const markUrlFailed = useCallback((url: string) => {
    setFailedImageUrls((prev) => new Set(prev).add(url));
  }, []);

  if (loading) {
    return (
      <section className="mb-5">
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-primary" />
            {title}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium mb-4">{subtitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-slate-800/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-5">
      <div className="bg-card-dark rounded-xl border border-border-dark p-6 shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-primary" />
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 font-medium mb-4">{subtitle}</p>
        {assets.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm rounded-lg border border-border-dark border-dashed bg-slate-800/20">
            No campaign creatives yet. Assets will appear here when the advertising pipeline runs.
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => {
            const href = asset.externalUrl ?? undefined;
            const content = (
              <div className="group rounded-lg overflow-hidden border border-border-dark bg-slate-800/30 hover:border-primary/30 transition-colors">
                <div className="aspect-[4/3] relative bg-slate-900">
                  {asset.thumbnailUrl && !failedImageUrls.has(asset.thumbnailUrl) ? (
                    <img
                      src={asset.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => markUrlFailed(asset.thumbnailUrl!)}
                    />
                  ) : (
                    <ThumbnailPlaceholder type={asset.type} />
                  )}
                  <div className="absolute top-1.5 right-1.5">
                    {asset.type === 'video' ? (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                        <ImageIcon className="w-3 h-3" /> Image
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[11px] font-bold text-slate-200 truncate" title={asset.campaignName}>
                    {asset.brandOrPlaceholder}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{asset.campaignName}</p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" /> View
                    </a>
                  )}
                </div>
              </div>
            );
            if (href) {
              return (
                <a
                  key={asset.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  {content}
                </a>
              );
            }
            return <div key={asset.id}>{content}</div>;
          })}
        </div>
        )}
      </div>
    </section>
  );
}
