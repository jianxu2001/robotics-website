# Reviewed application media

Use `lib/application-media.ts` for application images, captions and source-case links.
The image subject must match the process described by the card. A photo of one process is not evidence of another process or an unconfirmed feature.

Reviewed video sources supplied by the owner:

- CR50L: carton handling and palletizing with a lifting column. Do not label its frames as bag palletizing.
- STC10: loading, unloading and transfer between stamping presses. Do not substitute palletizing renders for this process.
- SCH100: bag pickup, opening and feeding with a customer-specific linear track. The footage does not establish a 3D vision configuration.

Where no matching site image is verified, use the corresponding process schematic, visibly captioned as a schematic. Current schematics cover bag palletizing, bag depalletizing, vision-guided bag feeding, machine tending, conveyor flow and general material-handling process planning.

Product-category cards use the catalog image of a robot from that category. Factory-building images belong to company/facility descriptions.

Legacy `bejing1 (1).jpg` and `bejing1 (2).jpg` show pallet/conveyor or carton handling. `bejing1 (3).jpg` is a carton palletizing render. Their old hero filenames did not establish their subjects and must not be used to choose a process image.

`scripts/generate-application-diagrams.mjs` creates the localized SVG sources and PNG assets. It uses the Sharp dependency already provided by Next.js.
