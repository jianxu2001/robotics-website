# Enquiry measurement and delivery acceptance

GA4 is prepared but inactive. The owner confirmed on 2026-11-03 that no GA4 property has been created. The production code does not load Google tags until both a valid measurement ID and the stream configuration review are supplied, and the visitor opts in.

## GA4 setup

Use the company-controlled Google account at https://analytics.google.com/.

- Account/property: SCR Robot / scr-robot.com.
- Website stream: https://www.scr-robot.com.
- Reporting timezone: Asia/Shanghai. Confirm the currency with the owner; it does not indicate published product prices.
- Disable Enhanced Measurement for this stream before enabling the tag. Automatic outbound/form tracking can include raw link destinations; the site provides its own allowlisted contact and form events.
- Copy the public G- measurement ID to siteSettings.gaMeasurementId in lib/site-settings.ts (or NEXT_PUBLIC_GA_MEASUREMENT_ID). Set enhancedMeasurementDisabled to true only after checking that stream setting.
- Review and accept any Google account/Analytics terms yourself. No account, legal terms or new third-party access was accepted by the agent.
- Mark generate_lead as a key event. It means the site received a successful delivery acknowledgement, not sales qualification, inbox inspection, quotation or an order.
- Check Realtime/DebugView using clearly identified test interactions. Do not label click events as successful enquiries.

## Events

| Event | Meaning |
|---|---|
| page_view | Public canonical URL, no query/hash; referrer origin only |
| contact_click | Phone, email or WhatsApp link clicked; delivery unknown |
| catalog_download | Catalog link clicked; completed download unknown |
| video_start | One first play per mounted, identified customer-video element |
| inquiry_start | First interaction with the enquiry fields |
| inquiry_attempt | Valid browser form submit attempted |
| inquiry_error | Validation error or unconfirmed delivery |
| generate_lead | API replied ok:true after a delivery channel acknowledged success |

Custom event parameters are allowlisted categorical values. No names, phones, email addresses, project text, raw destination URLs or receipt references are passed to analytics. The source page and receipt reference belong to the enquiry sent to the company's configured delivery channel.

Visitor choice is stored locally. Before opt-in no Google script is loaded. Visitors can reopen the choice in the footer when GA4 is enabled. Turning it off removes first-party GA cookies and reloads the page; the interface tells users to save unsubmitted text first.

## Formal receipt acceptance

GET /api/inquiry returns acceptingInquiries, without revealing keys, provider names or recipients. A true value only establishes that a delivery variable is present. It cannot establish key validity or inbox delivery.

Prepare a clearly labeled synthetic test and confirm the actual company recipient before sending through production. Check the resulting SCR reference in the inbox/spam folder and verify the reply address. Do not send real-looking customer inquiries during an unattended test.

Record each real lead by reference, source page, application, contact channel, qualification, quotation status and order outcome. Sales qualification and orders require real sales records; they are not inferred from site clicks.
