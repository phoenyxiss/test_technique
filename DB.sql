-- Adminer 4.8.1 PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) dump

\connect "Test_technique";

DROP TABLE IF EXISTS "financial_products";
DROP SEQUENCE IF EXISTS produit_financier_id_seq;
CREATE SEQUENCE produit_financier_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 3 CACHE 1;

CREATE TABLE "public"."financial_products" (
    "Id" integer DEFAULT nextval('produit_financier_id_seq') NOT NULL,
    "Name" character varying NOT NULL,
    CONSTRAINT "produit_financier_pkey" PRIMARY KEY ("Id")
) WITH (oids = false);

INSERT INTO "financial_products" ("Id", "Name") VALUES
(1,	'Les Actions'),
(2,	'Les Obligations'),
(3,	'Les Produits Dérivés');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS "utilisateurs_Id_seq";
CREATE SEQUENCE "utilisateurs_Id_seq" INCREMENT  MINVALUE  MAXVALUE  CACHE ;

CREATE TABLE "public"."users" (
    "Id" integer DEFAULT nextval('"utilisateurs_Id_seq"') NOT NULL,
    "LastName" character varying NOT NULL,
    "FirstName" character varying NOT NULL,
    "Email" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "FinancialKnowledge" smallint,
    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("Id")
) WITH (oids = false);

INSERT INTO "users" ("Id", "LastName", "FirstName", "Email", "Password", "FinancialKnowledge") VALUES
(1,	'Test',	'Ttest',	'testt@test',	'ttestt',	0),
(10,	'example',	'exemple',	'test@exemple',	'$2y$10$pvPMfcJvkN.3YSRimF59wOxPj0In0Fu9Z6N.4/81lHhUluAvIPdGq',	1),

DROP TABLE IF EXISTS "users_financial_products";
CREATE TABLE "public"."users_financial_products" (
    "UserId" integer NOT NULL,
    "FinancialProductId" integer NOT NULL
) WITH (oids = false);

INSERT INTO "users_financial_products" ("UserId", "FinancialProductId") VALUES
(1,	2),

ALTER TABLE ONLY "public"."users_financial_products" ADD CONSTRAINT "users_financial_products_FinancialProductId_fkey" FOREIGN KEY ("FinancialProductId") REFERENCES financial_products("Id") NOT DEFERRABLE;
ALTER TABLE ONLY "public"."users_financial_products" ADD CONSTRAINT "users_financial_products_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES users("Id") NOT DEFERRABLE;

