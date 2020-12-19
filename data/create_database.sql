  
-- Bonne pratique : on crée une TRANSACTION (=un bloc indivisible d'instructions)
-- Si quelque chose se passe mal entre "BEGIN" et "COMMIT", tout est annulé !
BEGIN;

-- on commence par détruire toutes les tables si elles existent
DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

-- et c'est parti, on crée les tables
CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);

CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "color" TEXT DEFAULT '#fff',
    "list_id" INTEGER NOT NULL REFERENCES "list"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);

CREATE TABLE "label" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT DEFAULT '#ccc',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);

CREATE TABLE "card_has_label" (
    "card_id" INTEGER REFERENCES "card"("id") ON DELETE CASCADE, 
    "label_id" INTEGER REFERENCES "label"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP,
    PRIMARY KEY ("card_id", "label_id")
);

-- remplir les tables avec des données!
INSERT INTO "label"("title", "color") VALUES
('Urgent', '#ff0000'),
('Dev', '#00ff00');

INSERT INTO "list"("title") VALUES
('Choses à faire'),
('A regarder');

INSERT INTO "card"("title", "color", "list_id") VALUES
('finir l''API', '#fff', 1),
('coder le front', '#ccc', 1),
('Umbrella Academy', '#00f', 2),
('le framework React', '#1a8', 2);

-- on oublie pas de créer AUSSI des associations card<>label
INSERT INTO "card_has_label"("card_id", "label_id") VALUES
(1,1),
(1,2),
(2,2),
(4,2);

COMMIT;