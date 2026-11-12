CREATE TABLE IF NOT EXISTS prompts (
 id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, category TEXT NOT NULL,
 image_url TEXT NOT NULL, description TEXT DEFAULT '', prompt TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS ad_settings (slot TEXT PRIMARY KEY, code TEXT NOT NULL DEFAULT '', enabled INTEGER NOT NULL DEFAULT 1);
INSERT OR IGNORE INTO ad_settings(slot,code,enabled) VALUES
('banner','<script>atOptions = {''key'':''5a1f459a2a854e5be0653cf05714c6c1'',''format'':''iframe'',''height'':50,''width'':320,''params'':{}};</script><script src="https://bicea.org/22/5a1f459a2a854e5be0653cf05714c6c1"></script>',1),
('native','<script async="async" data-cfasync="false" src="https://bicea.org/21/ab61bbcb6f20bd63e6ba8509e4cd3ad7"></script><div id="container-ab61bbcb6f20bd63e6ba8509e4cd3ad7"></div>',1),
('social','<script data-cfasync="false" src="https://bicea.org/14/04eb40025683e16fc0cd044b15137126"></script>',1),
('popunder','<script data-cfasync="false" src="https://afders.org/1/aaf98c234c4de4b5e7aa39ade87faf4c"></script>',1);
