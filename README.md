# YH NEXORA TECHNOLOGIES — Final Website

This version keeps the existing dark/cinematic frontend design and adds a real server-backed admin system.

## What changed
- Founder photo = supplied bike photo
- Co-Founder = Amar nadh, supplied photo
- Established = 21/08/2026
- WhatsApp = 93812 62063
- YouTube Thumbnail = ₹150
- Services use `More Details`
- Website Development and Graphic Design detail views hide contact buttons
- Digital Promotions keeps contact buttons
- Portfolio uses visual project cards
- Love Proposal + Business Website visuals included
- Graphic Design detail visuals: YouTube thumbnail, Instagram post, brochure, roll-up stand, visiting card
- Instagram URL is editable from Admin
- Admin changes are stored on Netlify Blobs and are read by the public website, so changes can propagate across devices
- `admin.html` is now a real server-backed admin UI instead of localStorage-only editing

## Deploy
This package is designed for Netlify (not GitHub Pages) because GitHub Pages cannot run the backend function.

1. Push the entire folder to GitHub.
2. Import the GitHub repo into Netlify.
3. In Netlify Environment Variables, set:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET` (a long random secret)
4. Deploy.
5. Open `/admin.html` on the live domain.
6. Login and save changes.

The default credentials currently match the old demo:
- Email: `yhnexora@ai.com`
- Password: `yhnexora5436@`

Change them in Netlify Environment Variables before making the site public.
