-- ============================================================
-- AgriPrice Database
-- Migration: 001_init.sql
-- Description: Initial schema setup
-- Run with: mysql -u root -p < database/migrations/001_init.sql
-- ============================================================

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS agriprice
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE agriprice;

-- ── Example Table (replace with your actual schema) ────────────

-- commodities: Stores agricultural product information
CREATE TABLE IF NOT EXISTS commodities (
  id          INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)     NOT NULL,          -- e.g. "Rice", "Corn", "Onion"
  category    VARCHAR(50)      NOT NULL,          -- e.g. "Grains", "Vegetables"
  unit        VARCHAR(20)      NOT NULL,          -- e.g. "kg", "sack", "piece"
  created_at  TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_commodity_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- price_records: Stores historical price data per commodity
CREATE TABLE IF NOT EXISTS price_records (
  id            INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  commodity_id  INT UNSIGNED     NOT NULL,
  price         DECIMAL(10, 2)   NOT NULL,        -- Price in PHP
  market        VARCHAR(100)     NOT NULL,         -- Market/location name
  recorded_at   DATE             NOT NULL,         -- Date price was recorded

  PRIMARY KEY (id),
  CONSTRAINT fk_price_commodity
    FOREIGN KEY (commodity_id) REFERENCES commodities(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
