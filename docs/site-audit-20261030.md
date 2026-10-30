# Website follow-up audit — 2026-10-30

- Product navigation now groups models by application as well as series. Desktop SCH variants no longer appear under heavy palletizing; SAR12 variants appear under stamping. The Chinese desktop-family link opens the matching finder category. All 44 models have a direct menu link in both languages.
- A server component prepares only the selected language's navigation fields; the client menu no longer imports both catalogs and the complete engineering dataset.
- SCH100 model pages link to the verified bag-opening case, explicitly identifying its custom linear track and the standard robot's exclusion of that track.
- Chinese model pages include localized canonical WebPage, BreadcrumbList and Product data. Visible FAQs and FAQ data share one function. Catalog values, legal company identity and prices are not invented or changed. Quote-only products still do not have fabricated offers or ratings; rich-result eligibility is not promised.
- Inquiry requests have a 12-second timeout for each delivery provider and a 20-second client wait limit. Success requires the API acknowledgement. An unconfirmed result preserves fields and offers direct contact; error responses do not expose provider details.
- Missing pages offer model search, home and contact links. Local checks confirm true 404 responses with noindex, including Chinese invalid product URLs.
- Sitemap modification dates reflect the Oct 28 media changes and the model/catalog changes in this release rather than updating every page on every build.

Validation: 22 tests, ESLint, production build (155 generated routes), and seven SEO checks passed. All 44 Chinese product pages were checked for canonical schema URLs and exact visible FAQ text. Local inquiry simulations used a localhost webhook stub with Resend disabled; no test inquiry was sent to the company's production inbox or webhook. These simulations do not establish real email deliverability.

Browser checks covered the Chinese desktop menu, SCH100 model link and inquiry failure recovery. JavaScript resource sizes were compared for five generated pages: approximately 60 KB less uncompressed JavaScript per page (about 12–13 KB gzip). HTML gains serialized menu fields and, on Chinese model pages, structured data; this is not a claim about measured Core Web Vitals.
