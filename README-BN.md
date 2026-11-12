# Promptly — AI Prompt Gallery (Cloudflare Pages)

এটি একটি responsive AI Prompt Gallery starter project। Public gallery, search, category filter, prompt copy এবং password-protected admin panel আছে। ডেটা Cloudflare D1-এ সংরক্ষিত হয়।

## ১) Cloudflare-এ D1 database তৈরি
1. Cloudflare Dashboard → **Workers & Pages** → **D1 SQL Database** → Create database।
2. নাম দিন `promptly-gallery-db`।
3. Database ID কপি করে `wrangler.toml`-এর `PASTE_YOUR_D1_DATABASE_ID_HERE` জায়গায় বসান।
4. D1 database-এর Console/Query-তে আপডেট করা `schema.sql` ফাইলের সম্পূর্ণ SQL চালান। এতে Prompt ও Adsterra settings-এর টেবিল তৈরি হবে।

## ২) GitHub-এ project আপলোড
1. ZIP extract করুন।
2. GitHub-এ নতুন repository তৈরি করে সব ফাইল upload করুন (ফোল্ডারসহ)।
3. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git।
4. Repository নির্বাচন করুন। Framework preset: **None**; Build command ফাঁকা রাখুন; Build output directory `.` দিন।
5. Deploy করুন।

## ৩) D1 binding যুক্ত করুন
Cloudflare Pages project → Settings → Functions → D1 database bindings → Add binding:
- Variable name: `DB`
- D1 database: `promptly-gallery-db`
Save করে নতুন deployment দিন।

## ৪) Admin password নিরাপদে সেট করুন
Pages project → Settings → Variables and Secrets → Add:
- `ADMIN_PASSWORD` = নিজের শক্তিশালী admin password
- `SESSION_SECRET` = কমপক্ষে 32 অক্ষরের এলোমেলো গোপন string

দুটিকে **Secret** হিসেবে রাখুন, সাধারণ variable নয়। Save করে redeploy করুন। Admin panel: `https://YOUR-PROJECT.pages.dev/admin.html`

## ৫) Prompt যোগ
Admin panel-এ লগইন → Title, Category, Image URL (HTTPS), Description, Prompt পূরণ → Save prompt।
ছবি অন্য কোথাও HTTPS-এ host করে তার direct image URL দিন। এই starter project ছবির ফাইল নিজে upload করে না।

## গুরুত্বপূর্ণ
- `ADMIN_PASSWORD` বা `SESSION_SECRET` কাউকে দেবেন না।
- Public site-এ prompt দেখা যাবে; admin-এর edit/delete করতে লগইন লাগে।
- প্রথমবার deploy করার পর D1 binding ও secrets ঠিকভাবে না বসানো পর্যন্ত admin/API কাজ করবে না।
- Demo cards শুধু API/database না থাকলে preview হিসেবে দেখা যায়; বাস্তব কনটেন্ট D1-এ সংরক্ষণ করতে setup সম্পন্ন করুন।
- Free subdomain হবে `your-project.pages.dev`।


## Adsterra
তোমার দেওয়া Banner, Native Banner, Social Bar ও Popunder কোড schema.sql-এ প্রাথমিকভাবে যুক্ত। সম্পূর্ণ SQL চালানোর পর Admin Panel-এর Adsterra settings থেকে কোড বদলানো বা বন্ধ করতে পারবে।
