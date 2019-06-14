ECHO OFF
ECHO Starting build
ng build --prod && aws s3 sync dist/IcchataUIV1 s3://www.icchata.com --exclude ActorPhotos/* && aws cloudfront create-invalidation --distribution-id E2PV3TGQWO3F2I --paths /index.html
