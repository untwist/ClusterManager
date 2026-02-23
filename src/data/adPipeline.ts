/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Advertising pipeline: placeholder hooks for Higgsfield, KREA, and FAL APIs.
 * Replace with real API calls when keys and endpoints are configured.
 */

import type { CreativeProvider, CreativeProviderId, AdAsset } from './types';

/** Placeholder: list of creative providers (Higgsfield, KREA, FAL) */
export const CREATIVE_PROVIDERS: CreativeProvider[] = [
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    description: 'AI video generation. Connect Higgsfield API for short-form video ads.',
    capabilities: ['video'],
    connected: false,
  },
  {
    id: 'krea',
    name: 'KREA',
    description: 'AI image generation. Connect KREA API for static and concept art.',
    capabilities: ['image'],
    connected: false,
  },
  {
    id: 'fal',
    name: 'FAL',
    description: 'fal.ai – image & video models. Connect FAL API for fast iteration.',
    capabilities: ['image', 'video'],
    connected: false,
  },
];

/** Placeholder: get provider by id (for task labels / UI) */
export function getCreativeProvider(id: CreativeProviderId): CreativeProvider | undefined {
  return CREATIVE_PROVIDERS.find((p) => p.id === id);
}

/**
 * Placeholder: Higgsfield API – generate or queue video ad.
 * In production: POST to Higgsfield API with script/storyboard, return job id or URL.
 */
export async function higgsfieldGenerateVideo(_params: {
  prompt?: string;
  durationSeconds?: number;
  aspectRatio?: string;
}): Promise<{ ok: boolean; jobId?: string; error?: string }> {
  await Promise.resolve(); // simulate async
  return { ok: false, error: 'Higgsfield API not configured. Set HIGGSFIELD_API_KEY and endpoint.' };
}

/**
 * Placeholder: KREA API – generate image for digital ad.
 * In production: call KREA API with prompt/size, return image URL.
 */
export async function kreaGenerateImage(_params: {
  prompt?: string;
  width?: number;
  height?: number;
}): Promise<{ ok: boolean; imageUrl?: string; error?: string }> {
  await Promise.resolve();
  return { ok: false, error: 'KREA API not configured. Set KREA_API_KEY and endpoint.' };
}

/**
 * Placeholder: FAL API – image or video generation.
 * In production: call fal.ai with model and params, return asset URL.
 */
export async function falGenerate(_params: {
  type: 'image' | 'video';
  prompt?: string;
  model?: string;
}): Promise<{ ok: boolean; url?: string; error?: string }> {
  await Promise.resolve();
  return { ok: false, error: 'FAL API not configured. Set FAL_KEY and endpoint.' };
}
