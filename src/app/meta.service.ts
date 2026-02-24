import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  setTags(tags: MetaTags) {
    if (tags.title) {
      this.title.setTitle(tags.title);
      this.updateTag('property', 'og:title', tags.title);
      this.updateTag('name', 'twitter:title', tags.title);
    }

    if (tags.description) {
      this.updateTag('name', 'description', tags.description);
      this.updateTag('property', 'og:description', tags.description);
      this.updateTag('name', 'twitter:description', tags.description);
    }

    if (tags.url) {
      this.updateTag('property', 'og:url', tags.url);
    }

    if (tags.image) {
      this.updateTag('property', 'og:image', tags.image);
      this.updateTag('name', 'twitter:image', tags.image);
    }

    if (tags.siteName) {
      this.updateTag('property', 'og:site_name', tags.siteName);
    }

    if (tags.type) {
      this.updateTag('property', 'og:type', tags.type);
    }

    // ensure twitter card default
    this.updateTag('name', 'twitter:card', 'summary_large_image');
  }

  private updateTag(attr: 'name' | 'property', key: string, value: string) {
    const selector = `${attr}='${key}'`;
    const existing = this.meta.getTag(selector);
    const tag: any = {};
    tag[attr] = key;
    tag['content'] = value;

    if (existing) {
      this.meta.updateTag(tag, selector);
    } else {
      this.meta.addTag(tag);
    }
  }
}
