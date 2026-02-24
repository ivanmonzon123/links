import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MetaService } from './meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'links-app';
  private sub: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    const defaults = {
      title: 'LinksApp',
      description: 'Organize and share your important links with LinksApp.',
      image: '/assets/og-image.png',
      url: window.location.href,
      siteName: 'LinksApp',
      type: 'website'
    };

    // set default tags on load
    this.metaService.setTags(defaults);

    // update tags when route changes; routes can provide `data: { meta: { ... } }`
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const data: any = route.snapshot.data || {};
      const meta = data.meta || {};
      const tags = {
        title: meta.title || defaults.title,
        description: meta.description || defaults.description,
        image: meta.image || defaults.image,
        url: (meta.url || window.location.href),
        siteName: meta.siteName || defaults.siteName,
        type: meta.type || defaults.type
      };
      this.metaService.setTags(tags);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
